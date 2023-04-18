export type TIngredient = {
        readonly _id: string;
        readonly name: string;
        readonly type: string;
        readonly proteins: number;
        readonly fat: number;
        readonly carbohydrates: number;
        readonly calories: number;
        readonly price: number;
        readonly image: string;
        readonly image_mobile: string;
        readonly image_large: string;
        readonly __v: number;
        dragId?: string
}
type TOwner = {
    readonly name: string;
    readonly email: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}

export type TOrder = {
    readonly ingredients: ReadonlyArray<TIngredient>;
    readonly _id: string;
    readonly owner: TOwner;
    readonly status: TStatusOrder;
    readonly name: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly number: number;
    readonly price: number;
}

export type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
    [key in TDataKey]: TDataType
} & {
    success: boolean;
};

export type TResponseBodyAuth<TDataKey extends string = '', TDataType = {}> = {
    [key in TDataKey]: TDataType
} & {
    success: boolean;
    accessToken: string;
    refreshToken: string;
};

export type TRegisterForm = {
    name: string;
    email: string;
    password: string
}

export type TForm = Omit<TRegisterForm, 'name'>

export type TUser = {
    email: string;
    name: string
}

export type TFormResetPassword = {
    email: string;
}

export type TFormConfirmPassword = {
    password: string;
    token: string;
}

export type TTotalPriceState = {
    totalPrice: number;
}

export type TAction = {
    type: 'set' | 'reset';
    payload: number;
}

export type TRequestOrder = {
    ingredients: ReadonlyArray<string>
}

export type TStatusOrder = 'created' | 'pending' | 'done'

export type TWsOrder = {
    readonly ingredients: ReadonlyArray<string>;
    readonly _id: string;
    readonly status: TStatusOrder;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly number: number;
    readonly name: string;
}

export type TOrdersAll = {
    orders: ReadonlyArray<TWsOrder>;
    total: number;
    totalToday: number;
}

export enum WebSocketStatus {
    CONNECTING = 'CONNECTING',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}