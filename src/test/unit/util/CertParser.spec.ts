/**
 * @author Maarten Somers
 * @since 2017
 */

import { expect } from 'chai';
import { CertParser } from '../../../scripts/util/CertParser';

describe('CertParser Utility', () => {
    let cert: string;
    let certs: string[];
    let certObject: {
        data: {
            certificate: string,
            otherProperty: string
        }
    };
    let certsObject: {
        data: {
            certificate: string[],
            otherProperty: string
        }
    };
    let certsObjectValueObject: {
        data: {
            certificate: {
                certificate: string,
                cval: string
            },
            otherProperty: string
        }
    };


    beforeEach(() => {
        cert = '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';
        certs = [
            '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'
        ];
        certObject = { data:
            {
                certificate: cert,
                otherProperty: 'this should be untouched'
            }
        };
        certsObject = {
            data: {
                certificate: certs,
                otherProperty: 'this should be untouched'
            }
        };
        certsObjectValueObject = {
            data: {
                certificate: { certificate: 'certificate', cval: cert},
                otherProperty: 'this should be untouched'
            }
        };
    });

    describe('it can process a certificate', () => {
        it('correctly processes a certificate', () => {
            let processed = CertParser.processCert(cert);
            expect(processed).to.be.an('object');
        });
    });

    describe('it only processes certificates if required', () => {
        it('skips parsing when not required', () => {
            return CertParser.process({ data: cert }, false).then(res => {
                expect(res).to.be.an('object');
                expect(res).to.have.property('data');
                expect(res.data).to.have.property('base64');
                expect(res.data.base64, 'Base64 does not equal original certificate').to.eq(cert);
                expect(res.data, 'Parsed certificate found when not expected').to.not.have.property('parsed');
            });
        });

        it('parses certificates when asked', () => {
            return CertParser.process({ data: cert }, true).then(res => {
                expect(res).to.be.an('object');
                expect(res).to.have.property('data');
                expect(res.data).to.have.property('base64');
                expect(res.data.base64, 'Base64 does not equal original certificate').to.eq(cert);
                expect(res.data, 'Parsed certificate not found when it was expected').to.have.property('parsed');
                expect(res.data.parsed).to.be.an('object');
            });
        });
    });

    describe('it can process an array of certificates', () => {
        it('skips parsing when not required', () => {
            return CertParser.process({ data: certs }, false).then(res => {
                expect(res).to.be.an('object');
                expect(res).to.have.property('data');
                expect(res.data).to.be.an('array').of.length(2);
                expect(res.data[0]).to.have.property('base64');
                expect(res.data[1]).to.have.property('base64');
                expect(res.data[0].base64, 'Base64 does not equal original certificate').to.eq(certs[0]);
                expect(res.data[1].base64, 'Base64 does not equal original certificate').to.eq(certs[1]);
                expect(res.data[0], 'Parsed certificate found when not expected').to.not.have.property('parsed');
                expect(res.data[1], 'Parsed certificate found when not expected').to.not.have.property('parsed');
            });
        });

        it('parses certificates when asked', () => {
            return CertParser.process({ data: certs }, true).then(res => {
                expect(res).to.be.an('object');
                expect(res).to.have.property('data');
                expect(res.data).to.be.an('array').of.length(2);
                expect(res.data[0]).to.have.property('base64');
                expect(res.data[1]).to.have.property('base64');
                expect(res.data[0].base64, 'Base64 does not equal original certificate').to.eq(certs[0]);
                expect(res.data[1].base64, 'Base64 does not equal original certificate').to.eq(certs[1]);
                expect(res.data[0], 'Parsed certificate not found when it was expected').to.have.property('parsed');
                expect(res.data[1], 'Parsed certificate not found when it was expected').to.have.property('parsed');
                expect(res.data[0].parsed).to.be.an('object');
                expect(res.data[1].parsed).to.be.an('object');
            });
        });
    });

    describe('it correctly parses the certificates in a larger object', () => {
        it('detects the certificates in an object', () => {
            let originalCert = certObject.data.certificate;
            return CertParser.process(certObject, false).then(res => {
                expect(res).to.be.an('object');
                expect(res).to.have.property('data');
                expect(res.data).to.be.an('object');
                expect(res.data, 'Non-certificate property changed!').to.have.property('otherProperty').eq('this should be untouched');
                expect(res.data).to.have.property('certificate');
                expect(res.data.certificate, 'Certificate not converted into object').to.be.an('object');
                expect(res.data.certificate, 'Base64 property not found').to.have.property('base64');
                expect(res.data.certificate.base64, 'Base64 does not equal original certificate').to.eq(originalCert);
                expect(res.data.certificate, 'Parsed certificate found when not expected').to.not.have.property('parsed');
            });
        });

        it('processes certificates in an object if required', () => {
            let originalCert = certObject.data.certificate;
            return CertParser.process(certObject, true).then(res => {
                expect(res).to.be.an('object');
                expect(res).to.have.property('data');
                expect(res.data).to.be.an('object');
                expect(res.data, 'Non-certificate property changed!').to.have.property('otherProperty').eq('this should be untouched');
                expect(res.data).to.have.property('certificate');
                expect(res.data.certificate, 'Certificate not converted into object').to.be.an('object');
                expect(res.data.certificate, 'Base64 property not found').to.have.property('base64');
                expect(res.data.certificate.base64, 'Base64 does not equal original certificate').to.eq(originalCert);
                expect(res.data.certificate, 'Parsed certificate found when not expected').to.have.property('parsed');
                expect(res.data.certificate.parsed).to.be.an('object');
            });
        });
    });

    describe('it correctly parses a certificate array in a larger object', () => {
        it('detects the certificates in an object', () => {
            let originalCert = certsObject.data.certificate;
            return CertParser.process(certsObject, false).then(res => {
                expect(res).to.be.an('object');
                expect(res).to.have.property('data');
                expect(res.data).to.be.an('object');
                expect(res.data, 'Non-certificate property changed!').to.have.property('otherProperty').eq('this should be untouched');
                expect(res.data).to.have.property('certificate');
                expect(res.data.certificate).to.be.an('array').of.length(2);
                expect(res.data.certificate[0], 'Base64 property not found').to.have.property('base64');
                expect(res.data.certificate[0].base64, 'Base64 does not equal original certificate').to.eq(originalCert[0]);
                expect(res.data.certificate[0], 'Parsed certificate found when not expected').to.not.have.property('parsed');
                expect(res.data.certificate[1], 'Base64 property not found').to.have.property('base64');
                expect(res.data.certificate[1].base64, 'Base64 does not equal original certificate').to.eq(originalCert[1]);
                expect(res.data.certificate[1], 'Parsed certificate found when not expected').to.not.have.property('parsed');
            });
        });

        it('processes certificates in an object if required', () => {
            let originalCert = certsObject.data.certificate;
            return CertParser.process(certsObject, true).then(res => {
                expect(res).to.be.an('object');
                expect(res).to.have.property('data');
                expect(res.data).to.be.an('object');
                expect(res.data, 'Non-certificate property changed!').to.have.property('otherProperty').eq('this should be untouched');
                expect(res.data).to.have.property('certificate');
                expect(res.data.certificate).to.be.an('array').of.length(2);
                expect(res.data.certificate[0], 'Base64 property not found').to.have.property('base64');
                expect(res.data.certificate[0].base64, 'Base64 does not equal original certificate').to.eq(originalCert[0]);
                expect(res.data.certificate[0], 'Parsed certificate found when not expected').to.have.property('parsed');
                expect(res.data.certificate[0].parsed).to.be.an('object');
                expect(res.data.certificate[1], 'Base64 property not found').to.have.property('base64');
                expect(res.data.certificate[1].base64, 'Base64 does not equal original certificate').to.eq(originalCert[1]);
                expect(res.data.certificate[1], 'Parsed certificate found when not expected').to.have.property('parsed');
                expect(res.data.certificate[1].parsed).to.be.an('object');
            });
        });
    });


    describe('it correctly parses a certificate object contained in an object', () => {
        it('detects an inner certificate object', () => {
            return CertParser.process(certsObjectValueObject, false).then( res => {
                expect(res).to.be.an('object');
                expect(res).to.have.property('data');
                expect(res.data).to.be.an('object');
                expect(res.data, 'Non-certificate property changed!').to.have.property('otherProperty').eq('this should be untouched');
                expect(res.data).to.have.property('certificate');
                expect(res.data.certificate, 'Certificate not converted into object').to.be.an('object');
                expect(res.data.certificate, 'Base64 property not found').to.have.property('base64');
                expect(res.data.certificate, 'Parsed certificate found when not expected').to.not.have.property('parsed');
            });
        });
    });
});
