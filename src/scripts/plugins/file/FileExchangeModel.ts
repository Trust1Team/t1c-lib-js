/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from '../../core/exceptions/CoreExceptions';
import { DataResponse, T1CResponse } from '../../core/service/CoreModel';
import {Any} from "asn1js";

export { AbstractFileExchange, FileListResponse, ListFilesRequest, File };


interface AbstractFileExchange {
    listFiles(data: ListFilesRequest, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse>;
    setFolder(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    downloadFile(path: string, file: ArrayBuffer, fileName: string): Promise<DataResponse>;
    uploadFile(path: string): Promise<ArrayBuffer>;

    // access rights!!!
    // paging and total

    // download file
    download(type: string, file: ArrayBuffer, filename: string): Promise<DataResponse>; // error: no write access
    upload(type: string, filename: string): Promise<DataResponse>; // error: no read access
    
    // generic
    getSupportedFileExtensions(): Any;

    // shows a full list of types related to their mapping (optional mapping)
    listTypes(): Any;
    // returns access rights, and if exists
    listType(type: string): Any; // contains access mode and mappingmode
    // shows a type and its optional mapping
    listTypeDir(type: string, abspath: [string]);
    // shows all files for a certain mapping or return no files for mapping, or mapping not defined
    listTypeFiles(type: string): Any;
    // list all files persisted in mapped type folders - recursively through all files
    listFiles(): Any;

    // verifies if the type exists and is mapped
    existsType(type: string): Boolean;
    existsFile(type: string, recursive?: Boolean): Boolean;
    existsDir(type: string, abspath: [string]): Boolean;

    getAccessMode(type: string, filename: string, optionalAbsPath: [string]): Any

    // create directory - absolute path /some/path/etc -.  string array
    createDir(type: string, recursive?: Boolean): Any;

    // copy operations
    copyFile(fromType: string, toType: string, filename: string, newfilename: string): Any

    // move operations
    moveFile(fromType: string, toType: string, filename: string): Any

    // rename
    renameFile(type: string, filename: string)


    // search
    getFileInfo(type:string, filename: string, recursive?: Boolean)
    getFileInfo(filename: string)

    // create a new type and trigger user to choose folder, error handler if no folder chosen by user
    createTypeMap(type: string, initRelPath?: string, initAbsPath?: [string]): Any;
    // implicit => trigger user to choose file in file chooser
    updateTypeMap(type: string, implicit?: Boolean, initVal?: string): Any;
    // delete type from mapping (but maintain directory and files)
    deleteTypeMap(type: string)

}


class ListFilesRequest {
    constructor(public path: string, public extensions: string[]) {}
}

class File {
    constructor(public extension: string,
                public name: string,
                public path: string,
                public size: number,
                public last_modification_time: string) {}
}

class FileListResponse extends T1CResponse {
    constructor(public data: File[], public success: boolean) {
        super(success, data);
    }
}

export enum AccessMode {
    READ, WRITE, EXECUTE
}

export enum TypeStatus {
    MAPPED,
    UNMAPPED
}