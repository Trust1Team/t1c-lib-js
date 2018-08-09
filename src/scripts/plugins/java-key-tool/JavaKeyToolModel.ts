import {DataResponse} from '../../core/service/CoreModel';
import {T1CLibException} from '../../core/exceptions/CoreExceptions';
import {FileListResponse} from '../file/FileExchangeModel';

/**
 *
 * @author Gilles Platteeuw
 * @since  2018
 */

export interface AbstractJavaKeyTool {
    download(entity: string, type: string, file: ArrayBuffer, filename: string, relpath?: [string], implicitCreationType?: boolean, notifyOnCompletion?: boolean, callback?: (error: T1CLibException, data: FileListResponse) => void): Promise<DataResponse>; // implicit
}