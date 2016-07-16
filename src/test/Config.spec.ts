/**
 * @author Maarten Casteels
 * @since 2016
 */
import { expect } from 'chai';
import {Config} from "../src/scripts/Trust1Team/Config";

describe('Config', () => {
    let config:Config;

    beforeEach(() => {
        config = new Config();
    });

    describe('#connectorUrl', () => {
        it('should return the default connector url', () => {
            var url:string = config.connectorUrl;
            expect(url).to.be.eq('https://localhost:12345/v1');
        });

        it('should return the custom connector url', () => {
            var test:string = 'http://abc.be/v1';
            var myConfig:Config = new Config(test);
            var url:string = myConfig.connectorUrl;
            expect(url).to.be.eq(test);
        });

        it('should return the default connector url when passing empty string', () => {
            var test:string = '';
            var myConfig:Config = new Config(test);
            var url:string = myConfig.connectorUrl;
            expect(url).to.be.eq('https://localhost:12345/v1');
        });
    });

    describe('#distributionUrl', () => {
        it('should return the default distribution url', () => {
            var url:string = config.distributionUrl;
            expect(url).to.be.eq('https://dist.t1t.be/gcl-ds/v1');
        });

        it('should return the custom distribution url', () => {
            var test:string = 'http://abc.be/v1';
            var myConfig:Config = new Config('', test);
            var url:string = myConfig.distributionUrl;
            expect(url).to.be.eq(test);
        });

        it('should return the default distribution url when passing empty string', () => {
            var test:string = '';
            var myConfig:Config = new Config(test);
            var url:string = myConfig.distributionUrl;
            expect(url).to.be.eq('https://dist.t1t.be/gcl-ds/v1');
        });
    });
});