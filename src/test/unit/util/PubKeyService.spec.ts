/**
 * @author Maarten Somers
 * @since 2018
 */

import { expect } from 'chai';
import { PubKeyService } from '../../../scripts/util/PubKeyService';

describe('PubKey Service', () => {

    describe('can store and retrieve the device PubKey', function () {

        const pubKey = 'thenewpubkeywhichcontainsnumbers234andLetterS';

        it('stores a given PubKey', () => {
            PubKeyService.setPubKey(pubKey);
        });

        it('retrieves the same PubKey at a later time', () => {
            const retrieved = PubKeyService.getPubKey();
            expect(retrieved).to.eq('-----BEGIN PUBLIC KEY-----\n' + pubKey + '\n-----END PUBLIC KEY-----');
        });
    });
});
