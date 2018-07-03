import { GCLClient } from '../GCLLib';
import { AuthenticateOrSignData, OptionalPin } from '../../plugins/smartcards/Card';
import { RestException } from '../exceptions/CoreExceptions';
import { CardReader, CardReadersResponse, DataResponse } from '../service/CoreModel';
import { ResponseHandler } from '../../util/ResponseHandler';
import { Options } from '../../util/RequestHandler';
export declare class Arguments {
    client: GCLClient;
    readerId: string;
    container: string;
    data: OptionalPin;
    dumpMethod: string;
    dumpOptions: Options;
    reader: CardReader;
    constructor(client: GCLClient, readerId: string, container: string, data: OptionalPin, dumpMethod?: string, dumpOptions?: Options, reader?: CardReader);
}
export declare class GenericService {
    static PKCS11_FLAGS: number[];
    static containerForReader(client: GCLClient, readerId: string, callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    static dumpData(client: GCLClient, readerId: string, data: OptionalPin, callback?: (error: ResponseHandler, data: DataResponse) => void): Promise<DataResponse>;
    static authenticateCapable(client: GCLClient, callback?: (error: RestException, data: CardReadersResponse) => void): Promise<any>;
    static signCapable(client: GCLClient, callback?: (error: RestException, data: CardReadersResponse) => void): Promise<any>;
    static verifyPinCapable(client: GCLClient, callback?: (error: RestException, data: CardReadersResponse) => void): Promise<any>;
    static authenticate(client: GCLClient, readerId: string, data: AuthenticateOrSignData, callback?: (error: RestException, data: DataResponse) => void): Promise<any>;
    static sign(client: GCLClient, readerId: string, data: AuthenticateOrSignData, callback?: (error: RestException, data: DataResponse) => void): Promise<any>;
    static verifyPin(client: GCLClient, readerId: string, data: OptionalPin, callback?: (error: RestException, data: DataResponse) => void): Promise<any>;
    static checkPKCS11(client: GCLClient): Promise<{}>;
    private static checkCanAuthenticate(data);
    private static checkCanSign(data);
    private static checkCanVerifyPin(data);
    private static filterByAvailableContainers(args);
    private static checkPrerequisites(client, readerId, data);
    private static checkReaderPresent(args);
    private static checkContainerAvailable(args);
    private static determineAlgorithm(args);
    private static determineContainerForCard(args);
    private static determineDataDumpMethod(args);
    private static doDataDump(args);
    private static doSign(args);
    private static doAuthenticate(args);
    private static doVerifyPin(args);
}
