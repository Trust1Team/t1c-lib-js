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

    // generic
    getSupportedFileExtensions(): Any;

    // shows a full list of types related to their mapping (optional mapping)
    listTypes(): Any;
    // returns access rights, and if exists
    listType(type: String): Any;
    // shows a type and its optional mapping
    listTypeMap(type: String): Any;
    // shows all files for a certain mapping or return no files for mapping, or mapping not defined
    listTypeMapFiles(type: String): Any;
    // list all files persisted in mapped type folders
    listFiles(): Any;

    // verifies if the type exists and is mapped
    existsType(type: String): Any;
    existsFile(type: String, recursive?: Boolean): Any;

    // create directory -
    createDirectory(type: String)


    // copy operations

    // move operations


    // search

    // absolute path vs relative path

    // create a new type and trigger user to choose folder, error handler if no folder chosen by user
    createTypeMap(type: String, initVal?: String): Any;
    // implicit => trigger user to choose file in file chooser
    updateTypeMap(type: String, implicit?: Boolean, initVal?: String): Any;
    // delete type from mapping (but maintain directory and files)
    deleteTypeMap(type: String)


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

enum AccessMode {
    READ, WRITE, EXECUTE
}

enum TypeStatus {
    MAPPED,
    UNMAPPED
}