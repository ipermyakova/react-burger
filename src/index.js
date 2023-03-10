import { createRoot } from "react-dom/client"

import App from './components/app/app';
import React from 'react';
import { Provider } from 'react-redux';
import './index.css'; 
import store from './services'


const root = createRoot(document.getElementById('root'));
root.render(
    
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>     
    </React.StrictMode>
)

