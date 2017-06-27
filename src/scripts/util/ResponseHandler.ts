/**
 * @author Maarten Somers
 */
import { RestException } from "../core/exceptions/CoreExceptions";
import { T1CResponse } from "../core/service/CoreModel";
import { Promise } from "es6-promise";

export { ResponseHandler };


class ResponseHandler {
    public static error(err: RestException, callback?: (error: RestException, data: T1CResponse) => void) {
        if (callback && typeof callback === "function") { callback(err, null); }
        return Promise.reject(err);
    }

    public static response(data: T1CResponse, callback?: (error: RestException, data: T1CResponse) => void) {
        if (callback && typeof callback === "function") { callback(null, data); }
        return Promise.resolve(data);
    }
}
