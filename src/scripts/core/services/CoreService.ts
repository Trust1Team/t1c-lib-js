/**
 * @author Michallis Pashidis
 */
import {LocalConnection} from "../client/Connection";
import * as CoreExceptions from "../exceptions/CoreExceptions";

interface AbstractCore{
    info(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    infoBrowser(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    readers(callback:(error:CoreExceptions.RestException,data:any)=>void):void;
    readersCardAvailable(callback:(error:CoreExceptions.RestException,data:any)=>void):void;
    readersCardsUnavailable(callback:(error:CoreExceptions.RestException,data:any)=>void):void;
    reader(reader_id:string,callback:(error:CoreExceptions.RestException,data:any)=>void):void;
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
}

const FILTER_CARD_INSERTED = "card-inserted=";
const CORE_INFO = "/";
const CORE_PLUGINS = "/plugins";
const CORE_READERS = "/card-readers";
const CORE_READER_ID = "/readers/{id}";
const CORE_DUMMY_JWT = "/manage";

class CoreService implements AbstractCore{
    constructor(private url:string,private connection:LocalConnection) {}

    public info(callback:(error:CoreExceptions.RestException, data:any)=>void) {this.connection.get(this.url + CORE_INFO,callback);}
    public readers(callback:(error:CoreExceptions.RestException, data:any)=>void):void {this.connection.get(this.url + CORE_READERS,callback);}
    public readersCardAvailable(callback:(error:CoreExceptions.RestException, data:any)=>void):void {this.connection.get(this.url + CORE_READERS,callback,FILTER_CARD_INSERTED + 'true');}
    public readersCardsUnavailable(callback:(error:CoreExceptions.RestException, data:any)=>void):void {this.connection.get(this.url + CORE_READERS,callback,FILTER_CARD_INSERTED + 'false');}
    public reader(reader_id:string, callback:(error:CoreExceptions.RestException, data:any)=>void):void {this.connection.get(this.url + CORE_READERS + "/" + reader_id, callback);}
    public plugins(callback:(error:CoreExceptions.RestException, data:any)=>void):void {this.connection.get(this.url + CORE_PLUGINS,callback);}

    public infoBrowser(callback:(error:CoreExceptions.RestException, data:any)=>void):void{
        callback(null,this.platformInfo());
    }

    private platformInfo():any{
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