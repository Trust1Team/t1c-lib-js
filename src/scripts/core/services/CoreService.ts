/**
 * @author Michallis Pashidis
 */
import {connection} from "../client/Connection";
import * as CoreExceptions from "../exceptions/CoreExceptions";

interface AbstractCore{
    info(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    types(callback:(error:CoreExceptions.RestException, data:any) => void):void;
}

const CORE_INFO = "/info";
const CORE_CARD_TYPES = "/card/gettypes"; // TODO should be on reader level

class CoreService implements AbstractCore{
    constructor(private url:string) {}
    public info(callback) {connection.get(this.url + CORE_INFO,callback);}
    public types(callback) {connection.get(this.url + CORE_CARD_TYPES,callback);}
}

export {AbstractCore,CoreService}