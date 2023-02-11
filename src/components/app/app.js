import React, { useCallback, useMemo, useEffect } from 'react';
import { useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../header/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/oder-details'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredients-details/ingredient-details';

const url = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {

    const [stateModal, setStateModal] = useState({visibleOrder: false, visibleIngredient: false, ingredientId: ""});
    const [state, setState] = useState({ data: [], isLoading: false, hasError: false });

    const { visibleOrder, visibleIngredient, ingredientId } = stateModal;
    const { data, isLoading, hasError } = state;

    useEffect(()=> {
        getIngredients();
    },[]);

    const getIngredients = () => {
        setState({ ...state, hasError: false, isLoading: true });
        fetch(url)
        .then(res => res.json())
        .then(data => setState({ ...state, data: data.data, isLoading: false }))
        .catch(e => {
            setState({ ...state, hasError: true, isLoading: false })
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
            {isLoading && 'Загрузка'}
            {hasError && 'Возникла ошибка'}
            {!isLoading && !hasError && data && data.length > 0 &&
            <div>
                <AppHeader />
                <div className={appStyles.container}>
                    <BurgerIngredients ingredients={data} onCardClick={handleOpenModal}/>
                    <BurgerConstructor ingredients={data} onButtonClick={handleOpenModal}/>
                </div>
                {(visibleOrder || visibleIngredient) && <Modal header={visibleIngredient ? "Детали ингредиента" : ""} onCloseClick={handleCloseModal}>
                    {visibleOrder && <OrderDetails />}
                    {visibleIngredient && ingredientData && <IngredientDetails {...ingredientData}/>}  
                </Modal>
                }
            </div>
            }
        </div>
    );
};

export default App;