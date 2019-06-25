var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { T1CResponse } from '../../core/service/CoreModel';
var ListFilesRequest = (function () {
    function ListFilesRequest(path, extensions) {
        this.path = path;
        this.extensions = extensions;
    }
    return ListFilesRequest;
}());
export { ListFilesRequest };
var File = (function () {
    function File(extension, name, path, size, type, entity, last_modification_time, is_dir, access_mode) {
        this.extension = extension;
        this.name = name;
        this.path = path;
        this.size = size;
        this.type = type;
        this.entity = entity;
        this.last_modification_time = last_modification_time;
        this.is_dir = is_dir;
        this.access_mode = access_mode;
    }
    return File;
}());
export { File };
var FileListResponse = (function (_super) {
    __extends(FileListResponse, _super);
    function FileListResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return FileListResponse;
}(T1CResponse));
export { FileListResponse };
var FileList = (function () {
    function FileList(files, total) {
        this.files = files;
        this.total = total;
    }
    return FileList;
}());
export { FileList };
var FileResponse = (function (_super) {
    __extends(FileResponse, _super);
    function FileResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return FileResponse;
}(T1CResponse));
export { FileResponse };
var TypeListResponse = (function (_super) {
    __extends(TypeListResponse, _super);
    function TypeListResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return TypeListResponse;
}(T1CResponse));
export { TypeListResponse };
var TypeResponse = (function (_super) {
    __extends(TypeResponse, _super);
    function TypeResponse(data, success) {
        var _this = _super.call(this, success, data) || this;
        _this.data = data;
        _this.success = success;
        return _this;
    }
    return TypeResponse;
}(T1CResponse));
export { TypeResponse };
var Type = (function () {
    function Type(appid, entity, type, abs_path, access_mode, status, files) {
        this.appid = appid;
        this.entity = entity;
        this.type = type;
        this.abs_path = abs_path;
        this.files = files;
    }
    return Type;
}());
export { Type };
var TypeList = (function () {
    function TypeList(types, total) {
        this.types = types;
        this.total = total;
    }
    return TypeList;
}());
export { TypeList };
var Page = (function () {
    function Page(start, size, sort) {
        this.start = start;
        this.size = size;
        this.sort = sort;
    }
    return Page;
}());
export { Page };
var FileSort = (function () {
    function FileSort() {
    }
    FileSort.ASC = 'asc';
    FileSort.DESC = 'desc';
    return FileSort;
}());
export { FileSort };
var AccessMode = (function () {
    function AccessMode() {
    }
    AccessMode.READ = 'r';
    AccessMode.WRITE = 'w';
    AccessMode.EXEC = 'x';
    AccessMode.READ_WRITE = 'rw';
    AccessMode.READ_EXEC = 'rx';
    AccessMode.WRITE_EXEC = 'wx';
    AccessMode.READ_WRITE_EXEC = 'rwx';
    return AccessMode;
}());
export { AccessMode };
export var TypeStatus;
(function (TypeStatus) {
    TypeStatus[TypeStatus["MAPPED"] = 0] = "MAPPED";
    TypeStatus[TypeStatus["UNMAPPED"] = 1] = "UNMAPPED";
})(TypeStatus || (TypeStatus = {}));
export var FileAction;
(function (FileAction) {
    FileAction[FileAction["UPLOAD"] = 0] = "UPLOAD";
    FileAction[FileAction["DOWNLOAD"] = 1] = "DOWNLOAD";
    FileAction[FileAction["COPY"] = 2] = "COPY";
    FileAction[FileAction["MOVE"] = 3] = "MOVE";
})(FileAction || (FileAction = {}));
var ModalType = (function () {
    function ModalType() {
    }
    ModalType.INFO = 'info';
    ModalType.CHOICE = 'choice';
    return ModalType;
}());
export { ModalType };
//# sourceMappingURL=FileExchangeModel.js.map