import { EMV } from "./emv/EMV";
import { LocalConnection } from "../../core/client/Connection";
import { Mobib } from "./mobib/mobib";
import { LuxTrust } from "./pki/luxtrust/LuxTrust";
import { Ocra } from "./ocra/ocra";
import { Aventra } from "./pki/aventra/Aventra";
import { Oberthur } from "./pki/oberthur/Oberthur";
import { PIV } from "./piv/piv";
import { AbstractEidBE } from "./eid/be/EidBeModel";
import { AbstractEMV } from "./emv/EMVModel";
import { AbstractOcra } from "./ocra/ocraModel";
import { AbstractAventra } from "./pki/aventra/AventraModel";
import { AbstractLuxTrust } from "./pki/luxtrust/LuxTrustModel";
import { AbstractOberthur } from "./pki/oberthur/OberthurModel";
import { AbstractPiv } from "./piv/pivModel";
import { AbstractMobib } from "./mobib/mobibModel";
import { AbstractEidLUX } from "./eid/lux/EidLuxModel";
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
}
export declare class CardFactory implements AbstractFactory {
    private url;
    private connection;
    constructor(url: string, connection: LocalConnection);
    createEidBE(reader_id?: string): AbstractEidBE;
    createEidLUX(reader_id?: string, pin?: string): AbstractEidLUX;
    createEmv(reader_id?: string): EMV;
    createLuxTrust(reader_id?: string): LuxTrust;
    createMobib(reader_id?: string): Mobib;
    createOcra(reader_id?: string): Ocra;
    createAventraNO(reader_id?: string): Aventra;
    createOberthurNO(reader_id?: string): Oberthur;
    createPIV(reader_id?: string): PIV;
}
