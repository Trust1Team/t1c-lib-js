/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @since 2016
 */

import {GCLConfig} from "./GCLConfig";
import {CardFactory} from "../Plugins/smartcards/CardFactory";
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
        this.connection = new LocalConnection();
        this.authConnection = new LocalAuthConnection();
        this.remoteConnection = new RemoteConnection();
        this.cardFactory = new CardFactory(this.cfg.gclUrl,this.connection);
        this.coreService = new CoreService(this.cfg.gclUrl,this.connection);
        this.dsClient = new DSClient(this.cfg.dsUrl,this.remoteConnection);

        //setup security - fail safe
        this.initSecurityContext();
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
        return resolvedCfg;
    }

    private initSecurityContext(){
        // TODO
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

}

export {GCLClient,GCLConfig}
