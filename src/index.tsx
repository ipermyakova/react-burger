import { createRoot } from "react-dom/client"

import App from './components/app/app';
import React from 'react';
import { Provider } from 'react-redux';
import './index.css'; 
import store from './services/store'

const rootElement = document.getElementById('root'); 
if(!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

root.render(
    
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>     
    </React.StrictMode>
)

