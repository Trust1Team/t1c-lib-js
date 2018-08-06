import { PubKeyService } from './../../../scripts/util/PubKeyService';


/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */


describe('PubKey Service', () => {

    describe('can store and retrieve the device PubKey', function () {

        const pubKey = 'thenewpubkeywhichcontainsnumbers234andLetterS';

        test('stores a given PubKey', () => {
            PubKeyService.setPubKey(pubKey);
        });

        test('retrieves the same PubKey at a later time', () => {
            const retrieved = PubKeyService.getPubKey();
            expect(retrieved).toEqual('-----BEGIN PUBLIC KEY-----\n' + pubKey + '\n-----END PUBLIC KEY-----');
        });
    });
});
