import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import appStyles from './app.module.css';
import AppHeader from '../header/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/oder-details'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredients-details/ingredient-details';
import { actions } from '../../services/actions'

const App = () => {

    const { ingredients, isLoading, hasError } = useSelector(store => ({
        ingredients: store?.ingredients?.ingredients || null, 
        isLoading: store?.ingredients?.isLoading || false, 
        hasError: store?.ingredients?.hasError || false
    }))

    const { ingredientDetails } = useSelector(store => ({
        ingredientDetails: store?.ingredientDetails?.currentIngredient || null,
    }))

    const { orderData, orderHasError } = useSelector(store => ({
        orderData: store?.order?.orderData || null,
        orderHasError: store?.order?.hasError || false
    }))
    
    const dispatch = useDispatch();

    useEffect(()=> {
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

    const handleCloseModal = useCallback(() => {
        if(ingredientDetails) {
            dispatch(actions.removeIngredientDetails());
        }
        dispatch(actions.removeOrderDetails()); 
    });

    const handleDrop = (item, itemBunId) => {
        if(item._id != itemBunId) {
            dispatch(actions.updateCountIngredients(item._id, itemBunId, item.type === 'bun' ? 2 : 1, item.type));
            dispatch(actions.addIngredientConstructor(item));
        }            
    }
   
    return (
        <div className={appStyles.app}>    
            {isLoading && '????????????????'}
                {hasError && '???????????????? ????????????'}
                {!isLoading && !hasError && ingredients && ingredients.length > 0 &&
                    <div>
                        <AppHeader />
                        <DndProvider backend={HTML5Backend}>
                            <div className={appStyles.container}>
                                <BurgerIngredients onCardClick={handleOpenModal} ingredients={ingredients}/>
                                <BurgerConstructor onButtonClick={handleOpenModal} onDropHandler={handleDrop}/>                               
                            </div>
                        </DndProvider>
                        {(orderData || ingredientDetails) && <Modal header={ingredientDetails ? "???????????? ??????????????????????" : ""} onCloseClick={handleCloseModal}>
                        {orderData && !orderHasError && <OrderDetails orderData={orderData} />}
                        {ingredientDetails && <IngredientDetails {...ingredientDetails}/>}  
                        </Modal>}
                    </div>
                }
        </div>
    );
};

export default App;