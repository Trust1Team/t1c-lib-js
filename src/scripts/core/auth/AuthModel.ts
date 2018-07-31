/**
 * @author Maarten Somers
 * @since 2017
 */


import {T1CLibException} from '../exceptions/CoreExceptions';


export interface AbstractAuth {
    getJWT(callback?: (error: T1CLibException, data: JWTResponse) => void): Promise<JWTResponse>;

    refreshJWT(currentJWT: string, callback?: (error: T1CLibException, data: JWTResponse) => void): Promise<JWTResponse>;
}

export class JWTResponse {
    constructor(public token: string) {
    }
}

