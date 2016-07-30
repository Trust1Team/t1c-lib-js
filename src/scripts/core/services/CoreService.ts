/**
 * @author Michallis Pashidis
 */
import {connection} from "../client/Connection";
import * as CoreExceptions from "../exceptions/CoreExceptions";

interface AbstractCore{
    info(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    types(callback:(error:CoreExceptions.RestException, data:any) => void):void; // TODO will dissappear
    verify(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    download(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    activate(apikey:string, callback:(error:CoreExceptions.RestException, data:any) => void):void;
    init(apikey:string, callback:(error:CoreExceptions.RestException, data:any) => void):void; //TODO complete verify/download/register/verificationpoll
    update(apikey:string, callback:(error:CoreExceptions.RestException, data:any) => void):void; //triggered by config
    readers(callback:(error:CoreExceptions.RestException, data:any) => void):void; //will contain card info if card inserted
    pollReaders(config:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    pollCards(config:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
}

const CORE_INFO = "/info";
const CORE_CARD_TYPES = "/card/gettypes"; // TODO should be on reader level

class CoreService implements AbstractCore{
    verify(callback:(error:CoreExceptions.RestException, data:any)=>void):void {
    }

    download(callback:(error:CoreExceptions.RestException, data:any)=>void):void {
    }

    activate(apikey:string, callback:(error:CoreExceptions.RestException, data:any)=>void):void {
    }

    init(apikey:string, callback:(error:CoreExceptions.RestException, data:any)=>void):void {
    }

    update(apikey:string, callback:(error:CoreExceptions.RestException, data:any)=>void):void {
    }

    readers(callback:(error:CoreExceptions.RestException, data:any)=>void):void {
    }

    pollReaders(config:any, callback:(error:CoreExceptions.RestException, data:any)=>void):void {
    }

    pollCards(config:any, callback:(error:CoreExceptions.RestException, data:any)=>void):void {
    }
    constructor(private url:string) {}
    public info(callback) {connection.get(this.url + CORE_INFO,callback);}
    public types(callback) {connection.get(this.url + CORE_CARD_TYPES,callback);}
    public readTextFile(file)
    {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    alert(allText);
                }
            }
        };
        rawFile.send(null);
    }
}



export {AbstractCore,CoreService}