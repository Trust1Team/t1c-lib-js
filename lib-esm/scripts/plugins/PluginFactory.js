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
export class PluginFactory {
    constructor(url, connection) {
        this.url = url;
        this.connection = connection;
    }
    createDNIe(reader_id) { return new DNIe(this.url, CONTAINER_DNIE, this.connection, reader_id); }
    createEidBE(reader_id) { return new EidBe(this.url, CONTAINER_BEID, this.connection, reader_id); }
    createEidLUX(reader_id, pin, pinType) {
        return new EidLux(this.url, CONTAINER_LUXEID, this.connection, reader_id, pin, pinType);
    }
    createEidPT(reader_id) { return new EidPt(this.url, CONTAINER_PTEID, this.connection, reader_id); }
    createEmv(reader_id) { return new EMV(this.url, CONTAINER_EMV, this.connection, reader_id); }
    createLuxTrust(reader_id) { return new LuxTrust(this.url, CONTAINER_LUXTRUST, this.connection, reader_id); }
    createMobib(reader_id) { return new Mobib(this.url, CONTAINER_MOBIB, this.connection, reader_id); }
    createOcra(reader_id) { return new Ocra(this.url, CONTAINER_OCRA, this.connection, reader_id); }
    createAventraNO(reader_id) { return new Aventra(this.url, CONTAINER_AVENTRA, this.connection, reader_id); }
    createOberthurNO(reader_id) { return new Oberthur(this.url, CONTAINER_OBERTHUR, this.connection, reader_id); }
    createPIV(reader_id) { return new PIV(this.url, CONTAINER_PIV, this.connection, reader_id); }
    createPKCS11() {
        return new PKCS11(this.url, CONTAINER_PKCS11, this.connection);
    }
    createRemoteLoading(reader_id) {
        return new RemoteLoading(this.url, CONTAINER_REMOTE_LOADING, this.connection, reader_id);
    }
    createBelfius(reader_id) {
        return new Belfius(this.url, CONTAINER_REMOTE_LOADING, this.connection, reader_id);
    }
    createFileExchange() {
        return new FileExchange(this.url, CONTAINER_FILE_EXCHANGE, this.connection);
    }
    createDataContainer(containerPath) {
        return () => {
            return new DataContainer(this.url, containerPath, this.connection);
        };
    }
}
//# sourceMappingURL=PluginFactory.js.map