import { EMV } from './smartcards/emv/EMV';
import { EidBe } from './smartcards/eid/be/EidBe';
import { EidLux } from './smartcards/eid/lux/EidLux';
import { Mobib } from './smartcards/mobib/mobib';
import { LuxTrust } from './smartcards/pki/luxtrust/LuxTrust';
import { Ocra } from './smartcards/ocra/ocra';
import { Aventra } from './smartcards/pki/aventra/Aventra';
import { Oberthur } from './smartcards/pki/oberthur/Oberthur';
import { PIV } from './smartcards/piv/piv';
import { DNIe } from './smartcards/eid/esp/dnie';
import { EidPt } from './smartcards/eid/pt/EidPt';
import { RemoteLoading } from './remote-loading/RemoteLoading';
import { Belfius } from './remote-loading/belfius/Belfius';
import { FileExchange } from './file/FileExchange';
import { PKCS11 } from './smartcards/pkcs11/pkcs11';
import { DataContainer } from './data-container/DataContainer';
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
    PluginFactory.prototype.createDNIe = function (reader_id) { return new DNIe(this.url, CONTAINER_DNIE, this.connection, reader_id); };
    PluginFactory.prototype.createEidBE = function (reader_id) { return new EidBe(this.url, CONTAINER_BEID, this.connection, reader_id); };
    PluginFactory.prototype.createEidLUX = function (reader_id, pin) {
        return new EidLux(this.url, CONTAINER_LUXEID, this.connection, reader_id, pin);
    };
    PluginFactory.prototype.createEidPT = function (reader_id) { return new EidPt(this.url, CONTAINER_PTEID, this.connection, reader_id); };
    PluginFactory.prototype.createEmv = function (reader_id) { return new EMV(this.url, CONTAINER_EMV, this.connection, reader_id); };
    PluginFactory.prototype.createLuxTrust = function (reader_id) { return new LuxTrust(this.url, CONTAINER_LUXTRUST, this.connection, reader_id); };
    PluginFactory.prototype.createMobib = function (reader_id) { return new Mobib(this.url, CONTAINER_MOBIB, this.connection, reader_id); };
    PluginFactory.prototype.createOcra = function (reader_id) { return new Ocra(this.url, CONTAINER_OCRA, this.connection, reader_id); };
    PluginFactory.prototype.createAventraNO = function (reader_id) { return new Aventra(this.url, CONTAINER_AVENTRA, this.connection, reader_id); };
    PluginFactory.prototype.createOberthurNO = function (reader_id) { return new Oberthur(this.url, CONTAINER_OBERTHUR, this.connection, reader_id); };
    PluginFactory.prototype.createPIV = function (reader_id) { return new PIV(this.url, CONTAINER_PIV, this.connection, reader_id); };
    PluginFactory.prototype.createPKCS11 = function () {
        return new PKCS11(this.url, CONTAINER_PKCS11, this.connection);
    };
    PluginFactory.prototype.createRemoteLoading = function (reader_id) {
        return new RemoteLoading(this.url, CONTAINER_REMOTE_LOADING, this.connection, reader_id);
    };
    PluginFactory.prototype.createBelfius = function (reader_id) {
        return new Belfius(this.url, CONTAINER_REMOTE_LOADING, this.connection, reader_id);
    };
    PluginFactory.prototype.createFileExchange = function () {
        return new FileExchange(this.url, CONTAINER_FILE_EXCHANGE, this.connection);
    };
    PluginFactory.prototype.createDataContainer = function (containerPath) {
        var _this = this;
        return function () {
            return new DataContainer(_this.url, containerPath, _this.connection);
        };
    };
    return PluginFactory;
}());
export { PluginFactory };
//# sourceMappingURL=PluginFactory.js.map