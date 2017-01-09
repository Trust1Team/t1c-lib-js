/**
 * @author Michallis Pashidis
 */
import {LocalConnection, LocalAuthConnection,Connection} from "../client/Connection";
import * as CoreExceptions from "../exceptions/CoreExceptions";
import {GCLConfig} from "../GCLConfig";
declare var require: any;
var platform = require('platform');

interface AbstractCore{
    // async
    info(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    infoBrowser(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    readers(callback:(error:CoreExceptions.RestException,data:any)=>void):void;
    pollReaders(secondsToPollReader:number,
                callback:(error:CoreExceptions.RestException,data:any)=>void,
                connectReader:()=>void,
                readerTimeout:()=>void
    ):void;
    pollCardInserted(secondsToPollCard:number,
                     callback:(error:CoreExceptions.RestException,data:any)=>void,
                     connectReader:()=>void,
                     insertCard:()=>void,
                     cardTimeout:()=>void

    ):void;
    readersCardAvailable(callback:(error:CoreExceptions.RestException,data:any)=>void):void;
    readersCardsUnavailable(callback:(error:CoreExceptions.RestException,data:any)=>void):void;
    reader(reader_id:string,callback:(error:CoreExceptions.RestException,data:any)=>void):void;
    plugins(callback:(error:CoreExceptions.RestException,data:any)=>void):void;
    getPubKey(callback:(error:CoreExceptions.RestException,data:any)=>void):void;
    setPubKey(pubkey:any,callback:(error:CoreExceptions.RestException,data:any)=>void):void;
    activate(callback:(error:CoreExceptions.RestException, data:any) => void):void;

    // sync
    getUrl():String;
    infoBrowserSync():any;

    // t1c-lib-info
    version():String;
}

const CORE_INFO = "/";
const CORE_PLUGINS = "/plugins";
const CORE_READERS = "/card-readers";
const CORE_READER_ID = "/readers/{id}";
const CORE_ACTIVATE = "/admin/activate";
const CORE_PUB_KEY = "/admin/certificate";

function cardInsertedFilter(inserted:boolean):any {
    return { 'card-inserted': inserted };
}

class CoreService implements AbstractCore{
    // constructor
    constructor(private url:string,private connection:Connection,private cfg:GCLConfig) {}

    // async
    public info(callback:(error:CoreExceptions.RestException, data:any)=>void) {this.connection.get(this.url + CORE_INFO,callback);}
    public readers(callback:(error:CoreExceptions.RestException, data:any)=>void):void {this.connection.get(this.url + CORE_READERS, callback);}
    public readersCardAvailable(callback:(error:CoreExceptions.RestException, data:any)=>void):void {this.connection.get(this.url + CORE_READERS, callback, cardInsertedFilter(true));}
    public readersCardsUnavailable(callback:(error:CoreExceptions.RestException, data:any)=>void):void {this.connection.get(this.url + CORE_READERS, callback, cardInsertedFilter(false));}
    public reader(reader_id:string, callback:(error:CoreExceptions.RestException, data:any)=>void):void {this.connection.get(this.url + CORE_READERS + "/" + reader_id, callback);}
    public plugins(callback:(error:CoreExceptions.RestException, data:any)=>void):void {this.connection.get(this.url + CORE_PLUGINS,callback);}
    public activate(callback:(error:CoreExceptions.RestException, data:any)=>void) {this.connection.post(this.url + CORE_ACTIVATE,{},callback);}
    public getPubKey(callback:(error:CoreExceptions.RestException, data:any)=>void) {this.connection.get(this.url + CORE_PUB_KEY,callback);}
    public setPubKey(pubkey:any,callback:(error:CoreExceptions.RestException, data:any)=>void) {
        var req:any = {};
        req.certificate = pubkey;
        this.connection.put(this.url + CORE_PUB_KEY,req,callback);
    }

    public infoBrowser(callback:(error:CoreExceptions.RestException, data:any)=>void):void{
        callback(null,this.platformInfo());
    }

    pollCardInserted(secondsToPollCard, callback, connectReaderCb, insertCardCb, cardTimeoutCb): void {
        let maxSeconds = secondsToPollCard;
        let self=this;
        console.debug("start poll cards");

        //recursive function
        cardTimeout(callback,cardTimeoutCb,connectReaderCb,insertCardCb);
        function cardTimeout(cb,rtcb,crcb,iccb) {
            let selfTimeout = this;
            setTimeout(function () {
                console.debug("seconds left:",maxSeconds);
                --maxSeconds;
                self.readers(function(error, data){
                    if(error){
                        console.debug("Waiting...");
                        crcb(); //ask to connect reader
                        cardTimeout(cb,rtcb,crcb,iccb); //no reader found and waiting - recursive call
                    };
                    // no error but stop
                    if(maxSeconds==0){return rtcb();} //reader timeout
                    else if(data.data.length === 0) {
                        console.debug("Waiting...");
                        crcb(); //ask to connect reader
                        cardTimeout(cb, rtcb, crcb, iccb);
                    } else {
                        let readerWithCard = self.checkReadersForCardObject(data.data);
                        if(readerWithCard != null){
                            console.debug("card found: "+ JSON.stringify(readerWithCard));
                            return cb(null,readerWithCard);
                        }else{
                            iccb();
                            cardTimeout(cb, rtcb, crcb, iccb);
                        }
                    }
                });
            }, 1000);
        };
    }

    /**
     * Checks for card element in readers response
     * @param readers
     * @returns {any}
     */
    private checkReadersForCardObject(readers:any):any{
        if(readers && readers.length>0){
            for (var i in readers){
                if(readers[i].card)return readers[i];
            }
        } else return null;
    }

    public pollReaders(secondsToPollReader:number, callback, connectReaderCb, readerTimeoutCb):void {
        let maxSeconds = secondsToPollReader;
        let self=this;
        console.debug("start poll readers");

        //recursive function
        readerTimeout(callback,readerTimeoutCb,connectReaderCb);
        function readerTimeout(cb,rtcb,crcb) {
            let selfTimeout = this;
            setTimeout(function () {
                console.debug("seconds left:",maxSeconds);
                --maxSeconds;
                self.readers(function(error, data){
                    if(error){
                        console.debug("Waiting...");
                        crcb(); //ask to connect reader
                        readerTimeout(cb,rtcb,crcb); //no reader found and waiting - recursive call
                    };
                    // no error but stop
                    if(maxSeconds==0){return rtcb();} //reader timeout
                    else if(data.data.length === 0) {
                        console.debug("Waiting...");
                        crcb(); //ask to connect reader
                        readerTimeout(cb,rtcb,crcb);
                    }
                    else {
                        console.debug("readerCount:",data.data.length);
                        return cb(null,data);
                    }
                });
            }, 1000);
        };
    }

    // sync
    public infoBrowserSync(){return this.platformInfo();}
    public getUrl(){return this.url;}

    // private methods
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

    // get Lib version
    public version() {
        return '%%GULP_INJECT_VERSION%%';
    }
}



export {AbstractCore,CoreService}