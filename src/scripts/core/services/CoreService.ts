/**
 * @author Michallis Pashidis
 */
import {LocalConnection} from "../client/Connection";
import * as CoreExceptions from "../exceptions/CoreExceptions";

interface AbstractCore{
    info(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    readers(callback:(error:CoreExceptions.RestException,data:any)=>void):void;
    plugins(callback:(error:CoreExceptions.RestException,data:any)=>void):void;

/*    verify(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    download(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    activate(apikey:string, callback:(error:CoreExceptions.RestException, data:any) => void):void;
    init(apikey:string, callback:(error:CoreExceptions.RestException, data:any) => void):void; //TODO complete verify/download/register/verificationpoll
    update(apikey:string, callback:(error:CoreExceptions.RestException, data:any) => void):void; //triggered by config
    readers(callback:(error:CoreExceptions.RestException, data:any) => void):void; //will contain card info if card inserted
    pollReaders(config:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    pollCards(config:any,callback:(error:CoreExceptions.RestException, data:any) => void):void;
    detectReader(error, success, connectReader, readerTimeout);
    detectCard(error, success, connectReader, readerConnected, readerTimeout, insertCard, cardInserted, cardTimeout);*/
    browserInfo():any;
}

const QUERY_PARAM_FILTER = "filter=";
const CORE_INFO = "/";
const CORE_PLUGINS = "/plugins";
const CORE_READERS = "/readers";
const CORE_READER_ID = "/readers/{id}";
const CORE_DUMMY_JWT = "/manage";

class CoreService implements AbstractCore{
    constructor(private url:string,private connection:LocalConnection) {}

    public info(callback) {this.connection.get(this.url + CORE_INFO,callback);}
    public readers(callback:(error:CoreExceptions.RestException, data:any)=>void):void {this.connection.get(this.url + CORE_READERS,callback);}
    public plugins(callback:(error:CoreExceptions.RestException, data:any)=>void):void {this.connection.get(this.url + CORE_PLUGINS,callback);}

    public browserInfo():any{
        return {
            manufacturer: platform.manufacturer || '',
            browser: {
                name: platform.name,
                version: platform.version
            },
            os: {
                name: platform.os.family,
                version: platform.os.version,
                architecture: platform.os.architecture
            },
            ua: platform.ua
        };
    }
}



export {AbstractCore,CoreService}