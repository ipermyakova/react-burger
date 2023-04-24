import { TGetOrder, TIngredient, TOrder, TOrdersAll, TUser } from "../types/data"

export const ingredients: ReadonlyArray<TIngredient> = [{
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
    dragId: "0"
},
{
    _id: "643d69a5c3f7b9001cfa0941",
    name: "Биокотлета из марсианской Магнолии",
    type: "main",
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    __v: 0,
    dragId: "1"
},
{
    _id: "643d69a5c3f7b9001cfa093e",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v: 0,
    dragId: "2"
}]

export const bun = ingredients[0]

export const main1 = ingredients[1]

export const main2 = ingredients[2]

export const constructor = [main1, main2]

export const reverseConstructor = [main2, main1]

export const order1: TGetOrder = {
    _id: "64404ec245c6f2001be6bdb2",
    ingredients: [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa093d"
    ],
    owner: "643f95c345c6f2001be6b5ae",
    status: "done",
    name: "Space флюоресцентный бургер",
    createdAt: "2023-04-19T20:27:46.290Z",
    updatedAt: "2023-04-19T20:27:46.365Z",
    number: 765
}

export const order2: TOrder = {
    _id: "6441230d45c6f2001be6c0d5",
    ingredients: [bun, main1, main2, bun],
    owner: {
        name: "name", 
        email: "test@gmail.com", 
        createdAt: "2023-04-19T07:18:27.941Z",
        updatedAt: "2023-04-19T07:18:27.941Z",
    },
    status: "done",
    name: "Антарианский флюоресцентный бургер",
    createdAt: "2023-04-19T20:27:46.290Z",
    updatedAt: "2023-04-19T20:27:46.365Z",
    number: 765,
    price: 2064
}

export const orders: TOrdersAll = {
    orders: [order1],
    total: 1234,
    totalToday: 567
}

export const user: TUser = {
    name: "Irina",
    email: "test@gmail.com"
}

export const authResponse = {
    user: {...user},
    success: true,
    accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2Y5NWMzNDVjNmYyMDAxYmU2YjVhZSIsImlhdCI6MTY4MjA1OTQyOCwiZXhwIjoxNjgyMDYwNjI4fQ.o-b2oU8c_M0_Hcfl9UfXxHstjWhKrhgL-SpNnU1LEyk",
    refreshToken: "5d9cca8edaff238cd81cb39ae81426fb6e499c81e1972951f693a80f64a2f32ffcb0bdf19c77a806"
};

export const response = {
    message: "message",
    success: true
}

export const userResponse = {
    user: user,
    success: true
}

export const tokenResponse = {
    "": "",
    success: true,
    accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2Y5NWMzNDVjNmYyMDAxYmU2YjVhZSIsImlhdCI6MTY4MjA1OTQyOCwiZXhwIjoxNjgyMDYwNjI4fQ.o-b2oU8c_M0_Hcfl9UfXxHstjWhKrhgL-SpNnU1LEyk",
    refreshToken: "5d9cca8edaff238cd81cb39ae81426fb6e499c81e1972951f693a80f64a2f32ffcb0bdf19c77a806"
};

