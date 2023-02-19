import React, { useCallback, useMemo, useEffect } from 'react';
import { useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../header/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/oder-details'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredients-details/ingredient-details';
import { checkResponse } from '../utils/utils';
import { IngredientsContext, OrderContext } from  '../../services/appContext.js';

const url = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {

    const [stateModal, setStateModal] = useState({visibleOrder: false, visibleIngredient: false, ingredientId: ""});

    const [ingredientsState, setIngredientsState] = useState({ data: [], isLoading: false, hasError: false });

    const [orderState, setOrderState] = useState( { orderData: null, isLoading: false, hasError: false });


    const { visibleOrder, visibleIngredient, ingredientId } = stateModal;
    const { data, isLoading, hasError } = ingredientsState;

    useEffect(()=> {
        const ingredients = getIngredients();
    },[]);

    const getIngredients = () => {
        setIngredientsState({ ...ingredientsState, hasError: false, isLoading: true });
        fetch(url)
        .then(checkResponse)
        .then(data => setIngredientsState({ ...ingredientsState, data: data.data, isLoading: false }))
        .catch(e => {
            setIngredientsState({ ...ingredientsState, hasError: true, isLoading: false })
        });
    };

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
   
    return (
        <div className={appStyles.app}>
            <IngredientsContext.Provider value={{ ingredientsState, setIngredientsState }}>
                <OrderContext.Provider value={{ orderState, setOrderState }}>
                    {isLoading && 'Загрузка'}
                    {hasError && 'Возникла ошибка'}
                    {!isLoading && !hasError && data && data.length > 0 &&
                    <div>
                        <AppHeader />
                        <div className={appStyles.container}>
                            <BurgerIngredients onCardClick={handleOpenModal}/>
                            <BurgerConstructor onButtonClick={handleOpenModal}/>
                        </div>
                        {(visibleOrder || visibleIngredient) && <Modal header={visibleIngredient ? "Детали ингредиента" : ""} onCloseClick={handleCloseModal}>
                        {visibleOrder && !orderState.hasError && <OrderDetails />}
                        {visibleIngredient && ingredientData && <IngredientDetails {...ingredientData}/>}  
                        </Modal>
                    }
                </div>
                }
                </OrderContext.Provider>
            </IngredientsContext.Provider>
        </div>
    );
};

export default App;