/**
 * @author Maarten Casteels
 * @since 2016
 */

import {BeIDCard} from "../Plugins/smartcards/eid/be/BeIDCard";
import {connection} from "./comm/Connection";
import {Config} from "./Config";
import {Cards} from "../Plugins/Cards";

export class GCLClient {
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
