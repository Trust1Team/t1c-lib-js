/**
 * @author Michallis Pashidis
 * @since 2017
 */
import { GenericContainer } from '../smartcards/Card';
import {AbstractFileExchange, AccessMode, FileAction, FileListResponse, FileResponse, ListFilesRequest, ModalType, Page, TypeListResponse, TypeResponse} from './FileExchangeModel';
import { RestException } from '../../core/exceptions/CoreExceptions';
import {DataArrayResponse, DataResponse} from '../../core/service/CoreModel';

export { FileExchange };


class FileExchange extends GenericContainer implements AbstractFileExchange {
    static DOWNLOAD = '/download';
    static FOLDER = '/folder';
    static UPLOAD = '/upload';

    copyFile(entity: string, fromType: string, toType: string, filename: string, newfilename: string, fromrelpath?: [string], torelpath?: [string], callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse> {
        return undefined;
    }

    createDir(entity: string, type: string, relpath: [string], recursive?: boolean, callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse> {
        return undefined;
    }

    createType(entity: string, type: string, initabspath?: [string], showModal?: boolean, timeoutInSeconds?: number, callback?: (error: RestException, data: TypeResponse) => void): Promise<TypeResponse> {
        return undefined;
    }

    createTypeDirs(entity: string, type: string, initrelpath: [string], showModal?: boolean, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse> {
        return undefined;
    }

    deleteType(entity: string, type: string, callback?: (error: RestException, data: boolean) => void): Promise<boolean> {
        return undefined;
    }

    download(entity: string, type: string, file: ArrayBuffer, filename: string, relpath?: [string], createMissingDir?: boolean, notifyOnCompletion?: boolean,
             showProgressBar?: boolean, callback?: (error: RestException, data: FileListResponse) => void): Promise<DataResponse> {
        return undefined;
    }

    existsFile(entity: string, type: string, relpath: [string], callback?: (error: RestException, data: boolean) => void): Promise<boolean> {
        return undefined;
    }

    existsType(entity: string, type: string, callback?: (error: RestException, data: boolean) => void): Promise<boolean> {
        return undefined;
    }

    getAccessMode(entity: string, type: string, filename?: string, relpath?: [string], callback?: (error: RestException, data: AccessMode) => void): Promise<AccessMode> {
        return undefined;
    }

    getEnabledContainers(callback?: (error: RestException, data: DataArrayResponse) => void): Promise<DataArrayResponse> {
        return undefined;
    }

    getFileInfo(entity: string, type: string, filename: string, relpath?: [string], callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse> {
        return undefined;
    }

    getProgress(entity: string, type: String, filename?: String, action?: FileAction, callback?: (error: RestException, data: FileListResponse) => void): Promise<DataResponse> {
        return undefined;
    }

    listContent(entity: string, page?: Page, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse> {
        return undefined;
    }

    listType(entity: string, type: string, callback?: (error: RestException, data: TypeResponse) => void): Promise<TypeResponse> {
        return undefined;
    }

    listTypeContent(entity: string, type: string, relpath?: [string], page?: Page, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse> {
        return undefined;
    }

    listTypes(entity: string, page?: Page, callback?: (error: RestException, data: TypeListResponse) => void): Promise<TypeListResponse> {
        return undefined;
    }

    moveFile(entity: string, fromType: string, toType: string, filename: string, fromrelpath?: [string], torelpath?: [string], callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse> {
        return undefined;
    }

    renameFile(entity: string, type: string, filename: string, newfilename: string, relpath?: [string], callback?: (error: RestException, data: FileResponse) => void): Promise<FileResponse> {
        return undefined;
    }

    showModal(title: string, text: string, modal: ModalType, timeoutInSeconds?: number, callback?: (error: RestException, data: FileListResponse) => void): Promise<boolean> {
        return undefined;
    }

    updateType(entity: string, type: string, timeoutInSeconds?: number, callback?: (error: RestException, data: TypeResponse) => void): Promise<TypeResponse> {
        return undefined;
    }

    upload(entity: string, type: string, filename: string, relpath?: [string], notifyOnCompletion?: boolean, showProgressBar?: boolean, callback?: (error: RestException, data: FileListResponse) => void): Promise<ArrayBuffer> {
        return undefined;
    }


/*    public downloadFile(path: string, file: ArrayBuffer, fileName: string): Promise<DataResponse> {
        return this.connection.putFile(this.baseUrl, this.containerSuffix(FileExchange.DOWNLOAD), { path, file, fileName }, undefined);
    }


    public listFiles(data: ListFilesRequest, callback?: (error: RestException, data: FileListResponse) => void): Promise<FileListResponse> {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.FOLDER), data, undefined, undefined, callback);
    }


    public setFolder(callback?: (error: RestException, data: DataResponse) => void): Promise<DataResponse> {
        return this.connection.get(this.baseUrl, this.containerSuffix(FileExchange.FOLDER), undefined, undefined, callback);
    }


    public uploadFile(path: string): Promise<ArrayBuffer> {
        return this.connection.requestFile(this.baseUrl, this.containerSuffix(FileExchange.UPLOAD), { path });
    }*/


}
