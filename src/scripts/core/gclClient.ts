/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @since 2016
 */

import {GCLConfig} from "./GCLConfig";
import {CardFactory} from "../Plugins/smartcards/CardFactory";
import {EidBe} from "../Plugins/smartcards/eid/be/EidBe";
import {CoreService} from "./services/CoreService";

class GCLClient {
    private config: GCLConfig;
    private cardFactory: CardFactory;
    private coreService: CoreService;

    constructor(config: GCLConfig) {
        console.log("config:",JSON.stringify(config));
        this.config = config || new GCLConfig();
        this.cardFactory = new CardFactory(this.config.gclUrl);
        this.coreService = new CoreService(this.config.gclUrl);

        console.log("platform",JSON.stringify(this.core().browserInfo()));
    }

    public checkForConnector(callback) {
        console.log("TBD");
    }

    // get core services
    public core = ():CoreService => {return this.coreService;};

    // get instance for belgian eID card
    public beid = ():EidBe => {return this.cardFactory.getEidBE();}


}

export {GCLClient,GCLConfig}
