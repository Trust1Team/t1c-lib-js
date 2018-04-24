import { RestException } from '../core/exceptions/CoreExceptions';
export { ResponseHandler };
declare class ResponseHandler {
    static error(err: RestException, callback?: (error: RestException, data: any) => void): Promise<never>;
    static response(data: any, callback?: (error: RestException, data: any) => void): Promise<any>;
}
