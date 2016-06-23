/**
 * @author Maarten Casteels
 * @since 2016
 */

import { Config, Connection } from './Trust1Team';
import { Promise } from 'es6-promise';

export class Trust1Connector {
    private config:Config;
    private connection:Connection;

    constructor(config?:Config) {
        this.config = config;
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
}