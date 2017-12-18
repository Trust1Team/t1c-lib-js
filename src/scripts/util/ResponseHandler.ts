/**
 * @author Maarten Somers
 */
import { RestException } from '../core/exceptions/CoreExceptions';
import { Promise } from 'es6-promise';

export { ResponseHandler };


class ResponseHandler {
    public static error(err: RestException, callback?: (error: RestException, data: any) => void) {
        if (callback && typeof callback === 'function') { callback(err, null); }
        return Promise.reject(err);
    }

    public static response(data: any, callback?: (error: RestException, data: any) => void) {
        if (callback && typeof callback === 'function') { callback(null, data); }
        return Promise.resolve(data);
    }
}
