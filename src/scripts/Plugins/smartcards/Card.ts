/**
 * @author Michallis Pashidis
 */

interface Card {
    allData: (filters: string[], callback: () => void) => void
}

interface PinCard extends Card {
    verifyPin: (body: any, callback: () => void) => void
}

interface CertCard extends PinCard {
    allCerts: (filters: string[], callback: () => void) => void
    authenticate: (body: any, callback: () => void) => void
    signData: (body: any, callback: () => void) => void
}

interface OptionalPin {
    pin?: string
}

interface AuthenticateOrSignData extends OptionalPin {
    algorithm_reference: string
    data: string
}

interface VerifyPinData extends OptionalPin {
    private_key_reference: string
}

interface ResetPinData {
    puk: string,
    new_pin: string
    private_key_reference: string
}

export { Card, CertCard, PinCard, AuthenticateOrSignData, ResetPinData, VerifyPinData, OptionalPin };
