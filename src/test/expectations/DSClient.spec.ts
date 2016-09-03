import {expect} from "chai";
import {GCLConfig} from "../../scripts/core/ds/DSClient";

describe('DSClient', () => {
    let config:GCLConfig;

    beforeEach(() => {
        config = new GCLConfig();
    });

    describe('DSClient Service Expectations', () => {

        it('should return information for the distribution service', () => {
            expect('').to.be.eq('');
        });

        it('should  get device information when UUID is given', () => {
            expect('').to.be.eq('')
        });

        it('should fail to get device info without providing UUID param', () => {
            expect('').to.be.eq('')
        });

        it('should get a JWT token without UUID claim', () => {
            expect('').to.be.eq('')
        });

        it('should refresh an existing valid JWT with a new expiration time - greater then the former', () => {
            expect('').to.be.eq('')
        });

        it('should fail to get a JWT token when given JWT is expired', () => {
            expect('').to.be.eq('')
        });

        it('should fail to get a JWT token when given JWT is expired', () => {
            expect('').to.be.eq('')
        });

        it('should get a public key', () => {
            expect('').to.be.eq('')
        });

        it('should get a valid download link', () => {
            expect('').to.be.eq('')
        });

        it('should register a new device when not activated and un-registered', () => {
            expect('').to.be.eq('')
        });

        it('should register a new device when activated and un-registered', () => {
            expect('').to.be.eq('')
        });

        it('should sync a given device when activated and registered', () => {
            expect('').to.be.eq('')
        });

        it('should sync a given device when not activated and registered', () => {
            expect('').to.be.eq('')
        });
    });
});