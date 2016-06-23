/**
 * @author Maarten Casteels
 * @since 2016
 */
var Trust1Team_1 = require('../src/Trust1Team');
var chai_1 = require('chai');
describe('Config', function () {
    var config;
    beforeEach(function () {
        config = new Trust1Team_1.Config();
    });
    describe('#connectorUrl', function () {
        it('should return the default connector url', function () {
            var url = config.connectorUrl;
            chai_1.expect(url).to.be.eq('http://localhost:12345/v1');
        });
        it('should return the custom connector url', function () {
            var test = 'http://abc.be/v1';
            var myConfig = new Trust1Team_1.Config(test);
            var url = myConfig.connectorUrl;
            chai_1.expect(url).to.be.eq(test);
        });
        it('should return the default connector url when passing empty string', function () {
            var test = '';
            var myConfig = new Trust1Team_1.Config(test);
            var url = myConfig.connectorUrl;
            chai_1.expect(url).to.be.eq('http://localhost:12345/v1');
        });
    });
    describe('#distributionUrl', function () {
        it('should return the default distribution url', function () {
            var url = config.distributionUrl;
            chai_1.expect(url).to.be.eq('https://dist.t1t.be/gcl-ds/v1');
        });
        it('should return the custom distribution url', function () {
            var test = 'http://abc.be/v1';
            var myConfig = new Trust1Team_1.Config('', test);
            var url = myConfig.distributionUrl;
            chai_1.expect(url).to.be.eq(test);
        });
        it('should return the default distribution url when passing empty string', function () {
            var test = '';
            var myConfig = new Trust1Team_1.Config(test);
            var url = myConfig.distributionUrl;
            chai_1.expect(url).to.be.eq('https://dist.t1t.be/gcl-ds/v1');
        });
    });
});
