import React, { useCallback, useMemo, useEffect } from 'react';
import { useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../header/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/oder-details'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredients-details/ingredient-details';
import { IngredientsContext, OrderContext } from  '../../services/appContext.js';
import { getIngredients } from '../utils/burger-api.js'

const App = () => {

    const [stateModal, setStateModal] = useState({visibleOrder: false, visibleIngredient: false, ingredientId: ""});

    const [ingredientsState, setIngredientsState] = useState({ data: [], isLoading: false, hasError: false });

    const [orderState, setOrderState] = useState( { orderData: null, isLoading: false, hasError: false });


    const { visibleOrder, visibleIngredient, ingredientId } = stateModal;
    const { data, isLoading, hasError } = ingredientsState;

    useEffect(()=> {
        getIngredients(ingredientsState, setIngredientsState);
    },[]);

    
    const handleOpenModal = useCallback((id) => {
        if (id) {
            setStateModal({...stateModal, visibleIngredient: true, ingredientId: id});
        } else {
            setStateModal({...stateModal, visibleOrder: true });
        }
    })


    const handleCloseModal = useCallback(() => {
        setStateModal({...stateModal, visibleOrder: false, visibleIngredient: false, ingredientId: ''})
    });

    const ingredientData = useMemo(() => data.find(item => item._id === ingredientId), [ingredientId, data]);

    const ingredientsValue = useMemo(() => { return { ingredientsState, setIngredientsState }}, [ingredientsState, setIngredientsState])
    const orderValue = useMemo(() => { return { orderState, setOrderState }}, [orderState, setOrderState])
   
    return (
        <div className={appStyles.app}>    
            {isLoading && 'Загрузка'}
                {hasError && 'Возникла ошибка'}
                {!isLoading && !hasError && data && data.length > 0 &&
                    <div>
                        <AppHeader />
                        <OrderContext.Provider value={orderValue}>
                        <div className={appStyles.container}>
                            <IngredientsContext.Provider value={ingredientsValue}>
                                <BurgerIngredients onCardClick={handleOpenModal}/>
                                <BurgerConstructor onButtonClick={handleOpenModal}/>
                            </IngredientsContext.Provider>    
                        </div>
                        {(visibleOrder || visibleIngredient) && <Modal header={visibleIngredient ? "Детали ингредиента" : ""} onCloseClick={handleCloseModal}>
                            {visibleOrder && !orderState.hasError && <OrderDetails />}
                        {visibleIngredient && ingredientData && <IngredientDetails {...ingredientData}/>}  
                        </Modal>}
                        </OrderContext.Provider>
                    </div>
                }
        </div>
    );
};

export default App;