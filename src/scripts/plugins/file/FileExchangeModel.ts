/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from '../../core/exceptions/CoreExceptions';
import {DataArrayResponse, DataResponse, T1CResponse} from '../../core/service/CoreModel';
import {Any} from "asn1js";

export { AbstractFileExchange, FileListResponse, ListFilesRequest, File, Page, AccessMode, FileAction, FileSort, TypeStatus, TypeResponse, Type, TypeListResponse, FileResponse };


interface AbstractFileExchange {
    listFiles(data: ListFilesRequest, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse>;
    setFolder(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    downloadFile(path: string, file: ArrayBuffer, fileName: string): Promise<DataResponse>;
    uploadFile(path: string): Promise<ArrayBuffer>;

    // access rights!!!
    // paging and count (start, end, total)
    // update Type with abs path
    // local folders/files are never deleted only MD for type in T1C
    // https://t1t.gitbook.io/t1c-js-belfius-guide/core/status-codes

    // download file - access mode error
    download(type: string, file: ArrayBuffer, filename: string, notifyOnCompletion?: boolean, showProgressBar?: boolean, callback?: (error: RestException, data: FileListResponse) => void): Promise<DataResponse>;
    upload(type: string, filename: string, notifyOnCompletion?: boolean, showProgressBar?: boolean, callback?: (error: RestException, data: FileListResponse) => void): Promise<ArrayBuffer>;
    getProgress(type: String, filename: String, action?: FileAction, callback?: (error: RestException, data: FileListResponse) => void): Promise<DataResponse>;
    // shows a full list of types related to their mapping (optional mapping), directories
    listTypes(page?: Page, callback?: (error: RestException, data: TypeListResponse) => void): Promise<TypeListResponse>;
    // returns access rights, and if exists
    listType(type: string, callback?: (error: RestException, data: TypeResponse) => void): Promise<TypeResponse>;
    // shows all files for a certain mapping or return no files for mapping, or mapping not defined (files and dires)
    listTypeContent(type: string, relpath?: [string], page?: Page, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse>;
    // doc rest exception an error status
    listContent(page?: Page, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse>;
    // verifies if the type exists and is mapped
    existsType(type: string, callback?: (error: RestException, data: boolean) => void): Promise<boolean>;
    existsFile(type: string, recursive?: boolean, callback?: (error: RestException, data: boolean) => void): Promise<boolean>;
    existsDir(type: string, relpath: [string], callback?: (error: RestException, data: boolean) => void): Promise<boolean>;
    getAccessMode(type: string, filename?: string, relpath?: [string], callback?: (error: RestException, data: AccessMode) => void): Promise<AccessMode>;
    // create directory - relative path /some/path/etc -.  string array || if existant returns the files in folder - rec => tail rec for folder creation
    createDir(type: string, relpath: [string], recursive?: boolean, callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse>;
    // copy operations
    copyFile(fromType: string, toType: string, filename: string, newfilename: string, fromrelpath?: [string], torelpath?: [string], callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse>;
    // move operations
    moveFile(fromType: string, toType: string, filename: string, fromrelpath?: [string], torelpath?: [string], callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse>;
    // rename
    renameFile(type: string, filename: string, newfilename: string, torelpath?: [string], callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse>;

    // search (relative path)
    getFileInfo( type: string, filename: string, torelpath?: [string], callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse>;
    // search (recursively)
    getFileInfoRec( type: string, filename: string, recursive?: boolean, callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse>;

    // create a new type and trigger user to choose folder, error handler if no folder chosen by user
    createType(type: string, initabspath?: [string], callback?: (error: RestException, data: TypeResponse) => void): Promise<TypeResponse>; // if not valid => show file chooser
    createTypeDirs(type: string, initrelpath: [string], callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse>; // implicit type creation
    // implicit => trigger user to choose file in file chooser
    updateType(type: string, callback?: (error: RestException, data: TypeResponse) => void): Promise<TypeResponse>;
    // delete type from mapping (but maintain directory and files)
    deleteType(type: string, callback?: (error: RestException, data: boolean) => void): Promise<boolean>;
    // retrieve user choice upon installation
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
    constructor(public data: File[], public success: boolean) {
        super(success, data);
    }
}
class FileResponse extends T1CResponse {
    constructor(public data: File, public success: boolean) {
        super(success, data);
    }
}

class TypeListResponse extends T1CResponse {
    constructor(public data: Type[], public success: boolean) {
        super(success, data);
    }
}

class TypeResponse extends T1CResponse {
    constructor(public data: Type, public success: boolean){
        super(success, data);
    }
}

class Type {
    constructor(public appid: string, public name: string, public abspath: string, public files: number, access: AccessMode, status: TypeStatus) {}
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
    UPLOAD, DOWNLOAD
}
