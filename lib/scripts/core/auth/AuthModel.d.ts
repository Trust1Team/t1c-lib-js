import { T1CLibException } from '../exceptions/CoreExceptions';
export interface AbstractAuth {
    getJWT(callback?: (error: T1CLibException, data: JWTResponse) => void): Promise<JWTResponse>;
    refreshJWT(currentJWT: string, callback?: (error: T1CLibException, data: JWTResponse) => void): Promise<JWTResponse>;
}
export declare class JWTResponse {
    token: string;
    constructor(token: string);
}
