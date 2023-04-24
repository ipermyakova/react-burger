import React, { useCallback, useEffect, FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from'react-router-dom';
import { LoginPage, RegisterPage, ResetPasswordPage, ForgotPasswordPage, ProfilePage, IngredientDetailsPage, NotFound404, ProfileOrdersPage, 
    FeedPage, OrderDetailsPage} from '../../pages';
import Loader from '../loader/loader'

import appStyles from './app.module.css';
import AppHeader from '../header/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { OrderDetails } from '../../pages/feed-details'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredients-details/ingredient-details';
import { actions } from '../../services/actions';
import { ProvideAuth } from '../../services/auth'
import { ProtectedRoute } from '../protected-route/protected-route';
import { useAuth } from '../../services/auth';
import { getCookie } from '../../utils/cookie-utils';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { TIngredient } from '../../services/types/data';
import OrderDetailsComponent from '../order-details/oder-details';


const HomePage = () => {

    const auth = useAuth();
    const dispatch = useDispatch();

    const { ingredients, isLoading, hasError } = useSelector(state => ({
        ingredients: state?.ingredients?.ingredients || null, 
        isLoading: state?.ingredients?.isLoading || false, 
        hasError: state?.ingredients?.hasError || false
    }))

    const { orderData } = useSelector(store => ({
        orderData: store?.order?.orderData,
    }))

    useEffect(()=> {
        if(getCookie("refreshToken")) {
            auth.getUser();         
        }
        dispatch(actions.getIngredientsAction());
    },[]);

    const handleCloseModal = useCallback(() => {
        dispatch(actions.removeOrderDetails());    
    }, []); 

    const handleDrop = (item: TIngredient, itemBunId: string) => {
        if(item._id != itemBunId) {
            dispatch(actions.addIngredientConstructor(item));
        }            
    }

    return (
        <div>   
            {isLoading && <div className={appStyles.loader_wrapper}><Loader /></div>}
                {hasError && 'Возникла ошибка'}
                {!isLoading && !hasError && ingredients && ingredients.length > 0 &&
                    <div>
                        <DndProvider backend={HTML5Backend}>
                            <div className={appStyles.container}>
                                <BurgerIngredients ingredients={ingredients}/>
                                <BurgerConstructor onDropHandler={handleDrop}/>                               
                            </div>
                        </DndProvider>
                        {orderData && <Modal header="" onCloseClick={handleCloseModal}><OrderDetailsComponent /></Modal>} 
                    </div>
                }
        </div>
    );
};

const ModalSwitch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { ingredientDetails } = useSelector(state => ({
        ingredientDetails: state?.ingredientDetails?.currentIngredient || null,
    }))

    let background = location.state && location.state.background;

    const handleCloseModal = useCallback(() => {
        if(ingredientDetails) {
            dispatch(actions.removeIngredientDetails());
        } else {
            dispatch(actions.removeOrderDetails());
        }
        navigate(-1);
    }, [ingredientDetails]); 

    return (
        
        <div className={appStyles.app}>
            <AppHeader />
            <Routes location={background || location}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<ProtectedRoute onlyUnAuth={true}><LoginPage /></ProtectedRoute>} />
                    <Route path="/register" element={<ProtectedRoute onlyUnAuth={true}><RegisterPage /></ProtectedRoute>} />
                    <Route path="/forgot-password" element={<ProtectedRoute onlyUnAuth={true}><ForgotPasswordPage /></ProtectedRoute>} />
                    <Route path="/reset-password" element={<ProtectedRoute onlyUnAuth={true}><ResetPasswordPage/></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} />
                    <Route path="/profile/orders" element={<ProtectedRoute><ProfileOrdersPage/></ProtectedRoute>} />
                    <Route path="/profile/orders/:id" element={<ProtectedRoute><OrderDetailsPage /></ProtectedRoute>}></Route>
                    <Route path="/ingredients/:id" element={<IngredientDetailsPage/>}/>
                    <Route path="/feed" element={<FeedPage/>}/>
                    <Route path="/feed/:id" element={<OrderDetailsPage />}></Route>
                    <Route path="*" element={<NotFound404/>} />
            </Routes>
            <Routes>
                    {background && (<Route path='/ingredients/:ingredientId' element={<Modal header="Детали ингредиента" onCloseClick={handleCloseModal}>
                     <IngredientDetails/></Modal>}></Route>)} 
                    {background && (<Route path='/feed/:id' element={<Modal header="" onCloseClick={handleCloseModal}>
                     <OrderDetails /></Modal>}></Route>)} 
                     {background && (<Route path='/profile/orders/:id' element={<ProtectedRoute><Modal header="" onCloseClick={handleCloseModal}>
                     <OrderDetails /></Modal></ProtectedRoute>}></Route>)}  
                     <Route path="*" element={null} />
            </Routes>
        </div>
    )
}

const App = () => {
    
    return (
        <ProvideAuth>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <ModalSwitch />
            </BrowserRouter>
        </ProvideAuth>

    )
}

export default App;