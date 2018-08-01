"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreModel_1 = require("../../core/service/CoreModel");
class ListFilesRequest {
    constructor(path, extensions) {
        this.path = path;
        this.extensions = extensions;
    }
}
exports.ListFilesRequest = ListFilesRequest;
class File {
    constructor(extension, name, path, size, type, entity, last_modification_time, is_dir, access_mode) {
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
}
exports.File = File;
class FileListResponse extends CoreModel_1.T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
exports.FileListResponse = FileListResponse;
class FileList {
    constructor(files, total) {
        this.files = files;
        this.total = total;
    }
}
exports.FileList = FileList;
class FileResponse extends CoreModel_1.T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
exports.FileResponse = FileResponse;
class TypeListResponse extends CoreModel_1.T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
exports.TypeListResponse = TypeListResponse;
class TypeResponse extends CoreModel_1.T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
exports.TypeResponse = TypeResponse;
class Type {
    constructor(appid, entity, type, abs_path, access_mode, status, files) {
        this.appid = appid;
        this.entity = entity;
        this.type = type;
        this.abs_path = abs_path;
        this.files = files;
    }
}
exports.Type = Type;
class TypeList {
    constructor(types, total) {
        this.types = types;
        this.total = total;
    }
}
exports.TypeList = TypeList;
class Page {
    constructor(start, size, sort) {
        this.start = start;
        this.size = size;
        this.sort = sort;
    }
}
exports.Page = Page;
class FileSort {
}
FileSort.ASC = 'asc';
FileSort.DESC = 'desc';
exports.FileSort = FileSort;
class AccessMode {
}
AccessMode.READ = 'r';
AccessMode.WRITE = 'w';
AccessMode.EXEC = 'x';
AccessMode.READ_WRITE = 'rw';
AccessMode.READ_EXEC = 'rx';
AccessMode.WRITE_EXEC = 'wx';
AccessMode.READ_WRITE_EXEC = 'rwx';
exports.AccessMode = AccessMode;
var TypeStatus;
(function (TypeStatus) {
    TypeStatus[TypeStatus["MAPPED"] = 0] = "MAPPED";
    TypeStatus[TypeStatus["UNMAPPED"] = 1] = "UNMAPPED";
})(TypeStatus = exports.TypeStatus || (exports.TypeStatus = {}));
var FileAction;
(function (FileAction) {
    FileAction[FileAction["UPLOAD"] = 0] = "UPLOAD";
    FileAction[FileAction["DOWNLOAD"] = 1] = "DOWNLOAD";
    FileAction[FileAction["COPY"] = 2] = "COPY";
    FileAction[FileAction["MOVE"] = 3] = "MOVE";
})(FileAction = exports.FileAction || (exports.FileAction = {}));
class ModalType {
}
ModalType.INFO = 'info';
ModalType.CHOICE = 'choice';
exports.ModalType = ModalType;
//# sourceMappingURL=FileExchangeModel.js.map