/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @since 2016
 */

import {GCLConfig} from "./GCLConfig";
import {CardFactory} from "../Plugins/smartcards/CardFactory";
import * as CoreExceptions from "./exceptions/CoreExceptions";
import {AbstractEidBE} from "../Plugins/smartcards/eid/be/EidBe";
import {EMV} from "../Plugins/smartcards/emv/EMV";
import {CoreService} from "./services/CoreService";
import {LocalConnection, RemoteConnection, LocalAuthConnection} from "./client/Connection";
import {AbstractDSClient,DSClient} from "./ds/DSClient";

class GCLClient {
    private cfg: GCLConfig;
    private cardFactory: CardFactory;
    private coreService: CoreService;
    private connection: LocalConnection;
    private authConnection: LocalAuthConnection;
    private remoteConnection: RemoteConnection;
    private dsClient: DSClient;

    constructor(cfg: GCLConfig) {
        let self = this;
        // resolve config to singleton
        this.cfg = this.resolveConfig(cfg);
        // init communication
        this.connection = new LocalConnection();
        this.authConnection = new LocalAuthConnection();
        this.remoteConnection = new RemoteConnection();
        this.cardFactory = new CardFactory(this.cfg.gclUrl,this.connection);
        this.coreService = new CoreService(this.cfg.gclUrl,this.authConnection);
        this.dsClient = new DSClient(this.cfg.dsUrl,this.remoteConnection);

        //check if implicit download has been set
        if(this.cfg.implicitDownload && true){ this.implicitDownload();}

        //setup security - fail safe
        this.initSecurityContext(function(err,data){
            if(err) {
                console.log(JSON.stringify(err));
                return;
            }
            self.registerAndActivate();
        });
    }

    private resolveConfig(cfg:GCLConfig) {
        var resolvedCfg:GCLConfig = GCLConfig.Instance;
        resolvedCfg.apiKey = cfg.apiKey;
        resolvedCfg.allowAutoUpdate = cfg.allowAutoUpdate;
        resolvedCfg.client_id = cfg.client_id;
        resolvedCfg.client_secret = cfg.client_secret;
        resolvedCfg.jwt = cfg.jwt;
        resolvedCfg.dsUrl = cfg.dsUrl;
        resolvedCfg.gclUrl = cfg.gclUrl;
        resolvedCfg.implicitDownload = cfg.implicitDownload;
        return resolvedCfg;
    }

    /**
     * Init security context
     */
    private initSecurityContext(cb){
        let self = this;
        let clientCb = cb;
        this.core().getPubKey(function(err:any,gclResponse){
            if(err && err.responseJSON && !err.responseJSON.success){
                //no certificate set - retrieve cert from DS
                self.dsClient.getPubKey(function(err,dsResponse){
                    if(err) return clientCb(err,null);
                    let innerCb = clientCb;
                    self.core().setPubKey(dsResponse.pubkey,function(err,response){
                        if(err) return innerCb(err,null);
                        return innerCb(null,{});
                    })
                })
            }
            // certificate loaded
            return cb(null,{});
        })
    }

    private registerAndActivate(){
        let self = this;
        //get GCL info
        self.core().info(function(err,infoResponse:any){
            if(err) {console.log(JSON.stringify(err));return;}
            let activated = infoResponse.data.activated;
            let managed = infoResponse.data.managed;
            let core_version = infoResponse.data.version;
            let uuid = infoResponse.data.uid;
            console.log("GCL activated?:" + activated);
            console.log("GCL managed?:" + managed);
            if(!activated){
                console.log("GCL perform activation");
                let info = self.core().infoBrowserSync();
                info.managed = managed;
                info.core_version = core_version;
                info.activated = activated;
                self.dsClient.register(info,uuid,function(err,activationResponse){
                    if(err) return;
                    console.log(JSON.stringify(activationResponse));
                    GCLConfig.Instance.jwt = activationResponse.token;
                    self.core().activate(function(err,data){console.log(JSON.stringify(data)); return;})
                });
            }else {
                console.log("GCL activated");
                return;
            }
/*            if(activated) self.syncDevice(uuid);
            else self.registerDevice(uuid);*/
        });
    }

    private syncDevice(uuid){
        //get device from DS
        //this.dsClient.getDevice()
        //if activated && uuid registered => sync
        //if activated && uuid unregistered => put
    }

    private registerDevice(uuid){
        //if not activated && uuid unregistered => put
        //if not activated && uuid registered => sync
    }

    // get core services
    public core = ():CoreService => {return this.coreService;};
    // get core config
    public config = ():GCLConfig => {return this.cfg};
    // get ds client services
    public ds = ():AbstractDSClient => {return this.dsClient;};
    // get instance for belgian eID card
    public beid = (reader_id?:string):AbstractEidBE => {return this.cardFactory.createEidBE(reader_id);};
    // get instance for EMV
    public emv = (reader_id?:string):EMV => {return this.cardFactory.createEmv(reader_id);};

    // facade implementation

    // implicit download GCL instance when not found
    private implicitDownload(){
        var self = this;
        this.core().info(function(error,data){
            console.log("implicit error",JSON.stringify(error));
            if(error){
                // no gcl available - start download
                let _info = self.core().infoBrowserSync();
                console.log("implicit error",JSON.stringify(_info));
                self.ds().downloadLink(_info,function(error:CoreExceptions.RestException, downloadResponse:any){
                    if(error)console.error("could not download GCL package:",error.description);
                    window.open(downloadResponse.url); return;
                });
            } else return;
        })
    }
}

export {GCLClient,GCLConfig}
