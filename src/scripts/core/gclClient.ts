/**
 * @author Maarten Casteels
 * @since 2016
 */

import {EidBe} from "../Plugins/smartcards/eid/be/EidBe";
import {Config} from "./Config";
import {Cards} from "../Plugins/smartcards/CardFactory";

export class GCLClient {
    private config: Config;
    private cards: Cards;

    constructor(config: Config) {
        this.config = config || new Config();
        this.cards = new Cards(this.config.connectorUrl);
    }

    public checkForConnector(callback) {
        $.getJSON( this.config.infoUrl, function( data ) {
            return callback(data);
        });
    }

    // card Types
    // card Readers
    public beid(): EidBe {
        return this.cards.belgiumElectronicID;
    }
}
