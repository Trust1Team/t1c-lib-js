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
    private config: GCLConfig;
    private cardFactory: CardFactory;
    private coreService: CoreService;
    private connection: LocalConnection;
    private dsClient: DSClient;

    constructor(config: GCLConfig) {
        console.debug("config:",JSON.stringify(config));

        this.config = config || new GCLConfig();
        this.connection = new LocalConnection();
        this.cardFactory = new CardFactory(this.config.gclUrl,this.connection);
        this.coreService = new CoreService(this.config.gclUrl,this.connection);
        this.dsClient = new DSClient("http://localhost:8080/gcl-ds-web/v1",this.connection);

        //console.debug("platform",JSON.stringify(this.core().browserInfo()));
        this.dsClient.getJWT(function(err,data){
            console.log(JSON.stringify(data));
        })
    }

    // get core services
    public core = ():CoreService => {return this.coreService;};
    // get instance for belgian eID card
    public beid = (reader_id?:string):AbstractEidBE => {return this.cardFactory.createEidBE(reader_id);};
    // get instance for EMV
    public emv = (reader_id?:string):EMV => {return this.cardFactory.createEmv(reader_id);};

}

export {GCLClient,GCLConfig}
