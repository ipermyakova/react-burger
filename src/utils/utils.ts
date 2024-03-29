import { ResultType } from '@remix-run/router/dist/utils';
import { TIngredient, TOrder, TResponseBody} from '../services/types/data' 

const NORMA_API = 'https://norma.nomoreparties.space/api'

type TResponse<T> = {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
  json(): Promise<T>
}

type TColumn = {
    readonly first?: TIngredient;
    readonly second?: TIngredient;
}

export const mapToColums = (arr: ReadonlyArray<TIngredient>): Array<TColumn> => {
    const result: Array<TColumn> = [];
    if(arr.length === 0) return result;
    result[0] = {first: arr[0]};
    let n = 0;
    for (let i = 1; i < arr.length; i++) {
        if(i % 2 === 0) {
            n++;
            result[n] = {...result[n], first: arr[i]}
        } else {
            result[n] = {...result[n], second: arr[i]}
        }
    }
    return result;
}

export const filter = (ingredients: ReadonlyArray<TIngredient>, current: string) => {
    return ingredients.filter(item => item.type === current);  
}

export const request = (endpoint: string, options: any) => {
    return fetch(`${NORMA_API}${endpoint}`, options).then(checkResponse);
}

export const checkResponse = <T>(res: TResponse<T>): Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const toDate = (dateStr: string | undefined): Date => {
    if(!dateStr) {
        return new Date()
    }
    const date = new Date(dateStr);
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date (date.getTime() + timezoneOffset);
}

export const uniq = <T>(array: Array<T>): Array<T> => {
    let result: Array<T> =[];
    array.forEach(item => {
        if(result.indexOf(item) < 0)
        result.push(item)
    })
    return result;
}

