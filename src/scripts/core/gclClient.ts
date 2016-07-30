/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @since 2016
 */

import {GCLConfig} from "./GCLConfig";
import {CardFactory} from "../Plugins/smartcards/CardFactory";
import {EidBe} from "../Plugins/smartcards/eid/be/EidBe";
import {EMV} from "../Plugins/smartcards/emv/EMV";
import {CoreService} from "./services/CoreService";
import {LocalConnection} from "./client/Connection";

class GCLClient {
    private config: GCLConfig;
    private cardFactory: CardFactory;
    private coreService: CoreService;
    private connection: LocalConnection;

    constructor(config: GCLConfig) {
        console.debug("config:",JSON.stringify(config));

        this.config = config || new GCLConfig();
        this.connection = new LocalConnection();
        this.cardFactory = new CardFactory(this.config.gclUrl,this.connection);
        this.coreService = new CoreService(this.config.gclUrl,this.connection);

        console.debug("platform",JSON.stringify(this.core().browserInfo()));
    }

    public checkForConnector(callback) {
        console.log("TBD");
    }

    // get core services
    public core = ():CoreService => {return this.coreService;};

    // get instance for belgian eID card
    public beid = ():EidBe => {return this.cardFactory.getEidBE();};

    // get instance for EMV
    public emv = ():EMV => {return this.cardFactory.getEMV();};


}

export {GCLClient,GCLConfig}
