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
import {LocalConnection} from "./client/Connection";
import {AbstractDSClient,DSClient} from "./ds/DSClient";

class GCLClient {
    private cfg: GCLConfig;
    private cardFactory: CardFactory;
    private coreService: CoreService;
    private connection: LocalConnection;
    private dsClient: DSClient;

    constructor(cfg: GCLConfig) {
        this.cfg = cfg || new GCLConfig();
        this.connection = new LocalConnection();
        this.cardFactory = new CardFactory(this.cfg.gclUrl,this.connection);
        this.coreService = new CoreService(this.cfg.gclUrl,this.connection);
        this.dsClient = new DSClient(this.cfg.dsUrl,this.connection);
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
