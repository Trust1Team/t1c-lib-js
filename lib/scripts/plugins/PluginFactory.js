"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EMV_1 = require("./smartcards/emv/EMV");
const EidBe_1 = require("./smartcards/eid/be/EidBe");
const EidLux_1 = require("./smartcards/eid/lux/EidLux");
const mobib_1 = require("./smartcards/mobib/mobib");
const LuxTrust_1 = require("./smartcards/pki/luxtrust/LuxTrust");
const ocra_1 = require("./smartcards/ocra/ocra");
const Aventra_1 = require("./smartcards/pki/aventra/Aventra");
const Oberthur_1 = require("./smartcards/pki/oberthur/Oberthur");
const piv_1 = require("./smartcards/piv/piv");
const dnie_1 = require("./smartcards/eid/esp/dnie");
const EidPt_1 = require("./smartcards/eid/pt/EidPt");
const RemoteLoading_1 = require("./remote-loading/RemoteLoading");
const Belfius_1 = require("./remote-loading/belfius/Belfius");
const FileExchange_1 = require("./file/FileExchange");
const pkcs11_1 = require("./smartcards/pkcs11/pkcs11");
const DataContainer_1 = require("./data-container/DataContainer");
const CONTAINER_NEW_CONTEXT_PATH = '/containers/';
const CONTAINER_BEID = CONTAINER_NEW_CONTEXT_PATH + 'beid-v2-1-1';
const CONTAINER_LUXEID = CONTAINER_NEW_CONTEXT_PATH + 'luxeid-v2-1-1';
const CONTAINER_DNIE = CONTAINER_NEW_CONTEXT_PATH + 'dnie';
const CONTAINER_EMV = CONTAINER_NEW_CONTEXT_PATH + 'emv';
const CONTAINER_FILE_EXCHANGE = CONTAINER_NEW_CONTEXT_PATH + 'file-exchange';
const CONTAINER_LUXTRUST = CONTAINER_NEW_CONTEXT_PATH + 'luxtrust';
const CONTAINER_MOBIB = CONTAINER_NEW_CONTEXT_PATH + 'mobib';
const CONTAINER_OCRA = CONTAINER_NEW_CONTEXT_PATH + 'ocra';
const CONTAINER_AVENTRA = CONTAINER_NEW_CONTEXT_PATH + 'aventra';
const CONTAINER_OBERTHUR = CONTAINER_NEW_CONTEXT_PATH + 'oberthur';
const CONTAINER_PIV = CONTAINER_NEW_CONTEXT_PATH + 'piv';
const CONTAINER_PTEID = CONTAINER_NEW_CONTEXT_PATH + 'pteid';
const CONTAINER_PKCS11 = CONTAINER_NEW_CONTEXT_PATH + 'pkcs11';
const CONTAINER_REMOTE_LOADING = CONTAINER_NEW_CONTEXT_PATH + 'readerapi';
class PluginFactory {
    constructor(url, connection) {
        this.url = url;
        this.connection = connection;
    }
    createDNIe(reader_id) { return new dnie_1.DNIe(this.url, CONTAINER_DNIE, this.connection, reader_id); }
    createEidBE(reader_id) { return new EidBe_1.EidBe(this.url, CONTAINER_BEID, this.connection, reader_id); }
    createEidLUX(reader_id, pin, pinType) {
        return new EidLux_1.EidLux(this.url, CONTAINER_LUXEID, this.connection, reader_id, pin, pinType);
    }
    createEidPT(reader_id) { return new EidPt_1.EidPt(this.url, CONTAINER_PTEID, this.connection, reader_id); }
    createEmv(reader_id) { return new EMV_1.EMV(this.url, CONTAINER_EMV, this.connection, reader_id); }
    createLuxTrust(reader_id) { return new LuxTrust_1.LuxTrust(this.url, CONTAINER_LUXTRUST, this.connection, reader_id); }
    createMobib(reader_id) { return new mobib_1.Mobib(this.url, CONTAINER_MOBIB, this.connection, reader_id); }
    createOcra(reader_id) { return new ocra_1.Ocra(this.url, CONTAINER_OCRA, this.connection, reader_id); }
    createAventraNO(reader_id) { return new Aventra_1.Aventra(this.url, CONTAINER_AVENTRA, this.connection, reader_id); }
    createOberthurNO(reader_id) { return new Oberthur_1.Oberthur(this.url, CONTAINER_OBERTHUR, this.connection, reader_id); }
    createPIV(reader_id) { return new piv_1.PIV(this.url, CONTAINER_PIV, this.connection, reader_id); }
    createPKCS11() {
        return new pkcs11_1.PKCS11(this.url, CONTAINER_PKCS11, this.connection);
    }
    createRemoteLoading(reader_id) {
        return new RemoteLoading_1.RemoteLoading(this.url, CONTAINER_REMOTE_LOADING, this.connection, reader_id);
    }
    createBelfius(reader_id) {
        return new Belfius_1.Belfius(this.url, CONTAINER_REMOTE_LOADING, this.connection, reader_id);
    }
    createFileExchange() {
        return new FileExchange_1.FileExchange(this.url, CONTAINER_FILE_EXCHANGE, this.connection);
    }
    createDataContainer(containerPath) {
        return () => {
            return new DataContainer_1.DataContainer(this.url, containerPath, this.connection);
        };
    }
}
exports.PluginFactory = PluginFactory;
//# sourceMappingURL=PluginFactory.js.map