export interface IOrderResponse {
    readonly name: string,
    readonly order: { number: number }
}

export interface ILoginResponse {
    readonly accessToken: string,
    readonly refreshToken: string,
    readonly user:{
        readonly email: string,
        readonly name: string
    }
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
    readonly token: string;
}
