export type TResponseBody<T = {}> = T & {
    success: boolean;
    message?: string;
    headers?: Headers;
};

export interface CustomBody<T extends any> extends Body {
    json(): Promise<T>;
}

export interface CustomResponse<T> extends CustomBody<T> {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
}

export interface IRequest {
    method?: string,
    withAuth?: boolean,
    body?: BodyInit | null
    withCheckResponse?: boolean,
    fetchInitOptions?: RequestInit
}
