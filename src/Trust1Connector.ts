/**
 * @author Maarten Casteels
 * @since 2016
 */

import { Config, Connection, BeIDCard } from './Trust1Team';
import { Promise } from 'es6-promise';

export class Trust1Connector {
    private config:Config;
    private connection:Connection;

    constructor(config) {
        this.config = new Config(config);
        this.connection = new Connection(this.config);
    }

    public checkForConnector(callback) {
        var p = this.connection.get('http://localhost:12345/v1/info');
        p.then((result) => {
            return callback(result);
        })
    }

    // Card Types

    // Card Readers
    public beid():BeIDCard {
        var url:string = this.config.connectorUrl();
        return new BeIDCard(url, this.connection);
    }
}