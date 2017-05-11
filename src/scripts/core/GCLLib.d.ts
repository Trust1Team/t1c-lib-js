import { GCLConfig } from "./GCLConfig";
import { CoreService } from "./service/CoreService";
import { AbstractDSClient } from "./ds/DSClientModel";
import { AbstractOCVClient } from "./ocv/OCVClient";
import { AbstractEidBE } from "../plugins/smartcards/eid/be/EidBeModel";
import { AbstractEMV } from "../plugins/smartcards/emv/EMVModel";
import { AbstractOcra } from "../plugins/smartcards/ocra/ocraModel";
import { AbstractAventra } from "../plugins/smartcards/pki/aventra/AventraModel";
import { AbstractLuxTrust } from "../plugins/smartcards/pki/luxtrust/LuxTrustModel";
import { AbstractOberthur } from "../plugins/smartcards/pki/oberthur/OberthurModel";
import { AbstractPiv } from "../plugins/smartcards/piv/pivModel";
import { AbstractMobib } from "../plugins/smartcards/mobib/mobibModel";
import { AbstractEidLUX } from "../plugins/smartcards/eid/lux/EidLuxModel";
declare class GCLClient {
    private cfg;
    private cardFactory;
    private coreService;
    private connection;
    private authConnection;
    private remoteConnection;
    private localTestConnection;
    private dsClient;
    private ocvClient;
    constructor(cfg: GCLConfig);
    private static resolveConfig(cfg);
    core: () => CoreService;
    config: () => GCLConfig;
    ds: () => AbstractDSClient;
    ocv: () => AbstractOCVClient;
    beid: (reader_id?: string) => AbstractEidBE;
    luxeid: (reader_id?: string, pin?: string) => AbstractEidLUX;
    luxtrust: (reader_id?: string, pin?: string) => AbstractLuxTrust;
    emv: (reader_id?: string) => AbstractEMV;
    mobib: (reader_id?: string) => AbstractMobib;
    ocra: (reader_id?: string) => AbstractOcra;
    aventra: (reader_id?: string) => AbstractAventra;
    oberthur: (reader_id?: string) => AbstractOberthur;
    piv: (reader_id?: string) => AbstractPiv;
    private initOCVContext(cb);
    private initSecurityContext(cb);
    private registerAndActivate();
    private implicitDownload();
}
export { GCLClient, GCLConfig };
