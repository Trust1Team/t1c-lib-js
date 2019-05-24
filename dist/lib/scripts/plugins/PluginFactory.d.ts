import { LocalConnection } from '../core/client/Connection';
import { AbstractEidBE } from './smartcards/eid/be/EidBeModel';
import { AbstractEMV } from './smartcards/emv/EMVModel';
import { AbstractOcra } from './smartcards/ocra/ocraModel';
import { AbstractAventra } from './smartcards/pki/aventra/AventraModel';
import { AbstractLuxTrust } from './smartcards/pki/luxtrust/LuxTrustModel';
import { AbstractOberthur } from './smartcards/pki/oberthur/OberthurModel';
import { AbstractPiv } from './smartcards/piv/pivModel';
import { AbstractMobib } from './smartcards/mobib/mobibModel';
import { AbstractEidLUX, PinType } from './smartcards/eid/lux/EidLuxModel';
import { AbstractDNIe } from './smartcards/eid/esp/dnieModel';
import { AbstractEidPT } from './smartcards/eid/pt/EidPtModel';
import { AbstractRemoteLoading } from './remote-loading/RemoteLoadingModel';
import { AbstractBelfius } from './remote-loading/belfius/BelfiusModel';
import { AbstractFileExchange } from './file/FileExchangeModel';
import { AbstractPkcs11 } from './smartcards/pkcs11/pkcs11Model';
import { AbstractDataContainer } from './data-container/DataContainerModel';
import { AbstractJavaKeyTool } from './java-key-tool/JavaKeyToolModel';
import { AbstractSsh } from './ssh/SshModel';
import { AbstractWacom } from './wacom/WacomModel';
export interface AbstractFactory {
    createEidBE(reader_id?: string): AbstractEidBE;
    createEidLUX(reader_id?: string): AbstractEidLUX;
    createEmv(reader_id?: string): AbstractEMV;
    createWacom(): AbstractWacom;
    createLuxTrust(reader_id?: string): AbstractLuxTrust;
    createMobib(reader_id?: string): AbstractMobib;
    createOcra(reader_id?: string): AbstractOcra;
    createAventraNO(reader_id?: string): AbstractAventra;
    createOberthurNO(reader_id?: string): AbstractOberthur;
    createPIV(reader_id?: string): AbstractPiv;
    createPKCS11(): AbstractPkcs11;
    createJavaKeyTool(): AbstractJavaKeyTool;
    createSsh(): AbstractSsh;
}
export declare class PluginFactory implements AbstractFactory {
    private url;
    private connection;
    constructor(url: string, connection: LocalConnection);
    createDNIe(reader_id?: string): AbstractDNIe;
    createEidBE(reader_id?: string): AbstractEidBE;
    createEidLUX(reader_id?: string, pin?: string, pinType?: PinType, isEncrypted?: boolean): AbstractEidLUX;
    createEidPT(reader_id?: string): AbstractEidPT;
    createEmv(reader_id?: string): AbstractEMV;
    createWacom(): AbstractWacom;
    createLuxTrust(reader_id?: string): AbstractLuxTrust;
    createMobib(reader_id?: string): AbstractMobib;
    createOcra(reader_id?: string): AbstractOcra;
    createAventraNO(reader_id?: string): AbstractAventra;
    createOberthurNO(reader_id?: string): AbstractOberthur;
    createPIV(reader_id?: string): AbstractPiv;
    createPKCS11(): AbstractPkcs11;
    createRemoteLoading(reader_id?: string): AbstractRemoteLoading;
    createBelfius(reader_id?: string): AbstractBelfius;
    createFileExchange(): AbstractFileExchange;
    createDataContainer(containerPath: string): () => AbstractDataContainer;
    createJavaKeyTool(): AbstractJavaKeyTool;
    createSsh(): AbstractSsh;
}
