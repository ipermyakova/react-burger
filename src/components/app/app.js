import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
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
import PropTypes from 'prop-types';
import {ingredientsPropTypes} from '../utils/prop-types';

const App = ({ ingredients, isLoading, hasError, getIngredients, ingredientDetails, addIngredientDetails, removeIngredientDetails, addIngredientConstructor, 
    orderData, orderHasError, updateCountIngredients, removeOrderDetails }) => {

    useEffect(()=> {
        getIngredients();
    },[]);

    const handleOpenModal = useCallback((id) => {
        if (id) {
            const currentIngredient = ingredients.find(item => item._id === id)
            if(currentIngredient) {
                addIngredientDetails(currentIngredient);
            }  
        }
    })

    const handleCloseModal = useCallback(() => {
        if(ingredientDetails) {
            removeIngredientDetails();
        }
        removeOrderDetails(); 
    });

    const handleDrop = (item, itemBunId) => {
        if(item._id != itemBunId) {
            updateCountIngredients(item._id, itemBunId, item.type === 'bun' ? 2 : 1, item.type)
            addIngredientConstructor(item);
        }            
    }
   
    return (
        <div className={appStyles.app}>    
            {isLoading && 'Загрузка'}
                {hasError && 'Возникла ошибка'}
                {!isLoading && !hasError && ingredients && ingredients.length > 0 &&
                    <div>
                        <AppHeader />
                        <DndProvider backend={HTML5Backend}>
                            <div className={appStyles.container}>
                                <BurgerIngredients onCardClick={handleOpenModal} ingredients={ingredients}/>
                                <BurgerConstructor onButtonClick={handleOpenModal} onDropHandler={handleDrop}/>                               
                            </div>
                        </DndProvider>
                        {(orderData || ingredientDetails) && <Modal header={ingredientDetails ? "Детали ингредиента" : ""} onCloseClick={handleCloseModal}>
                        {orderData && !orderHasError && <OrderDetails orderData={orderData} />}
                        {ingredientDetails && <IngredientDetails {...ingredientDetails}/>}  
                        </Modal>}
                    </div>
                }
        </div>
    );
};

const mapStateToProps= (state) => {
    return {
        ingredients: state?.ingredients?.ingredients || null, 
        isLoading: state?.ingredients?.isLoading || false, 
        hasError: state?.ingredients?.hasError || false,
        ingredientDetails: state?.ingredientDetails?.currentIngredient || null,
        orderData: state?.order?.orderData || null,
        orderHasError: state?.order?.hasError || false
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getIngredients: () => dispatch(actions.getIngredients()),
        addIngredientDetails: (ingredient) => dispatch(actions.addIngredientDetails(ingredient)),
        removeIngredientDetails: () => dispatch(actions.removeIngredientDetails()), 
        getIngredientsConstructor: () => dispatch(actions.getIngredientsConstructor()),
        addIngredientConstructor: (ingredient) => dispatch(actions.addIngredientConstructor(ingredient)),
        updateCountIngredients: (id, itemBunId, value, itemType) => dispatch(actions.updateCountIngredients(id, itemBunId, value, itemType)),
        removeOrderDetails: () => dispatch(actions.removeOrderDetails())

    }
}

App.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes),
    isLoading: PropTypes.bool,
    hasError: PropTypes.bool,
    ingredientDetails: PropTypes.object,
    orderData: PropTypes.object,
    orderHasError: PropTypes.bool,
    getIngredients: PropTypes.func,
    addIngredientDetails: PropTypes.func,
    removeIngredientDetails: PropTypes.func, 
    getIngredientsConstructor: PropTypes.func,
    addIngredientConstructor: PropTypes.func,
    updateCountIngredients: PropTypes.func,
    removeOrderDetails: PropTypes.func

}

export default connect(mapStateToProps, mapDispatchToProps)(App);