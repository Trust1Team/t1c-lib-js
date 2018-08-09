/**
 * @author Maarten Somers
 */
import * as lodash from 'lodash';

export class Options {
    constructor(public parseCerts: boolean, public filters?: string[]) {}
}

export class RequestOptions {
    constructor(public parseCerts: boolean, public params?: { [key: string]: string}, public callback?: () => void) {}
}

export class RequestHandler {
    // TODO deprecate for v3
    // maintains backward compatibility with the old request style
    public static determineOptions(firstParam: any, secondParam: any): RequestOptions {
        let result = new RequestOptions(false);
        if (firstParam) {
            if (typeof firstParam === 'function') { result.callback = firstParam; }
            else {
                result.callback = secondParam;
                if (lodash.has(firstParam, 'parseCerts')) { result.parseCerts = firstParam.parseCerts; }
            }
        } else {
            // no first param, check second
            if (typeof secondParam === 'function') { result.callback = secondParam; }
        }
        return result;
    }

    public static determineOptionsWithFilter(firstParam: string[] | Options): RequestOptions {
        let result = new RequestOptions(false, {});
        if (lodash.isArray(firstParam)) {
            // array of strings; assume parse boolean is false
            if (firstParam.length) { result.params.filter = firstParam.join(','); }
        } else if (lodash.isObject(firstParam)) {
            // not an array, but object
            if (lodash.has(firstParam, 'filters') && lodash.isArray(firstParam.filters)) {
                if (firstParam.filters.length) { result.params.filter = firstParam.filters.join(','); }
            }
            if (lodash.has(firstParam, 'parseCerts')) { result.parseCerts = firstParam.parseCerts; }
        }
        return result;
    }
}
