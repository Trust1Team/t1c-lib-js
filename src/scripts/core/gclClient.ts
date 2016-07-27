/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @since 2016
 */

import {Config} from "./Config";
import {CardFactory} from "../Plugins/smartcards/CardFactory";
import {EidBe} from "../Plugins/smartcards/eid/be/EidBe";
import {CoreService} from "./services/CoreService";

// must be a singleton instance
class GCLClient {
    private config: Config;
    private cardFactory: CardFactory;
    private coreService: CoreService;

    constructor(config?: Config) {
        this.config = config || new Config();
        this.cardFactory = new CardFactory(this.config.connectorUrl);
        this.coreService = new CoreService(this.config.connectorUrl);
    }

    public checkForConnector(callback) {
        $.getJSON( this.config.infoUrl, function( data ) {
            return callback(data);
        });
    }

    // get core services
    public core = ():CoreService => {return this.coreService;};

    // get instance for belgian eID card
    public beid = ():EidBe => {return this.cardFactory.getEidBE();}
}

export {GCLClient}
