var WacomDevice = (function () {
    function WacomDevice(name, type, model, width, height, certificate) {
        this.name = name;
        this.type = type;
        this.model = model;
        this.width = width;
        this.height = height;
        this.certificate = certificate;
    }
    return WacomDevice;
}());
export { WacomDevice };
var WacomGetDevicesResponse = (function () {
    function WacomGetDevicesResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return WacomGetDevicesResponse;
}());
export { WacomGetDevicesResponse };
var WacomSignDataRequest = (function () {
    function WacomSignDataRequest(name, reason, signer, hash, image) {
        this.name = name;
        this.reason = reason;
    }
    return WacomSignDataRequest;
}());
export { WacomSignDataRequest };
var WacomImage = (function () {
    function WacomImage(data, rectX, rectY, rectW, rectH) {
        this.data = data;
        this.rectX = rectX;
        this.rectY = rectY;
        this.rectW = rectW;
        this.rectH = rectH;
    }
    return WacomImage;
}());
export { WacomImage };
var WacomPackage = (function () {
    function WacomPackage(component, version) {
        this.component = component;
        this.version = version;
    }
    return WacomPackage;
}());
export { WacomPackage };
var WacomSignDataResponse = (function () {
    function WacomSignDataResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return WacomSignDataResponse;
}());
export { WacomSignDataResponse };
var WacomSignDataResponseData = (function () {
    function WacomSignDataResponseData(image, metadata) {
        this.image = image;
        this.metadata = metadata;
    }
    return WacomSignDataResponseData;
}());
export { WacomSignDataResponseData };
var WacomSystemInfoResponse = (function () {
    function WacomSystemInfoResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return WacomSystemInfoResponse;
}());
export { WacomSystemInfoResponse };
var WacomSystemInfoResponseData = (function () {
    function WacomSystemInfoResponseData(device_list, package_list) {
        this.device_list = device_list;
        this.package_list = package_list;
    }
    return WacomSystemInfoResponseData;
}());
export { WacomSystemInfoResponseData };
//# sourceMappingURL=WacomModel.js.map