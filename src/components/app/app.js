import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from'react-router-dom';
import { LoginPage, RegisterPage, ResetPasswordPage, ForgotPasswordPage, ProfilePage, IngredientDetailsPage, NotFound404, OrderDetailsPage, ProfileOrdersPage } from '../../pages';

import appStyles from './app.module.css';
import AppHeader from '../header/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/oder-details'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredients-details/ingredient-details';
import { actions } from '../../services/actions'
import { ProvideAuth } from '../../services/auth'
import { ProtectedRoute } from '../protected-route/protected-route';
import { useAuth } from '../../services/auth';
import { getCookie } from '../utils/utils'

const HomePage = () => {

    const auth = useAuth();

    const { ingredients, isLoading, hasError } = useSelector(store => ({
        ingredients: store?.ingredients?.ingredients || null, 
        isLoading: store?.ingredients?.isLoading || false, 
        hasError: store?.ingredients?.hasError || false
    }))

    
    const dispatch = useDispatch();

    useEffect(()=> {
        if(getCookie("refreshToken")) {
            auth.getUser();         
        }
        dispatch(actions.getIngredientsAction());
    },[]);

    const handleOpenModal = useCallback((id) => {
        if (id) {
            const currentIngredient = ingredients.find(item => item._id === id)
            if(currentIngredient) {
                dispatch(actions.addIngredientDetails(currentIngredient));
            }  
        }
    })

    const handleDrop = (item, itemBunId) => {
        if(item._id != itemBunId) {
            dispatch(actions.updateCountIngredients(item._id, itemBunId, item.type === 'bun' ? 2 : 1, item.type));
            dispatch(actions.addIngredientConstructor(item));
        }            
    }

    
    return (
        <div>   
            {isLoading && 'Загрузка'}
                {hasError && 'Возникла ошибка'}
                {!isLoading && !hasError && ingredients && ingredients.length > 0 &&
                    <div>
                        <DndProvider backend={HTML5Backend}>
                            <div className={appStyles.container}>
                                <BurgerIngredients onCardClick={handleOpenModal} ingredients={ingredients}/>
                                <BurgerConstructor onButtonClick={handleOpenModal} onDropHandler={handleDrop}/>                               
                            </div>
                        </DndProvider>
                    </div>
                }
        </div>
    );
};

const ModalSwitch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { ingredientDetails } = useSelector(store => ({
        ingredientDetails: store?.ingredientDetails?.currentIngredient || null,
    }))

    let background = location.state && location.state.background;

    const handleCloseModal = useCallback(() => {
        if(ingredientDetails) {
            dispatch(actions.removeIngredientDetails());
        } else {
            dispatch(actions.removeOrderDetails());
        }
        navigate(-1);
    });


    return (
        
        <div className={appStyles.app}>
            <AppHeader />
            <Routes location={background || location}>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/login" element={<ProtectedRoute onlyUnAuth={true}><LoginPage /></ProtectedRoute>} />
                    <Route path="/register" element={<ProtectedRoute onlyUnAuth={true}><RegisterPage /></ProtectedRoute>} />
                    <Route path="/forgot-password" element={<ProtectedRoute onlyUnAuth={true}><ForgotPasswordPage /></ProtectedRoute>} />
                    <Route path="/reset-password" element={<ProtectedRoute onlyUnAuth={true}><ResetPasswordPage/></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} />
                    <Route path="/profile/orders" element={<ProtectedRoute><ProfileOrdersPage/></ProtectedRoute>} />
                    <Route path="/profile/orders/:orderNumber" element={<ProtectedRoute><OrderDetailsPage/></ProtectedRoute>}></Route>
                    <Route path="/ingredients/:id" element={<IngredientDetailsPage />}/>
                    <Route path="*" element={<NotFound404/>} />
            </Routes>
            <Routes>
                    {background && (<Route path='/ingredients/:ingredientId' element={<Modal header={"Детали ингредиента"} onCloseClick={handleCloseModal}>
                     <IngredientDetails/></Modal>}></Route>)}
                    {background && (<Route path='profile/orders/:orderNumber' element={<Modal header={""} onCloseClick={handleCloseModal}>
                     <OrderDetails /></Modal>}></Route>)} 
                     <Route path="*" element={null} />
            </Routes>
        </div>
    )
}


const App = () => {
    
    return (
        <ProvideAuth>
            <BrowserRouter>
                <ModalSwitch />
            </BrowserRouter>
        </ProvideAuth>

    )
}

export default App;