var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { GenericContainer } from '../smartcards/Card';
import { FileSort } from './FileExchangeModel';
var FileExchange = (function (_super) {
    __extends(FileExchange, _super);
    function FileExchange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileExchange.prototype.copyFile = function (entity, from_type, to_type, filename, new_filename, from_rel_path, to_rel_path, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.FILE_COPY), { entity: entity, from_type: from_type, to_type: to_type, filename: filename, new_filename: new_filename, from_rel_path: from_rel_path, to_rel_path: to_rel_path }, undefined, undefined, callback);
    };
    FileExchange.prototype.createDir = function (entity, type, rel_path, recursive, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.DIR_CREATE), { entity: entity, type: type, rel_path: rel_path, recursive: recursive }, undefined, undefined, callback);
    };
    FileExchange.prototype.createType = function (entity, type, initabspath, showModal, timeoutInSeconds, callback) {
        var show_modal = (showModal == null) ? undefined : showModal;
        var timeout = (timeoutInSeconds == null) ? 30 : timeoutInSeconds;
        var init_tabs_path = (initabspath == null) ? undefined : initabspath;
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.TYPE_CREATE), { entity: entity, type: type, show_modal: show_modal, timeout: timeout, init_tabs_path: init_tabs_path }, undefined, undefined, callback);
    };
    FileExchange.prototype.createTypeDirs = function (entity, type, relpath, showModal, timeoutInSeconds, callback) {
        var timeout = (timeoutInSeconds == null) ? 30 : timeoutInSeconds;
        var show_modal = (showModal == null) ? undefined : showModal;
        var rel_path = (relpath == null) ? undefined : relpath;
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.TYPE_DIRS_CREATE), { entity: entity, type: type, show_modal: show_modal, timeout: timeout, rel_path: rel_path }, undefined, undefined, callback);
    };
    FileExchange.prototype.deleteType = function (entity, type, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.TYPE_DELETE), { entity: entity, type: type }, undefined, undefined, callback);
    };
    FileExchange.prototype.download = function (entity, type, file, filename, rel_path, implicit_creation_type, notify_on_completion, callback) {
        var relPathInput;
        if (rel_path && rel_path.length > 0) {
            relPathInput = rel_path.join();
        }
        else {
            relPathInput = undefined;
        }
        return this.connection.postFile(this.baseUrl, this.containerSuffix(FileExchange.DOWNLOAD), { entity: entity, type: type, file: file, filename: filename, relPathInput: relPathInput, implicit_creation_type: implicit_creation_type, notify_on_completion: notify_on_completion }, undefined, callback);
    };
    FileExchange.prototype.existsFile = function (entity, type, rel_path, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.FILE_EXISTS), { entity: entity, type: type, rel_path: rel_path }, undefined, undefined, callback);
    };
    FileExchange.prototype.existsType = function (entity, type, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.TYPE_EXISTS), { entity: entity, type: type }, undefined, undefined, callback);
    };
    FileExchange.prototype.getAccessMode = function (entity, type, relpath, callback) {
        var rel_path = (relpath == null) ? undefined : relpath;
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.ACCESS_MODE), { entity: entity, type: type, rel_path: rel_path }, undefined, undefined, callback);
    };
    FileExchange.prototype.getEnabledContainers = function (callback) {
        return this.connection.get(this.baseUrl, this.containerSuffix(FileExchange.CONTAINERS_ENABLED), [], undefined, callback);
    };
    FileExchange.prototype.getFileInfo = function (entity, type, filename, rel_path, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.FILE_INFO), { entity: entity, type: type, filename: filename, rel_path: rel_path }, undefined, undefined, callback);
    };
    FileExchange.prototype.listContent = function (entity, page, callback) {
        return undefined;
    };
    FileExchange.prototype.listType = function (entity, type, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.TYPE_LIST), { entity: entity, type: type }, undefined, undefined, callback);
    };
    FileExchange.prototype.listTypeContent = function (entity, type, rel_path, page, callback) {
        var paging;
        if (page) {
            paging = page;
        }
        else {
            paging = { start: 1, size: 10, sort: FileSort.ASC };
        }
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.TYPE_CONTENT_LIST), { entity: entity, type: type, rel_path: rel_path, paging: paging }, undefined, undefined, callback);
    };
    FileExchange.prototype.listTypes = function (entity, page, callback) {
        var paging;
        if (page) {
            paging = page;
        }
        else {
            paging = { start: 1, size: 10, sort: FileSort.ASC };
        }
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.TYPES_LIST), { entity: entity, paging: paging }, undefined, undefined, callback);
    };
    FileExchange.prototype.moveFile = function (entity, from_type, to_type, filename, from_rel_path, to_rel_path, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.FILE_MOVE), { entity: entity, from_type: from_type, to_type: to_type, filename: filename, from_rel_path: from_rel_path, to_rel_path: to_rel_path }, undefined, undefined, callback);
    };
    FileExchange.prototype.renameFile = function (entity, type, filename, new_filename, rel_path, callback) {
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.FILE_RENAME), { entity: entity, type: type, filename: filename, new_filename: new_filename, rel_path: rel_path }, undefined, undefined, callback);
    };
    FileExchange.prototype.showModal = function (title, text, modal, timeoutInSeconds, callback) {
        var timeout = (timeoutInSeconds == null) ? 30 : timeoutInSeconds;
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.MODAL_SHOW), { title: title, text: text, modal: modal, timeout: timeout }, undefined, undefined, callback);
    };
    FileExchange.prototype.updateType = function (entity, type, timeoutInSeconds, callback) {
        var timeout = (timeoutInSeconds == null) ? 30 : timeoutInSeconds;
        return this.connection.post(this.baseUrl, this.containerSuffix(FileExchange.TYPE_UPDATE), { entity: entity, type: type, timeout: timeout }, undefined, undefined, callback);
    };
    FileExchange.prototype.upload = function (entity, type, filename, rel_path, notify_on_completion, callback) {
        return this.connection.requestFile(this.baseUrl, this.containerSuffix(FileExchange.UPLOAD), { entity: entity, type: type, filename: filename, rel_path: rel_path, notify_on_completion: notify_on_completion }, callback);
    };
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
    return FileExchange;
}(GenericContainer));
export { FileExchange };
//# sourceMappingURL=FileExchange.js.map