/**
 * @author Michallis Pashidis
 */
import {LocalConnection} from "../client/Connection";
import * as CoreExceptions from "../exceptions/CoreExceptions";

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
    pollCardInserted(secondsToPollReader:number,
                     secondsToPollCard:number,
                     callback:(error:CoreExceptions.RestException,data:any)=>void,
                     connectReader:()=>void,
                     readerTimeout:()=>void,
                     readerConnected:()=>void,
                     insertCard:()=>void,
                     cardTimeout:()=>void

    ):void;
    readersCardAvailable(callback:(error:CoreExceptions.RestException,data:any)=>void):void;
    readersCardsUnavailable(callback:(error:CoreExceptions.RestException,data:any)=>void):void;
    reader(reader_id:string,callback:(error:CoreExceptions.RestException,data:any)=>void):void;
    plugins(callback:(error:CoreExceptions.RestException,data:any)=>void):void;
    manage(callback:(error:CoreExceptions.RestException, data:any) => void):void;

    // sync
    infoBrowserSync():any;
/*    verify(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    download(callback:(error:CoreExceptions.RestException, data:any) => void):void;
    activate(apikey:string, callback:(error:CoreExceptions.RestException, data:any) => void):void;
    init(apikey:string, callback:(error:CoreExceptions.RestException, data:any) => void):void; //TODO complete verify/download/register/verificationpoll
    update(apikey:string, callback:(error:CoreExceptions.RestException, data:any) => void):void; //triggered by config
    detectCard(error, success, connectReader, readerConnected, readerTimeout, insertCard, cardInserted, cardTimeout);*/
}

const FILTER_CARD_INSERTED = "card-inserted=";
const CORE_INFO = "/";
const CORE_PLUGINS = "/plugins";
const CORE_READERS = "/card-readers";
const CORE_READER_ID = "/readers/{id}";
const CORE_DUMMY_JWT = "/admin/manage";

class CoreService implements AbstractCore{
    // constructor
    constructor(private url:string,private connection:LocalConnection) {}

    // async
    public info(callback:(error:CoreExceptions.RestException, data:any)=>void) {this.connection.get(this.url + CORE_INFO,callback);}
    public readers(callback:(error:CoreExceptions.RestException, data:any)=>void):void {this.connection.get(this.url + CORE_READERS,callback);}
    public readersCardAvailable(callback:(error:CoreExceptions.RestException, data:any)=>void):void {this.connection.get(this.url + CORE_READERS,callback,FILTER_CARD_INSERTED + 'true');}
    public readersCardsUnavailable(callback:(error:CoreExceptions.RestException, data:any)=>void):void {this.connection.get(this.url + CORE_READERS,callback,FILTER_CARD_INSERTED + 'false');}
    public reader(reader_id:string, callback:(error:CoreExceptions.RestException, data:any)=>void):void {this.connection.get(this.url + CORE_READERS + "/" + reader_id, callback);}
    public plugins(callback:(error:CoreExceptions.RestException, data:any)=>void):void {this.connection.get(this.url + CORE_PLUGINS,callback);}
    public manage(callback:(error:CoreExceptions.RestException, data:any)=>void) {this.connection.post(this.url + CORE_DUMMY_JWT,{},callback);}

    public infoBrowser(callback:(error:CoreExceptions.RestException, data:any)=>void):void{
        callback(null,this.platformInfo());
    }

    pollCardInserted(secondsToPollReade, secondsToPollCard, callback, connectReader, readerTimeout, readerConnected, insertCard, cardTimeout): void {
        //start polling if no card found
        let maxSeconds = secondsToPollCard;
        var self = this;

        this.pollReaders(secondsToPollCard,function(error, result){
            if(error) return this.callback(error.message);
            //reader found
            readerConnected(); //callback consumer
            console.debug("start poll for card inserted");
            //verify if reader has card object - if this is the case we don't need to start polling
            var readerWithCard = self.checkReadersForCardObject(result.data);
            if(readerWithCard!=null){
              return callback(null,readerWithCard);
            };
            //no card found - start polling
            cardInsertedTimeout(callback,insertCard,cardTimeout);
            function cardInsertedTimeout(cb,insertCb,cardTimeoutCb){
                setTimeout(function(){
                    console.debug("seconds left:",maxSeconds);
                    --maxSeconds;
                    self.readers(function(error,data){
                       if(error){
                           console.debug("Waiting...");
                           insertCb();
                           cardInsertedTimeout(cb,insertCb,cardTimeoutCb);
                       };
                       //no error but stop
                        if(maxSeconds==0){return cardTimeoutCb();}
                        else if(data.data.length === 0){
                            connectReader();
                            cardInsertedTimeout(cb,insertCb,cardTimeoutCb);
                        }else{
                            var readerWithCard = self.checkReadersForCardObject(data.data);
                            if(readerWithCard!=null){
                                return callback(null,readerWithCard);
                            }else cardInsertedTimeout(cb,insertCb,cardTimeoutCb);
                        }
                    });
                },1000);
            };
        },connectReader,readerTimeout);
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

    public pollReaders(secondsToPollReade:number, callback, connectReaderCb, readerTimeoutCb):void {
        let maxSeconds = secondsToPollReade;
        let self=this;
        console.debug("start poll readers");
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
}



export {AbstractCore,CoreService}