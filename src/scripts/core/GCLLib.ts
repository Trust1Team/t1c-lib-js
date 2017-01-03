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
import {AbstractOCVClient,OCVClient} from "./ocv/OCVClient";

class GCLClient {
    private cfg: GCLConfig;
    private cardFactory: CardFactory;
    private coreService: CoreService;
    private connection: LocalConnection;
    private authConnection: LocalAuthConnection;
    private remoteConnection: RemoteConnection;
    private dsClient: DSClient;
    private ocvClient: OCVClient;

    constructor(cfg: GCLConfig) {
        let self = this;
        // resolve config to singleton
        this.cfg = this.resolveConfig(cfg);
        // init communication
        this.connection = new LocalConnection(this.cfg);
        this.authConnection = new LocalAuthConnection(this.cfg);
        this.remoteConnection = new RemoteConnection(this.cfg);
        this.cardFactory = new CardFactory(this.cfg.gclUrl,this.connection,this.cfg);
        this.coreService = new CoreService(this.cfg.gclUrl,this.authConnection,this.cfg);
        this.dsClient = new DSClient(this.cfg.dsUrl,this.remoteConnection,this.cfg);
        this.ocvClient = new OCVClient(this.cfg.ocvUrl,this.remoteConnection,this.cfg);

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
        var resolvedCfg:GCLConfig = new GCLConfig(cfg.dsUrlBase,cfg.apiKey); //must be the base url because the GCLConfig object adds the context path and keeps the base url intact
        resolvedCfg.allowAutoUpdate = cfg.allowAutoUpdate;
        resolvedCfg.client_id = cfg.client_id;
        resolvedCfg.client_secret = cfg.client_secret;
        resolvedCfg.jwt = cfg.jwt;
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
        let self_cfg = this.cfg;
        //get GCL info
        self.core().info(function(err,infoResponse:any){
            if(err) {console.log(JSON.stringify(err));return;}
            let activated = infoResponse.data.activated;
            let managed = infoResponse.data.managed;
            let core_version = infoResponse.data.version;
            let uuid = infoResponse.data.uid;
            //compose info
            let info = self.core().infoBrowserSync();
            info.managed = managed;
            info.core_version = core_version;
            info.activated = activated;
            if(!activated){
                //we need to register the device
                //console.log("Register device:"+uuid);
                self.dsClient.register(info,uuid,function(err,activationResponse){
                    if(err) return;
                    self_cfg.jwt = activationResponse.token;
                    self.core().activate(function(err,data){
                        if(err)return;//will try again upon next sync
                        //sync
                        info.activated = true;
                        self.dsClient.sync(info,uuid,function(err,syncResponse){
                           return; //ignore response
                        });
                    })
                });
            }else {
                //we need to synchronize the device
                //console.log("Sync device:"+uuid);
                self.dsClient.sync(info,uuid,function(err,activationResponse){
                    if(err) return;
                    self_cfg.jwt = activationResponse.token;
                    return;
                });
            }
        });
    }

    // get core services
    public core = ():CoreService => {return this.coreService;};
    // get core config
    public config = ():GCLConfig => {return this.cfg};
    // get ds client services
    public ds = ():AbstractDSClient => {return this.dsClient;};
    // get ocv client services
    public ocv = ():AbstractOCVClient => {return this.ocvClient;};
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

// get Lib version
function version() {
    return '%%GULP_INJECT_VERSION%%';
}

export {GCLClient,GCLConfig,version}
