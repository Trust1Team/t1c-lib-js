import {Wacom} from './Wacom';

export interface AbstractWacom {
    signData: (body: WacomSignDataRequest, callback?: () => void) => Promise<WacomSignDataResponse>
    getDevices: (callback?: () => void) => Promise<WacomGetDevicesResponse>
}

export class WacomDevice {
    constructor(public name: string,
                public type: string,
                public model: string,
                public width: number,
                public height: number,
                public certificate?: string) {
    }
}

export class WacomGetDevicesResponse {
    constructor(public data: Array<WacomDevice>, public success: boolean) {
    }
}

export class WacomSignDataRequest {
    constructor(public name: string, public reason: string, signer: string, hash: string, image: WacomImage) {
    }
}

export class WacomImage {
    constructor(
        public data: string,
        public rectX: number,
        public rectY: number,
        public rectW: number,
        public rectH: number
    ) {
    }
}

export class WacomSignDataResponse {
    constructor(public data: WacomSignDataResponseData, public success: boolean) {
    }
}

export class WacomSignDataResponseData {
    constructor(public image: string, public metadata: Array<{string: string}>) {
    }
}


