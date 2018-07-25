"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EMV_1 = require("./smartcards/emv/EMV");
var EidBe_1 = require("./smartcards/eid/be/EidBe");
var EidLux_1 = require("./smartcards/eid/lux/EidLux");
var mobib_1 = require("./smartcards/mobib/mobib");
var LuxTrust_1 = require("./smartcards/pki/luxtrust/LuxTrust");
var ocra_1 = require("./smartcards/ocra/ocra");
var Aventra_1 = require("./smartcards/pki/aventra/Aventra");
var Oberthur_1 = require("./smartcards/pki/oberthur/Oberthur");
var piv_1 = require("./smartcards/piv/piv");
var dnie_1 = require("./smartcards/eid/esp/dnie");
var EidPt_1 = require("./smartcards/eid/pt/EidPt");
var RemoteLoading_1 = require("./remote-loading/RemoteLoading");
var Belfius_1 = require("./remote-loading/belfius/Belfius");
var FileExchange_1 = require("./file/FileExchange");
var pkcs11_1 = require("./smartcards/pkcs11/pkcs11");
var DataContainer_1 = require("./data-container/DataContainer");
var CONTAINER_NEW_CONTEXT_PATH = '/containers/';
var CONTAINER_BEID = CONTAINER_NEW_CONTEXT_PATH + 'beid-v2-1-1';
var CONTAINER_LUXEID = CONTAINER_NEW_CONTEXT_PATH + 'luxeid-v2-1-1';
var CONTAINER_DNIE = CONTAINER_NEW_CONTEXT_PATH + 'dnie';
var CONTAINER_EMV = CONTAINER_NEW_CONTEXT_PATH + 'emv';
var CONTAINER_FILE_EXCHANGE = CONTAINER_NEW_CONTEXT_PATH + 'file-exchange';
var CONTAINER_LUXTRUST = CONTAINER_NEW_CONTEXT_PATH + 'luxtrust';
var CONTAINER_MOBIB = CONTAINER_NEW_CONTEXT_PATH + 'mobib';
var CONTAINER_OCRA = CONTAINER_NEW_CONTEXT_PATH + 'ocra';
var CONTAINER_AVENTRA = CONTAINER_NEW_CONTEXT_PATH + 'aventra';
var CONTAINER_OBERTHUR = CONTAINER_NEW_CONTEXT_PATH + 'oberthur';
var CONTAINER_PIV = CONTAINER_NEW_CONTEXT_PATH + 'piv';
var CONTAINER_PTEID = CONTAINER_NEW_CONTEXT_PATH + 'pteid';
var CONTAINER_PKCS11 = CONTAINER_NEW_CONTEXT_PATH + 'pkcs11';
var CONTAINER_REMOTE_LOADING = CONTAINER_NEW_CONTEXT_PATH + 'readerapi';
var PluginFactory = (function () {
    function PluginFactory(url, connection) {
        this.url = url;
        this.connection = connection;
    }
    PluginFactory.prototype.createDNIe = function (reader_id) { return new dnie_1.DNIe(this.url, CONTAINER_DNIE, this.connection, reader_id); };
    PluginFactory.prototype.createEidBE = function (reader_id) { return new EidBe_1.EidBe(this.url, CONTAINER_BEID, this.connection, reader_id); };
    PluginFactory.prototype.createEidLUX = function (reader_id, pin) {
        return new EidLux_1.EidLux(this.url, CONTAINER_LUXEID, this.connection, reader_id, pin);
    };
    PluginFactory.prototype.createEidPT = function (reader_id) { return new EidPt_1.EidPt(this.url, CONTAINER_PTEID, this.connection, reader_id); };
    PluginFactory.prototype.createEmv = function (reader_id) { return new EMV_1.EMV(this.url, CONTAINER_EMV, this.connection, reader_id); };
    PluginFactory.prototype.createLuxTrust = function (reader_id) { return new LuxTrust_1.LuxTrust(this.url, CONTAINER_LUXTRUST, this.connection, reader_id); };
    PluginFactory.prototype.createMobib = function (reader_id) { return new mobib_1.Mobib(this.url, CONTAINER_MOBIB, this.connection, reader_id); };
    PluginFactory.prototype.createOcra = function (reader_id) { return new ocra_1.Ocra(this.url, CONTAINER_OCRA, this.connection, reader_id); };
    PluginFactory.prototype.createAventraNO = function (reader_id) { return new Aventra_1.Aventra(this.url, CONTAINER_AVENTRA, this.connection, reader_id); };
    PluginFactory.prototype.createOberthurNO = function (reader_id) { return new Oberthur_1.Oberthur(this.url, CONTAINER_OBERTHUR, this.connection, reader_id); };
    PluginFactory.prototype.createPIV = function (reader_id) { return new piv_1.PIV(this.url, CONTAINER_PIV, this.connection, reader_id); };
    PluginFactory.prototype.createPKCS11 = function () {
        return new pkcs11_1.PKCS11(this.url, CONTAINER_PKCS11, this.connection);
    };
    PluginFactory.prototype.createRemoteLoading = function (reader_id) {
        return new RemoteLoading_1.RemoteLoading(this.url, CONTAINER_REMOTE_LOADING, this.connection, reader_id);
    };
    PluginFactory.prototype.createBelfius = function (reader_id) {
        return new Belfius_1.Belfius(this.url, CONTAINER_REMOTE_LOADING, this.connection, reader_id);
    };
    PluginFactory.prototype.createFileExchange = function () {
        return new FileExchange_1.FileExchange(this.url, CONTAINER_FILE_EXCHANGE, this.connection);
    };
    PluginFactory.prototype.createDataContainer = function (containerPath) {
        var _this = this;
        return function () {
            return new DataContainer_1.DataContainer(_this.url, containerPath, _this.connection);
        };
    };
    return PluginFactory;
}());
exports.PluginFactory = PluginFactory;
//# sourceMappingURL=PluginFactory.js.map