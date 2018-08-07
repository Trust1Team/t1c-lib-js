export declare class Options {
    parseCerts: boolean;
    filters?: string[];
    constructor(parseCerts: boolean, filters?: string[]);
}
export declare class RequestOptions {
    parseCerts: boolean;
    params?: {
        [key: string]: string;
    };
    callback?: () => void;
    constructor(parseCerts: boolean, params?: {
        [key: string]: string;
    }, callback?: () => void);
}
export declare class RequestHandler {
    static determineOptions(firstParam: any, secondParam: any): RequestOptions;
    static determineOptionsWithFilter(firstParam: string[] | Options): RequestOptions;
}
