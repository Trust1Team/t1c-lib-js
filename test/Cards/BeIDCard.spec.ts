/**
 * @author Maarten Casteels
 * @since 2016
 */
import * as sinon from "sinon";
import {BeIDCard} from "../../src/Trust1Team/Cards/BeIDCard";

describe('BeID Card', () => {

    beforeEach(() => {
        sinon.stub(BeIDCard.prototype, 'rn').throws();
    });

    it('should load card information', (done) => {
        done();
    });
});