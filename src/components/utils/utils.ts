
import { TokenSyntaxKind } from 'typescript';
import { TIngredient, TOrder, TResponseBody} from '../../services/types/data' 

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

export const checkResponse = <T>(res: TResponse<T>): Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

