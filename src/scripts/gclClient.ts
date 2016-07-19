/**
 * @author Maarten Casteels
 * @since 2016
 */

import {BeIDCard} from "./Plugins/Cards/BeIDCard";
import {connection} from "./Plugins/Connection";
import {Config} from "./Plugins/Config";
import {Cards} from "./Plugins/Cards";

export class Trust1Connector {
    private config: Config;
    private cards: Cards;

    constructor(config: Config) {
        this.config = config || new Config();
        this.cards = new Cards(this.config.connectorUrl);
    }

    public checkForConnector(callback) {
        let p = connection.get("https://localhost:12345/v1/info");
        p.then((result) => {
            return callback(result);
        });
    }

    // card Types
    // card Readers
    public beid(): BeIDCard {
        return this.cards.belgiumElectronicID;
    }
}
