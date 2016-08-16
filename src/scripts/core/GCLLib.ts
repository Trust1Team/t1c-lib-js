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
        // resolve config to singleton
        this.cfg = this.resolveConfig(cfg);
        // init communication
        this.connection = new LocalConnection();
        this.authConnection = new LocalAuthConnection();
        this.remoteConnection = new RemoteConnection();
        this.cardFactory = new CardFactory(this.cfg.gclUrl,this.connection);
        this.coreService = new CoreService(this.cfg.gclUrl,this.connection);
        this.dsClient = new DSClient(this.cfg.dsUrl,this.remoteConnection);

        //setup security - fail safe
        this.initSecurityContext();

        //check if implicit download has been set
        if(this.cfg.implicitDownload && true){ this.implicitDownload();}

        //register and activate
        this.registerAndActivate();
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

    private initSecurityContext(){
        // TODO
    }

    private registerAndActivate(){
        // TODO when activation flag set
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
