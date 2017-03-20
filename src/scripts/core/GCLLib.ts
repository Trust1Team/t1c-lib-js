/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @since 2016
 */

import {GCLConfig} from "./GCLConfig";
import {CardFactory} from "../Plugins/smartcards/CardFactory";
import * as CoreExceptions from "./exceptions/CoreExceptions";
import {AbstractEidBE} from "../Plugins/smartcards/eid/be/EidBe";
import {AbstractEidLUX} from "../Plugins/smartcards/eid/lux/EidLux";
import {EMV, AbstractEMV} from "../Plugins/smartcards/emv/EMV";
import {CoreService} from "./services/CoreService";
import {LocalConnection, RemoteConnection, LocalAuthConnection, LocalTestConnection} from "./client/Connection";
import {AbstractDSClient,DSClient} from "./ds/DSClient";
import {AbstractOCVClient,OCVClient} from "./ocv/OCVClient";
import {Mobib, AbstractMobib} from "../Plugins/smartcards/mobib/mobib";
import {AbstractLuxTrust} from "../Plugins/smartcards/luxtrust/LuxTrust";
import {AbstractOcra} from "../Plugins/smartcards/ocra/ocra";
import {AbstractAventraNo} from "../Plugins/smartcards/pki/AventraNo";
import {AbstractOberthurNo} from "../Plugins/smartcards/pki/OberthurNo";

class GCLClient {
    private cfg: GCLConfig;
    private cardFactory: CardFactory;
    private coreService: CoreService;
    private connection: LocalConnection;
    private authConnection: LocalAuthConnection;
    private remoteConnection: RemoteConnection;
    private localTestConnection: LocalTestConnection;
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
        this.localTestConnection = new LocalTestConnection(this.cfg);
        this.cardFactory = new CardFactory(this.cfg.gclUrl,this.connection,this.cfg);
        this.coreService = new CoreService(this.cfg.gclUrl,this.authConnection,this.cfg);
        if(this.cfg.localTestMode) this.dsClient = new DSClient(this.cfg.dsUrl,this.localTestConnection,this.cfg);
        else this.dsClient = new DSClient(this.cfg.dsUrl,this.remoteConnection,this.cfg);
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

        //verify OCV accessibility
        this.initOCVContext(function(err,data){
            if(err){
                console.warn("OCV not available for apikey, contact support@trust1team.com to add this capability");
            }else console.log("OCV available for apikey");
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
        resolvedCfg.localTestMode = cfg.localTestMode;
        return resolvedCfg;
    }

    /**
     * Init OCV - verify if OCV is available
     */
    private initOCVContext(cb){
        return this.ocvClient.getInfo(cb);
    }

    /**
     * Init security context
     */
    private initSecurityContext(cb){
        let self = this;
        let clientCb = cb;
        this.core().getPubKey(function(err:any,gclResponse){
            if(err && err.data && !err.data.success){
                // console.log('no certificate set - retrieve cert from DS');
                self.dsClient.getPubKey(function(err,dsResponse){
                    console.log(dsResponse);
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
                    if (err) {
                        console.log("Error while registering the device: " + JSON.stringify(err));
                        return;
                    }
                    self_cfg.jwt = activationResponse.token;
                    self.core().activate(function(err,data){
                        if (err) {
                            console.log(JSON.stringify(err));
                            return;
                        }
                        //sync
                        info.activated = true;
                        self.dsClient.sync(info,uuid,function(err,syncResponse){
                            if (err) {
                                console.log("Error while syncing the device: " + JSON.stringify(err));
                                return;
                            }
                        });
                    })
                });
            }else {
                //we need to synchronize the device
                //console.log("Sync device:"+uuid);
                self.dsClient.sync(info,uuid,function(err,activationResponse){
                    if (err) {
                        console.log("Error while syncing the device: " + JSON.stringify(err));
                        return;
                    }
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
    // get instance for luxemburg eID card
    public luxeid = (reader_id?:string, pin?:string):AbstractEidLUX => {return this.cardFactory.createEidLUX(reader_id, pin);};
    // get instance for luxtrust card
    public luxtrust = (reader_id?:string, pin?:string):AbstractLuxTrust => {return this.cardFactory.createLuxTrust(reader_id);};
    // get instance for EMV
    public emv = (reader_id?:string):AbstractEMV => {return this.cardFactory.createEmv(reader_id);};
    // get instance for MOBIB
    public mobib = (reader_id?:string):AbstractMobib => { return this.cardFactory.createMobib(reader_id); };
    // get instance for OCRA
    public ocra = (reader_id?:string):AbstractOcra => { return this.cardFactory.createOcra(reader_id); };
    // get instance for Aventra
    public aventra = (reader_id?:string):AbstractAventraNo => { return this.cardFactory.createAventraNO(reader_id); };
    // get instance for Oberthur
    public oberthur = (reader_id?:string):AbstractOberthurNo => { return this.cardFactory.createOberthurNO(reader_id); };

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
