import { RestException } from '../exceptions/CoreExceptions';
export { AbstractAuth, JWTResponse };
interface AbstractAuth {
    getJWT(callback?: (error: RestException, data: JWTResponse) => void): Promise<JWTResponse>;
    refreshJWT(currentJWT: string, callback?: (error: RestException, data: JWTResponse) => void): Promise<JWTResponse>;
}
declare class JWTResponse {
    token: string;
    constructor(token: string);
}
