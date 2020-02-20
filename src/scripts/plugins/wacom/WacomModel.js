"use strict";
exports.__esModule = true;
var WacomDevice = /** @class */ (function () {
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
exports.WacomDevice = WacomDevice;
var WacomGetDevicesResponse = /** @class */ (function () {
    function WacomGetDevicesResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return WacomGetDevicesResponse;
}());
exports.WacomGetDevicesResponse = WacomGetDevicesResponse;
var WacomSignDataRequest = /** @class */ (function () {
    function WacomSignDataRequest(name, reason, signer, hash, image) {
        this.name = name;
        this.reason = reason;
    }
    return WacomSignDataRequest;
}());
exports.WacomSignDataRequest = WacomSignDataRequest;
var WacomImage = /** @class */ (function () {
    function WacomImage(data, rectX, rectY, rectW, rectH) {
        this.data = data;
        this.rectX = rectX;
        this.rectY = rectY;
        this.rectW = rectW;
        this.rectH = rectH;
    }
    return WacomImage;
}());
exports.WacomImage = WacomImage;
var WacomPackage = /** @class */ (function () {
    function WacomPackage(component, version) {
        this.component = component;
        this.version = version;
    }
    return WacomPackage;
}());
exports.WacomPackage = WacomPackage;
var WacomSignDataResponse = /** @class */ (function () {
    function WacomSignDataResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return WacomSignDataResponse;
}());
exports.WacomSignDataResponse = WacomSignDataResponse;
var WacomSignDataResponseData = /** @class */ (function () {
    function WacomSignDataResponseData(image, metadata) {
        this.image = image;
        this.metadata = metadata;
    }
    return WacomSignDataResponseData;
}());
exports.WacomSignDataResponseData = WacomSignDataResponseData;
var WacomSystemInfoResponse = /** @class */ (function () {
    function WacomSystemInfoResponse(data, success) {
        this.data = data;
        this.success = success;
    }
    return WacomSystemInfoResponse;
}());
exports.WacomSystemInfoResponse = WacomSystemInfoResponse;
var WacomSystemInfoResponseData = /** @class */ (function () {
    function WacomSystemInfoResponseData(device_list, package_list) {
        this.device_list = device_list;
        this.package_list = package_list;
    }
    return WacomSystemInfoResponseData;
}());
exports.WacomSystemInfoResponseData = WacomSystemInfoResponseData;
