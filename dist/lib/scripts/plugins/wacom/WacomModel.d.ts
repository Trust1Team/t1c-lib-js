export interface AbstractWacom {
    signData: (body: WacomSignDataRequest, callback?: () => void) => Promise<WacomSignDataResponse>;
    getDevices: (callback?: () => void) => Promise<WacomGetDevicesResponse>;
    systemInfo: (callback?: () => void) => Promise<WacomSystemInfoResponse>;
}
export declare class WacomDevice {
    name: string;
    type: string;
    model: string;
    width: number;
    height: number;
    certificate?: string;
    constructor(name: string, type: string, model: string, width: number, height: number, certificate?: string);
}
export declare class WacomGetDevicesResponse {
    data: Array<WacomDevice>;
    success: boolean;
    constructor(data: Array<WacomDevice>, success: boolean);
}
export declare class WacomSignDataRequest {
    name: string;
    reason: string;
    constructor(name: string, reason: string, signer: string, hash: string, image: WacomImage);
}
export declare class WacomImage {
    data: string;
    rectX: number;
    rectY: number;
    rectW: number;
    rectH: number;
    constructor(data: string, rectX: number, rectY: number, rectW: number, rectH: number);
}
export declare class WacomPackage {
    component: string;
    version: string;
    constructor(component: string, version: string);
}
export declare class WacomSignDataResponse {
    data: WacomSignDataResponseData;
    success: boolean;
    constructor(data: WacomSignDataResponseData, success: boolean);
}
export declare class WacomSignDataResponseData {
    image: string;
    metadata: Array<{
        string: string;
    }>;
    constructor(image: string, metadata: Array<{
        string: string;
    }>);
}
export declare class WacomSystemInfoResponse {
    data: WacomSystemInfoResponseData;
    success: boolean;
    constructor(data: WacomSystemInfoResponseData, success: boolean);
}
export declare class WacomSystemInfoResponseData {
    device_list: Array<string>;
    package_list: Array<WacomPackage>;
    constructor(device_list: Array<string>, package_list: Array<WacomPackage>);
}
