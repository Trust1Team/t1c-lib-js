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
import { AbstractDNI } from "./smartcards/eid/esp/dniModel";
import { DNI } from "./smartcards/eid/esp/dni";
import { AbstractSafeNet } from "./smartcards/pkcs11/safenet/safenetModel";
import { SafeNet } from "./smartcards/pkcs11/safenet/safenet";

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
    createSafeNet(reader_id?: string, config?: { linux: string, mac: string, win: string }): AbstractSafeNet;
}

const CONTAINER_CONTEXT_PATH = "/plugins/";
const CONTAINER_NEW_CONTEXT_PATH = "/containers/";
const CONTAINER_BEID = CONTAINER_CONTEXT_PATH + "beid";
const CONTAINER_LUXEID = CONTAINER_CONTEXT_PATH + "luxeid";
const CONTAINER_DNI = CONTAINER_NEW_CONTEXT_PATH + "dnie";
const CONTAINER_EMV = CONTAINER_CONTEXT_PATH + "emv";
const CONTAINER_LUXTRUST = CONTAINER_CONTEXT_PATH + "luxtrust";
const CONTAINER_MOBIB = CONTAINER_CONTEXT_PATH + "mobib";
const CONTAINER_OCRA = CONTAINER_CONTEXT_PATH + "ocra";
const CONTAINER_AVENTRA = CONTAINER_CONTEXT_PATH + "aventra";
const CONTAINER_OBERTHUR = CONTAINER_CONTEXT_PATH + "oberthur";
const CONTAINER_PIV = CONTAINER_CONTEXT_PATH + "piv";
const CONTAINER_SAFENET = CONTAINER_CONTEXT_PATH + "safenet";


export class PluginFactory implements AbstractFactory {
    constructor(private url: string, private connection: LocalConnection) {}

    public createDNI(reader_id?: string): AbstractDNI { return new DNI(this.url, CONTAINER_DNI, this.connection, reader_id); }

    public createEidBE(reader_id?: string): AbstractEidBE { return new EidBe(this.url, CONTAINER_BEID, this.connection, reader_id); }

    public createEidLUX(reader_id?: string, pin?: string): AbstractEidLUX {
        return new EidLux(this.url, CONTAINER_LUXEID, this.connection, reader_id, pin);
    }

    public createEmv(reader_id?: string): EMV { return new EMV(this.url, CONTAINER_EMV, this.connection, reader_id); }

    public createLuxTrust(reader_id?: string): LuxTrust { return new LuxTrust(this.url, CONTAINER_LUXTRUST, this.connection, reader_id); }

    public createMobib(reader_id?: string): Mobib { return new Mobib(this.url, CONTAINER_MOBIB, this.connection, reader_id); }

    public createOcra(reader_id?: string): Ocra { return new Ocra(this.url, CONTAINER_OCRA, this.connection, reader_id); }

    public createAventraNO(reader_id?: string): Aventra { return new Aventra(this.url, CONTAINER_AVENTRA, this.connection, reader_id); }

    public createOberthurNO(reader_id?: string): Oberthur {return new Oberthur(this.url, CONTAINER_OBERTHUR, this.connection, reader_id); }

    public createPIV(reader_id?: string): PIV { return new PIV(this.url, CONTAINER_PIV, this.connection, reader_id); }

    public createSafeNet(reader_id: string, config: { linux: string, mac: string, win: string }): AbstractSafeNet {
        return new SafeNet(this.url, CONTAINER_SAFENET, this.connection, reader_id, config);
    }
}
