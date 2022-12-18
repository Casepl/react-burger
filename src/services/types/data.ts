import {IIngredientProps} from "../../constants/burgers-prop-type";
import exp from "constants";

export interface IOrderResponse {
    readonly name: string,
    readonly order: { number: number }
}

export interface ILoginResponse {
    readonly accessToken: string,
    readonly refreshToken: string,
    readonly user: IUser
}

export interface IRegistrationResponse {
    readonly user:{
        email:string,
        name:string
    },
    readonly accessToken: string,
    readonly refreshToken: string
}

export interface IResponseUser {
    readonly user:{
        readonly email: string,
        readonly name: string
    }
}


export interface ITokenResponse {
    readonly accessToken: string,
    readonly refreshToken: string
}

export interface IUser {
    readonly email: string,
    readonly name: string
}

export interface IIngredientsResponse {
    data: IIngredientProps[]
}

export interface ILoginForm {
    email: string,
    password: string
}

export interface IUserPatchForm {
    email?: string,
    password?: string,
    name?: string
}

export interface IIngredientActionGet {
    items: IIngredientProps[]
}

export type TStatus = 'created' | 'pending' | 'done';

export interface IResetPasswordForm {
    token: string,
    password: string
}

export interface IOrder {
    ingredients: ReadonlyArray<string>
    _id: string,
    status: TStatus,
    name: string,
    number: number,
    createdAt: string,
    updatedAt: string
}

export interface Feed {
    orders: IOrder[]
    total: number,
    totalToday: number
}
