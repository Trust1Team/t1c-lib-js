"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileExchangeModel_1 = require("./FileExchangeModel");
const GenericContainer_1 = require("../GenericContainer");
class FileExchange extends GenericContainer_1.GenericContainer {
    constructor(baseUrl, containerUrl, connection) {
        super(baseUrl, containerUrl, connection, FileExchange.CONTAINER_PREFIX);
    }
    copyFile(entity, from_type, to_type, filename, new_filename, from_rel_path, to_rel_path, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.FILE_COPY), { entity, from_type, to_type, filename, new_filename, from_rel_path, to_rel_path }, undefined, undefined, callback);
    }
    createDir(entity, type, rel_path, recursive, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.DIR_CREATE), { entity, type, rel_path, recursive }, undefined, undefined, callback);
    }
    createType(entity, type, initabspath, showModal, timeoutInSeconds, callback) {
        const show_modal = (showModal == null) ? undefined : showModal;
        const timeout = (timeoutInSeconds == null) ? 30 : timeoutInSeconds;
        const init_tabs_path = (initabspath == null) ? undefined : initabspath;
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.TYPE_CREATE), { entity, type, show_modal, timeout, init_tabs_path }, undefined, undefined, callback);
    }
    createTypeDirs(entity, type, relpath, showModal, timeoutInSeconds, callback) {
        const timeout = (timeoutInSeconds == null) ? 30 : timeoutInSeconds;
        const show_modal = (showModal == null) ? undefined : showModal;
        const rel_path = (relpath == null) ? undefined : relpath;
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.TYPE_DIRS_CREATE), { entity, type, show_modal, timeout, rel_path }, undefined, undefined, callback);
    }
    deleteType(entity, type, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.TYPE_DELETE), { entity, type }, undefined, undefined, callback);
    }
    download(entity, type, file, filename, rel_path, implicit_creation_type, notify_on_completion, callback) {
        let relPathInput;
        if (rel_path && rel_path.length > 0) {
            relPathInput = rel_path.join();
        }
        else {
            relPathInput = undefined;
        }
        return this.connection.postFile(this.baseUrl, this.containerSuffix(FileExchange.DOWNLOAD), { entity, type, file, filename, relPathInput, implicit_creation_type, notify_on_completion }, undefined, callback);
    }
    existsFile(entity, type, rel_path, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.FILE_EXISTS), { entity, type, rel_path }, undefined, undefined, callback);
    }
    existsType(entity, type, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.TYPE_EXISTS), { entity, type }, undefined, undefined, callback);
    }
    getAccessMode(entity, type, relpath, callback) {
        const rel_path = (relpath == null) ? undefined : relpath;
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.ACCESS_MODE), { entity, type, rel_path }, undefined, undefined, callback);
    }
    getEnabledContainers(callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(FileExchange.CONTAINERS_ENABLED), [], undefined, callback);
    }
    getFileInfo(entity, type, filename, rel_path, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.FILE_INFO), { entity, type, filename, rel_path }, undefined, undefined, callback);
    }
    listContent(entity, page, callback) {
        return undefined;
    }
    listType(entity, type, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.TYPE_LIST), { entity, type }, undefined, undefined, callback);
    }
    listTypeContent(entity, type, rel_path, page, callback) {
        let paging;
        if (page) {
            paging = page;
        }
        else {
            paging = { start: 1, size: 10, sort: FileExchangeModel_1.FileSort.ASC };
        }
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.TYPE_CONTENT_LIST), { entity, type, rel_path, paging }, undefined, undefined, callback);
    }
    listTypes(entity, page, callback) {
        let paging;
        if (page) {
            paging = page;
        }
        else {
            paging = { start: 1, size: 10, sort: FileExchangeModel_1.FileSort.ASC };
        }
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.TYPES_LIST), { entity, paging }, undefined, undefined, callback);
    }
    moveFile(entity, from_type, to_type, filename, from_rel_path, to_rel_path, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.FILE_MOVE), { entity, from_type, to_type, filename, from_rel_path, to_rel_path }, undefined, undefined, callback);
    }
    renameFile(entity, type, filename, new_filename, rel_path, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.FILE_RENAME), { entity, type, filename, new_filename, rel_path }, undefined, undefined, callback);
    }
    showModal(title, text, modal, timeoutInSeconds, callback) {
        const timeout = (timeoutInSeconds == null) ? 30 : timeoutInSeconds;
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.MODAL_SHOW), { title, text, modal, timeout }, undefined, undefined, callback);
    }
    updateType(entity, type, timeoutInSeconds, callback) {
        const timeout = (timeoutInSeconds == null) ? 30 : timeoutInSeconds;
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.TYPE_UPDATE), { entity, type, timeout }, undefined, undefined, callback);
    }
    upload(entity, type, filename, rel_path, notify_on_completion, callback) {
        return this.connection.requestFile(this.baseUrl, this.containerSuffix(FileExchange.UPLOAD), { entity, type, filename, rel_path, notify_on_completion }, callback);
    }
}
FileExchange.CONTAINER_PREFIX = 'file-exchange';
FileExchange.DOWNLOAD = '/download';
FileExchange.UPLOAD = '/upload';
FileExchange.TYPE_CREATE = '/create-type';
FileExchange.TYPE_DIRS_CREATE = '/create-type-dirs';
FileExchange.TYPE_UPDATE = '/update-type';
FileExchange.TYPES_LIST = '/list-types';
FileExchange.TYPE_LIST = '/list-type';
FileExchange.TYPE_CONTENT_LIST = '/list-type-content';
FileExchange.TYPE_DELETE = '/delete-type';
FileExchange.TYPE_EXISTS = '/exists-type';
FileExchange.FILE_EXISTS = '/exists-file';
FileExchange.FILE_MOVE = '/move-file';
FileExchange.FILE_COPY = '/copy-file';
FileExchange.FILE_RENAME = '/rename-file';
FileExchange.MODAL_SHOW = '/show-modal';
FileExchange.ACCESS_MODE = '/access-mode';
FileExchange.CONTAINERS_ENABLED = '/enabled-containers';
FileExchange.DIR_CREATE = '/create-dir';
FileExchange.FILE_INFO = '/file-info';
exports.FileExchange = FileExchange;
//# sourceMappingURL=FileExchange.js.map