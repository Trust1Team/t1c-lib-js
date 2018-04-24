import { RestException } from '../../core/exceptions/CoreExceptions';
import { DataResponse, T1CResponse } from '../../core/service/CoreModel';
export { AbstractFileExchange, FileListResponse, ListFilesRequest, File };
interface AbstractFileExchange {
    listFiles(data: ListFilesRequest, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse>;
    setFolder(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    downloadFile(path: string, file: ArrayBuffer, fileName: string): Promise<DataResponse>;
    uploadFile(path: string): Promise<string>;
}
declare class ListFilesRequest {
    path: string;
    extensions: string[];
    constructor(path: string, extensions: string[]);
}
declare class File {
    extension: string;
    name: string;
    path: string;
    size: number;
    last_modification_time: string;
    constructor(extension: string, name: string, path: string, size: number, last_modification_time: string);
}
declare class FileListResponse extends T1CResponse {
    data: File[];
    success: boolean;
    constructor(data: File[], success: boolean);
}
