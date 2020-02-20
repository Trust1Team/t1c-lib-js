import { GCLClient } from '../GCLLib';
import { AuthenticateOrSignData, OptionalPin } from '../../plugins/smartcards/Card';
import { T1CLibException } from '../exceptions/CoreExceptions';
import { CardReader, CardReadersResponse, DataResponse } from '../service/CoreModel';
import { ResponseHandler } from '../../util/ResponseHandler';
import { Options } from '../../util/RequestHandler';
export declare class Arguments {
    client: GCLClient;
    readerId: string;
    container: string;
    data: OptionalPin;
    dumpMethod?: string;
    dumpOptions?: Options;
    reader?: CardReader;
    constructor(client: GCLClient, readerId: string, container: string, data: OptionalPin, dumpMethod?: string, dumpOptions?: Options, reader?: CardReader);
}
export declare class GenericService {
    static PKCS11_FLAGS: number[];
    static containerForReader(client: GCLClient, readerId: string, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<DataResponse>;
    static dumpData(client: GCLClient, readerId: string, data: OptionalPin, callback?: (error: ResponseHandler, data: DataResponse) => void): Promise<DataResponse>;
    static authenticateCapable(client: GCLClient, callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<any>;
    static signCapable(client: GCLClient, callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<any>;
    static verifyPinCapable(client: GCLClient, callback?: (error: T1CLibException, data: CardReadersResponse) => void): Promise<any>;
    static authenticate(client: GCLClient, readerId: string, data: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<any>;
    static authenticateWithEncryptedPin(client: GCLClient, readerId: string, data: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<any>;
    static sign(client: GCLClient, readerId: string, data: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<any>;
    static signWithEncryptedPin(client: GCLClient, readerId: string, data: AuthenticateOrSignData, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<any>;
    static verifyPin(client: GCLClient, readerId: string, data: OptionalPin, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<any>;
    static verifyPinWithEncryptedPin(client: GCLClient, readerId: string, data: OptionalPin, callback?: (error: T1CLibException, data: DataResponse) => void): Promise<any>;
    static checkPKCS11(client: GCLClient): Promise<unknown>;
    private static checkCanAuthenticate;
    private static checkCanSign;
    private static checkCanVerifyPin;
    private static filterByAvailableContainers;
    private static checkPrerequisites;
    private static checkReaderPresent;
    private static checkContainerAvailable;
    private static determineAlgorithm;
    private static determineContainerForCard;
    private static determineDataDumpMethod;
    private static doDataDump;
    private static doSign;
    private static doSignWithEncryptedPin;
    private static doAuthenticate;
    private static doAuthenticateWithEncryptedPin;
    private static doVerifyPin;
    private static doVerifyPinWithEncryptedPin;
}
