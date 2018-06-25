/**
 * @author Maarten Somers
 * @since 2017
 */
import { RestException } from '../../core/exceptions/CoreExceptions';
import {BoolDataResponse, DataArrayResponse, DataResponse, T1CResponse} from '../../core/service/CoreModel';

export interface AbstractFileExchange {
    download(entity: string, type: string, file: ArrayBuffer, filename: string, relpath?: [string], implicitCreationType?: boolean, notifyOnCompletion?: boolean, callback?: (error: RestException, data: FileListResponse) => void): Promise<DataResponse>; // implicit
    upload(entity: string, type: string, filename: string, rel_path?: [string], notifyOnCompletion?: boolean, callback?: (error: RestException, data: FileListResponse) => void): Promise<ArrayBuffer>;
    // getProgress(entity: string, type: String, filename?: String, action?: FileAction, callback?: (error: RestException, data: FileListResponse) => void): Promise<DataResponse>;
    showModal(title: string, text: string, modal: ModalType, timeoutInSeconds?: number, callback?: (error: RestException, data: FileListResponse) => void): Promise<boolean>;
    listTypes(entity?: string, page?: Page, callback?: (error: RestException, data: TypeListResponse) => void): Promise<TypeListResponse>;
    listType(entity: string, type: string, callback?: (error: RestException, data: TypeResponse) => void): Promise<TypeResponse>;
    listTypeContent(entity: string, type: string, relpath?: [string], page?: Page, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse>; // should add total files
    listContent(entity: string, page?: Page, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse>;
    existsType(entity: string, type: string, callback?: (error: RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    existsFile(entity: string, type: string, relpath: [string], callback?: (error: RestException, data: BoolDataResponse) => void): Promise<BoolDataResponse>;
    getAccessMode(entity: string, type: string, filename?: string, relpath?: [string], callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse>;
    createDir(entity: string, type: string, relpath: [string], recursive?: boolean, callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse>;
    copyFile(entity: string, fromType: string, toType: string, filename: string, newfilename: string, fromrelpath?: [string], torelpath?: [string], callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse>;
    moveFile(entity: string, fromType: string, toType: string, filename: string, fromrelpath?: [string], torelpath?: [string], callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse>;
    renameFile(entity: string, type: string, filename: string, newfilename: string, relpath?: [string], callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse>;
    getFileInfo(entity: string, type: string, filename: string, relpath?: [string], callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse>;
    createType(entity: string, type: string, initabspath?: [string], showModal?: boolean, timeoutInSeconds?: number, callback?: (error: RestException, data: TypeResponse) => void): Promise<TypeResponse>; // if not valid => show file chooser
    createTypeDirs(entity: string, type: string, rel_path: [string], show_modal?: boolean, timeoutInSeconds?: number, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse>; // implicit type creation
    updateType(entity: string, type: string, timeoutInSeconds?: number, callback?: (error: RestException, data: TypeResponse) => void): Promise<TypeResponse>;
    deleteType(entity: string, type: string, callback?: (error: RestException, data: boolean) => void): Promise<boolean>;
    getEnabledContainers(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse>;
}

/* Model */
export class ListFilesRequest {
    constructor(public path: string, public extensions: string[]) {}
}

export class File {
    constructor(public extension: string,
                public name: string,
                public path: string,
                public size: number,
                public type: string,
                public entity: string,
                public last_modification_time: string,
                public is_dir: boolean,
                public access_mode: AccessMode) {}
}

export class FileListResponse extends T1CResponse {
    constructor(public data: FileList, public success: boolean) {
        super(success, data);
    }
}

export class FileList {
    constructor(public files: File[], public total: number) {}
}

export class FileResponse extends T1CResponse {
    constructor(public data: File, public success: boolean) {
        super(success, data);
    }
}

export class TypeListResponse extends T1CResponse {
    constructor(public data: TypeList, public success: boolean) {
        super(success, data);
    }
}

export class TypeResponse extends T1CResponse {
    constructor(public data: Type, public success: boolean){
        super(success, data);
    }
}

export class Type {
    constructor(public appid?: string, public entity?: string, public type?: string, public abs_path?: string, access_mode?: AccessMode, status?: string, public files?: number) {}
}

export class TypeList {
    constructor(public types: Type[], public total: number) {}
}

export class Page {
    constructor (public start: number, public size: number, public sort: FileSort) {}
}

/* Enumerations */

export class FileSort {
    static ASC = 'asc';
    static DESC = 'desc';
}

export class AccessMode {
    static READ = 'r';
    static WRITE = 'w';
    static EXEC = 'x';
    static READ_WRITE = 'rw';
    static READ_EXEC = 'rx';
    static WRITE_EXEC = 'wx';
    static READ_WRITE_EXEC = 'rwx';
}

export enum TypeStatus {
    MAPPED,
    UNMAPPED
}

export enum FileAction {
    UPLOAD, DOWNLOAD, COPY, MOVE
}

export class ModalType {
    static INFO = 'info';
    static CHOICE = 'choice';
}
