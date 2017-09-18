/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 * @since 2016
 */
import { EMV } from "./smartcards/emv/EMV";
import { EidBe } from "./smartcards/eid/be/EidBe";
import { EidLux } from "./smartcards/eid/lux/EidLux";
import { LocalConnection } from "../core/client/Connection";
import { Mobib } from "./smartcards/mobib/mobib";
import { LuxTrust } from "./smartcards/pki/luxtrust/LuxTrust";
import { Ocra } from "./smartcards/ocra/ocra";
import { Aventra } from "./smartcards/pki/aventra/Aventra";
import { Oberthur } from "./smartcards/pki/oberthur/Oberthur";
import { PIV } from "./smartcards/piv/piv";
import { AbstractEidBE } from "./smartcards/eid/be/EidBeModel";
import { AbstractEMV } from "./smartcards/emv/EMVModel";
import { AbstractOcra } from "./smartcards/ocra/ocraModel";
import { AbstractAventra } from "./smartcards/pki/aventra/AventraModel";
import { AbstractLuxTrust } from "./smartcards/pki/luxtrust/LuxTrustModel";
import { AbstractOberthur } from "./smartcards/pki/oberthur/OberthurModel";
import { AbstractPiv } from "./smartcards/piv/pivModel";
import { AbstractMobib } from "./smartcards/mobib/mobibModel";
import { AbstractEidLUX } from "./smartcards/eid/lux/EidLuxModel";
import { AbstractSafeNet } from "./smartcards/pkcs11/safenet/safenetModel";
import { SafeNet } from "./smartcards/pkcs11/safenet/safenet";
import { DNIe } from "./smartcards/eid/esp/dnie";
import { AbstractDNIe } from "./smartcards/eid/esp/dnieModel";
import { AbstractEidPT } from "./smartcards/eid/pt/EidPtModel";
import { EidPt } from "./smartcards/eid/pt/EidPt";
import { AbstractRemoteLoading } from "./remote-loading/RemoteLoadingModel";
import { RemoteLoading } from "./remote-loading/RemoteLoading";
import { AbstractBelfius } from "./remote-loading/belfius/BelfiusModel";
import { Belfius } from "./remote-loading/belfius/Belfius";

export interface AbstractFactory {
    createEidBE(reader_id?: string): AbstractEidBE;
    createEidLUX(reader_id?: string): AbstractEidLUX;
    createEmv(reader_id?: string): AbstractEMV;
    createLuxTrust(reader_id?: string): AbstractLuxTrust;
    createMobib(reader_id?: string): AbstractMobib;
    createOcra(reader_id?: string): AbstractOcra;
    createAventraNO(reader_id?: string): AbstractAventra;
    createOberthurNO(reader_id?: string): AbstractOberthur;
    createPIV(reader_id?: string): AbstractPiv;
    createSafeNet(config?: { linux: string, mac: string, win: string }): AbstractSafeNet;
}

const CONTAINER_CONTEXT_PATH = "/plugins/";
const CONTAINER_NEW_CONTEXT_PATH = "/containers/";
const CONTAINER_BEID = CONTAINER_CONTEXT_PATH + "beid";
const CONTAINER_LUXEID = CONTAINER_CONTEXT_PATH + "luxeid";
const CONTAINER_DNIE = CONTAINER_CONTEXT_PATH + "dnie";
const CONTAINER_EMV = CONTAINER_CONTEXT_PATH + "emv";
const CONTAINER_LUXTRUST = CONTAINER_CONTEXT_PATH + "luxtrust";
const CONTAINER_MOBIB = CONTAINER_CONTEXT_PATH + "mobib";
const CONTAINER_OCRA = CONTAINER_CONTEXT_PATH + "ocra";
const CONTAINER_AVENTRA = CONTAINER_CONTEXT_PATH + "aventra";
const CONTAINER_OBERTHUR = CONTAINER_CONTEXT_PATH + "oberthur";
const CONTAINER_PIV = CONTAINER_CONTEXT_PATH + "piv";
const CONTAINER_PTEID = CONTAINER_CONTEXT_PATH + "pteid";
const CONTAINER_SAFENET = CONTAINER_CONTEXT_PATH + "safenet";
const CONTAINER_REMOTE_LOADING = CONTAINER_CONTEXT_PATH + "readerapi";


export class PluginFactory implements AbstractFactory {
    constructor(private url: string, private connection: LocalConnection) {}

    public createDNIe(reader_id?: string): AbstractDNIe { return new DNIe(this.url, CONTAINER_DNIE, this.connection, reader_id); }

    public createEidBE(reader_id?: string): AbstractEidBE { return new EidBe(this.url, CONTAINER_BEID, this.connection, reader_id); }

    public createEidLUX(reader_id?: string, pin?: string): AbstractEidLUX {
        return new EidLux(this.url, CONTAINER_LUXEID, this.connection, reader_id, pin);
    }

    public createEidPT(reader_id?: string): AbstractEidPT { return new EidPt(this.url, CONTAINER_PTEID, this.connection, reader_id); }

    public createEmv(reader_id?: string): EMV { return new EMV(this.url, CONTAINER_EMV, this.connection, reader_id); }

    public createLuxTrust(reader_id?: string): LuxTrust { return new LuxTrust(this.url, CONTAINER_LUXTRUST, this.connection, reader_id); }

    public createMobib(reader_id?: string): Mobib { return new Mobib(this.url, CONTAINER_MOBIB, this.connection, reader_id); }

    public createOcra(reader_id?: string): Ocra { return new Ocra(this.url, CONTAINER_OCRA, this.connection, reader_id); }

    public createAventraNO(reader_id?: string): Aventra { return new Aventra(this.url, CONTAINER_AVENTRA, this.connection, reader_id); }

    public createOberthurNO(reader_id?: string): Oberthur {return new Oberthur(this.url, CONTAINER_OBERTHUR, this.connection, reader_id); }

    public createPIV(reader_id?: string): PIV { return new PIV(this.url, CONTAINER_PIV, this.connection, reader_id); }

    public createSafeNet(config?: { linux: string, mac: string, win: string }): AbstractSafeNet {
        return new SafeNet(this.url, CONTAINER_SAFENET, this.connection, config);
    }

    public createRemoteLoading(reader_id?: string): AbstractRemoteLoading {
        return new RemoteLoading(this.url, CONTAINER_REMOTE_LOADING, this.connection, reader_id);
    }

    public createBelfius(reader_id?: string): AbstractBelfius {
        return new Belfius(this.url, CONTAINER_REMOTE_LOADING, this.connection, reader_id);
    }
}
