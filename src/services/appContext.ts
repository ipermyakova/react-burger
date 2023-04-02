import React, { createContext } from 'react';
import { TTotalPriceState, TAction } from './types/data'

type TTotalPriceContext = {
    totalPriceState: TTotalPriceState; 
    totalPriceDispatcher: React.Dispatch<TAction> | undefined;
}

const initTotalPriceContext = {
    totalPriceState: {
        totalPrice: 0
    },
    totalPriceDispatcher: undefined
}

export const TotalPriceContext = createContext<TTotalPriceContext>(initTotalPriceContext);