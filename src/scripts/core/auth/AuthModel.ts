/**
 * @author Maarten Somers
 * @since 2017
 */


import {RestException} from '../exceptions/CoreExceptions';

export {AbstractAuth, JWTResponse};


interface AbstractAuth {
    getJWT(callback?: (error: RestException, data: JWTResponse) => void): Promise<JWTResponse>;

    refreshJWT(currentJWT: string, callback?: (error: RestException, data: JWTResponse) => void): Promise<JWTResponse>;
}

class JWTResponse {
    constructor(public token: string) {
    }
}

