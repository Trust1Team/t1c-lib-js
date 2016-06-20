/**
 * @author Maarten Casteels
 * @since 2016
 */

var chai = require('chai');
var expect = chai.expect;
var connector = require('../src/connector.js');

// Duplicate of the connector js
var defaultOptions = {
    connectorUrl: 'http://localhost:12345/v1',
    distributionUrl: 'https://dist.t1t.be/gcl-ds/v1',
    performConnectorCheck: true
};

describe('T1Connector', function() {

    describe('init', function() {

        it('should be possible to doesn\'t pass an object', function() {
            var obj = connector.init();

            expect(obj).to.not.be.null;
            expect(obj.config).to.not.be.null;
            expect(obj.config.connectorUrl).to.be.eql(defaultOptions.connectorUrl);
            expect(obj.config.distributionUrl).to.be.eql(defaultOptions.distributionUrl);
            expect(obj.config.performConnectorCheck).to.be.eql(defaultOptions.performConnectorCheck);
        });

        it('should be possible to change connectorUrl', function() {
            var obj = connector.init({
                connectorUrl: 'changed'
            });

            expect(obj.config.connectorUrl).to.not.be.null;
            expect(obj.config.connectorUrl).to.be.a('string');
            expect(obj.config.connectorUrl).to.be.eql('changed');
        });

        it('should be possible to change connectorUrl to null value', function() {
            var obj = connector.init({
                connectorUrl: ''
            });

            expect(obj.config.connectorUrl).to.not.be.null;
            expect(obj.config.connectorUrl).to.be.eql(defaultOptions.connectorUrl);
        });

        it('should be possible to change distributionUrl', function() {
            var obj = connector.init({
                distributionUrl: 'changed'
            });

            expect(obj.config.distributionUrl).to.not.be.null;
            expect(obj.config.distributionUrl).to.be.a('string');
            expect(obj.config.distributionUrl).to.be.eql('changed');
        });

        it('should be possible to change distributionUrl to null value', function() {
            var obj = connector.init({
                distributionUrl: ''
            });

            expect(obj.config.distributionUrl).to.not.be.null;
            expect(obj.config.distributionUrl).to.be.eql(defaultOptions.distributionUrl);
        });

        it('should be possible to change performConnectorCheck', function() {
            var obj = connector.init({
                performConnectorCheck: false
            });

            expect(obj.config.performConnectorCheck).to.not.be.null;
            expect(obj.config.performConnectorCheck).to.equal(false);
        });

        it('should be possible to change performConnectorCheck pass null', function() {
            var obj = connector.init({
                performConnectorCheck: null
            });

            expect(obj.config.performConnectorCheck).to.not.be.null;
            expect(obj.config.performConnectorCheck).to.deep.equal(defaultOptions.performConnectorCheck);
        });

        // Default Check!
    });

    describe('check for update', function() {

        it('should check for a trust1connector property checkForConnector', function() {
            var obj = connector.init();

            var listMethods = obj.__proto__;
            expect(listMethods).to.have.ownProperty('checkForConnector');
        });
    });
});