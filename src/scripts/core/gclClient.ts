/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @since 2016
 */

import {Config} from "./Config";
import {Cards} from "../Plugins/smartcards/CardFactory";
import {EidBe} from "../Plugins/smartcards/eid/be/EidBe";

// must be a singleton instance
class GCLClient {
    private config: Config;
    private cards: Cards;

    constructor(config?: Config) {
        this.config = config || new Config();
        this.cards = new Cards(this.config.connectorUrl);
    }

    public checkForConnector(callback) {
        $.getJSON( this.config.infoUrl, function( data ) {
            return callback(data);
        });
    }

    // get instance for belgian eID card
    public beid = ():EidBe => {return this.cards.getEidBE();}
}

export {GCLClient}
