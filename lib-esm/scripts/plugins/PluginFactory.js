import { EMV } from './smartcards/emv/EMV';
import { EidBe } from './smartcards/eid/be/EidBe';
import { EidLux } from './smartcards/eid/lux/EidLux';
import { Mobib } from './smartcards/mobib/mobib';
import { LuxTrust } from './smartcards/pki/luxtrust/LuxTrust';
import { Ocra } from './smartcards/ocra/ocra';
import { Aventra } from './smartcards/pki/aventra/Aventra';
import { Idemia_Ias_Ecc } from './smartcards/pki/idemia_ias_ecc/Idemia_Ias_Ecc';
import { PIV } from './smartcards/piv/piv';
import { DNIe } from './smartcards/eid/esp/dnie';
import { EidPt } from './smartcards/eid/pt/EidPt';
import { RemoteLoading } from './remote-loading/RemoteLoading';
import { Belfius } from './remote-loading/belfius/Belfius';
import { FileExchange } from './file/FileExchange';
import { PKCS11 } from './smartcards/pkcs11/pkcs11';
import { DataContainer } from './data-container/DataContainer';
import { JavaKeyTool } from './java-key-tool/JavaKeyTool';
import { Ssh } from './ssh/Ssh';
import { Wacom } from './wacom/Wacom';
import { BeLawyer } from './smartcards/pki/BeLawyer/BeLawyer';
import { RawPrint } from './raw-print/RawPrint';
import { Isabel } from './smartcards/isabel/Isabel';
var CONTAINER_NEW_CONTEXT_PATH = '/containers/';
var CONTAINER_BEID = CONTAINER_NEW_CONTEXT_PATH + 'beid';
var CONTAINER_BELAWYER = CONTAINER_NEW_CONTEXT_PATH + 'diplad';
var CONTAINER_LUXEID = CONTAINER_NEW_CONTEXT_PATH + 'luxeid';
var CONTAINER_DNIE = CONTAINER_NEW_CONTEXT_PATH + 'dnie';
var CONTAINER_EMV = CONTAINER_NEW_CONTEXT_PATH + 'emv';
var CONTAINER_WACOM = CONTAINER_NEW_CONTEXT_PATH + 'wacom-stu';
var CONTAINER_ISABEL = CONTAINER_NEW_CONTEXT_PATH + 'isabel';
var CONTAINER_FILE_EXCHANGE = CONTAINER_NEW_CONTEXT_PATH + 'file-exchange';
var CONTAINER_LUXTRUST = CONTAINER_NEW_CONTEXT_PATH + 'luxtrust';
var CONTAINER_MOBIB = CONTAINER_NEW_CONTEXT_PATH + 'mobib';
var CONTAINER_OCRA = CONTAINER_NEW_CONTEXT_PATH + 'ocra';
var CONTAINER_AVENTRA = CONTAINER_NEW_CONTEXT_PATH + 'aventra';
var CONTAINER_IDEMIA_IAS_ECC = CONTAINER_NEW_CONTEXT_PATH + 'idemia_ias_ecc';
var CONTAINER_PIV = CONTAINER_NEW_CONTEXT_PATH + 'piv';
var CONTAINER_PTEID = CONTAINER_NEW_CONTEXT_PATH + 'pteid';
var CONTAINER_PKCS11 = CONTAINER_NEW_CONTEXT_PATH + 'pkcs11';
var CONTAINER_REMOTE_LOADING = CONTAINER_NEW_CONTEXT_PATH + 'readerapi';
var CONTAINER_JAVA_KEY_TOOL = CONTAINER_NEW_CONTEXT_PATH + 'java-keytool';
var CONTAINER_SSH = CONTAINER_NEW_CONTEXT_PATH + 'ssh';
var CONTAINER_RAW_PRINT = CONTAINER_NEW_CONTEXT_PATH + 'rawprint';
var PluginFactory = (function () {
    function PluginFactory(url, connection) {
        this.url = url;
        this.connection = connection;
    }
    PluginFactory.prototype.createDNIe = function (reader_id) {
        return new DNIe(this.url, CONTAINER_DNIE, this.connection, reader_id);
    };
    PluginFactory.prototype.createEidBE = function (reader_id) {
        return new EidBe(this.url, CONTAINER_BEID, this.connection, reader_id);
    };
    PluginFactory.prototype.createBeLawyer = function (reader_id) {
        return new BeLawyer(this.url, CONTAINER_BELAWYER, this.connection, reader_id);
    };
    PluginFactory.prototype.createEidLUX = function (reader_id, pin, pinType, isEncrypted) {
        if (isEncrypted === void 0) { isEncrypted = false; }
        return new EidLux(this.url, CONTAINER_LUXEID, this.connection, reader_id, pin, pinType, isEncrypted);
    };
    PluginFactory.prototype.createEidPT = function (reader_id) {
        return new EidPt(this.url, CONTAINER_PTEID, this.connection, reader_id);
    };
    PluginFactory.prototype.createEmv = function (reader_id) {
        return new EMV(this.url, CONTAINER_EMV, this.connection, reader_id);
    };
    PluginFactory.prototype.createWacom = function () {
        return new Wacom(this.url, CONTAINER_WACOM, this.connection, 'wacom-stu');
    };
    PluginFactory.prototype.createIsabel = function (reader_id, runInUserSpace) {
        return new Isabel(this.url, CONTAINER_ISABEL, this.connection, reader_id, runInUserSpace);
    };
    PluginFactory.prototype.createLuxTrust = function (reader_id) {
        return new LuxTrust(this.url, CONTAINER_LUXTRUST, this.connection, reader_id);
    };
    PluginFactory.prototype.createMobib = function (reader_id) {
        return new Mobib(this.url, CONTAINER_MOBIB, this.connection, reader_id);
    };
    PluginFactory.prototype.createOcra = function (reader_id) {
        return new Ocra(this.url, CONTAINER_OCRA, this.connection, reader_id);
    };
    PluginFactory.prototype.createAventraNO = function (reader_id) {
        return new Aventra(this.url, CONTAINER_AVENTRA, this.connection, reader_id);
    };
    PluginFactory.prototype.createIdemia_Ias_EccNO = function (reader_id) {
        return new Idemia_Ias_Ecc(this.url, CONTAINER_IDEMIA_IAS_ECC, this.connection, reader_id);
    };
    PluginFactory.prototype.createPIV = function (reader_id) {
        return new PIV(this.url, CONTAINER_PIV, this.connection, reader_id);
    };
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
    PluginFactory.prototype.createJavaKeyTool = function () {
        return new JavaKeyTool(this.url, CONTAINER_JAVA_KEY_TOOL, this.connection);
    };
    PluginFactory.prototype.createSsh = function () {
        return new Ssh(this.url, '', this.connection, 'ssh');
    };
    PluginFactory.prototype.createRawPrint = function (runInUserSpace) {
        return new RawPrint(this.url, CONTAINER_RAW_PRINT, this.connection, runInUserSpace);
    };
    return PluginFactory;
}());
export { PluginFactory };
//# sourceMappingURL=PluginFactory.js.map