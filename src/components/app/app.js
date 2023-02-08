import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../header/header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const App = () => {
    
   const data = require('../utils/data.json');

    return (
        <div className={appStyles.app}>
            <AppHeader />
            <div className={appStyles.container}>
                <BurgerIngredients ingredients={data} />
                <BurgerConstructor ingredients={data} />
            </div>
        </div>
    );
};

export default App;