import { GenericContainer } from '../smartcards/Card';
import { AbstractFileExchange, FileListResponse, ListFilesRequest } from './FileExchangeModel';
import { RestException } from '../../core/exceptions/CoreExceptions';
import { DataResponse } from '../../core/service/CoreModel';
export { FileExchange };
declare class FileExchange extends GenericContainer implements AbstractFileExchange {
    static DOWNLOAD: string;
    static FOLDER: string;
    static UPLOAD: string;
    downloadFile(path: string, file: ArrayBuffer, fileName: string): Promise<DataResponse>;
    listFiles(data: ListFilesRequest, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse>;
    setFolder(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    uploadFile(path: string): Promise<string>;
}
