/**
 * @author Maarten Casteels
 * @since 2016
 */

import {BeIDCard} from "./Trust1Team/Cards/BeIDCard";
import {connection} from "./Trust1Team/Connection";
import {Config} from "./Trust1Team/Config";
import {Cards} from "./Trust1Team/Cards";

export class Trust1Connector {
    private config:Config;
    private cards:Cards;

    constructor(config:Config) {
        this.cards = new Cards(this.config.connectorUrl());
    }

    public checkForConnector(callback) {
        var p = connection.get('http://localhost:12345/v1/info');
        p.then((result) => {
            return callback(result);
        })
    }

    // Card Types

    // Card Readers
    public beid():BeIDCard {
        var url:string = this.config.connectorUrl();
        return this.cards.belgiumElectronicID;
    }
}