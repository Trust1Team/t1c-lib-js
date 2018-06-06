/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from '../../core/exceptions/CoreExceptions';
import {DataArrayResponse, DataResponse, T1CResponse} from '../../core/service/CoreModel';

export { AbstractFileExchange, FileListResponse, ListFilesRequest, File, FileList, Page, AccessMode, FileAction, FileSort, TypeStatus, TypeResponse, Type, TypeList, TypeListResponse, FileResponse, ModalType };


interface AbstractFileExchange {
    // listFiles(data: ListFilesRequest, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse>;
    // setFolder(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    // downloadFile(path: string, file: ArrayBuffer, fileName: string): Promise<DataResponse>;
    // uploadFile(path: string): Promise<ArrayBuffer>;

    download(entity: string, type: string, file: ArrayBuffer, filename: string, relpath?: [string], implicitCreationType?: boolean, notifyOnCompletion?: boolean, showProgressBar?: boolean, callback?: (error: RestException, data: FileListResponse) => void): Promise<DataResponse>; // implicit
    upload(entity: string, type: string, filename: string, relpath?: [string], notifyOnCompletion?: boolean, showProgressBar?: boolean, callback?: (error: RestException, data: FileListResponse) => void): Promise<ArrayBuffer>;
    // getProgress(entity: string, type: String, filename?: String, action?: FileAction, callback?: (error: RestException, data: FileListResponse) => void): Promise<DataResponse>;
    showModal(title: string, text: string, modal: ModalType, timeoutInSeconds?: number, callback?: (error: RestException, data: FileListResponse) => void): Promise<boolean>;
    listTypes(entity: string, page?: Page, callback?: (error: RestException, data: TypeListResponse) => void): Promise<TypeListResponse>;
    listType(entity: string, type: string, callback?: (error: RestException, data: TypeResponse) => void): Promise<TypeResponse>;
    listTypeContent(entity: string, type: string, relpath?: [string], page?: Page, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse>; // should add total files
    listContent(entity: string, page?: Page, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse>;
    existsType(entity: string, type: string, callback?: (error: RestException, data: boolean) => void): Promise<boolean>;
    existsFile(entity: string, type: string, relpath: [string], callback?: (error: RestException, data: boolean) => void): Promise<boolean>;
    getAccessMode(entity: string, type: string, filename?: string, relpath?: [string], callback?: (error: RestException, data: AccessMode) => void): Promise<AccessMode>;
    createDir(entity: string, type: string, relpath: [string], recursive?: boolean, callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse>;
    copyFile(entity: string, fromType: string, toType: string, filename: string, newfilename: string, fromrelpath?: [string], torelpath?: [string], callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse>;
    moveFile(entity: string, fromType: string, toType: string, filename: string, fromrelpath?: [string], torelpath?: [string], callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse>;
    renameFile(entity: string, type: string, filename: string, newfilename: string, relpath?: [string], callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse>;
    getFileInfo(entity: string, type: string, filename: string, relpath?: [string], callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse>;
    createType(entity: string, type: string, initabspath?: [string], showModal?: boolean, timeoutInSeconds?: number, callback?: (error: RestException, data: TypeResponse) => void): Promise<TypeResponse>; // if not valid => show file chooser
    createTypeDirs(entity: string, type: string, initrelpath: [string], showModal?: boolean, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse>; // implicit type creation
    updateType(entity: string, type: string, timeoutInSeconds?: number, callback?: (error: RestException, data: TypeResponse) => void): Promise<TypeResponse>;
    deleteType(entity: string, type: string, callback?: (error: RestException, data: boolean) => void): Promise<boolean>;
    getEnabledContainers(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
}

/* Model */
class ListFilesRequest {
    constructor(public path: string, public extensions: string[]) {}
}

class File {
    constructor(public extension: string,
                public name: string,
                public path: string,
                public size: number,
                public last_modification_time: string,
                public is_dir: boolean,
                public access: AccessMode) {}
}

class FileListResponse extends T1CResponse {
    constructor(public data: FileList, public success: boolean) {
        super(success, data);
    }
}

class FileList {
    constructor(public files: File[], public total: number) {}
}

class FileResponse extends T1CResponse {
    constructor(public data: File, public success: boolean) {
        super(success, data);
    }
}

class TypeListResponse extends T1CResponse {
    constructor(public data: TypeList, public success: boolean) {
        super(success, data);
    }
}

class TypeResponse extends T1CResponse {
    constructor(public data: Type, public success: boolean){
        super(success, data);
    }
}

class Type {
    constructor(public appid: string, public entity: string, public name: string, public abspath: string, access: AccessMode, status: TypeStatus, public files?: number) {}
}

class TypeList{
    constructor(public types: Type[], public total: number) {}
}

class Page {
    constructor (public start: number, public size: number, public sort: FileSort) {}
}

/* Enumerations */

enum FileSort {
    ASC, DESC
}

enum AccessMode {
    READ, WRITE, EXECUTE
}

enum TypeStatus {
    MAPPED,
    UNMAPPED
}

enum FileAction {
    UPLOAD, DOWNLOAD, COPY, MOVE
}

enum ModalType {
    INFO, CHOICE
}
