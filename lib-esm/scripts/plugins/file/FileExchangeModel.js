import { T1CResponse } from '../../core/service/CoreModel';
export class ListFilesRequest {
    constructor(path, extensions) {
        this.path = path;
        this.extensions = extensions;
    }
}
export class File {
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
export class FileListResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
export class FileList {
    constructor(files, total) {
        this.files = files;
        this.total = total;
    }
}
export class FileResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
export class TypeListResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
export class TypeResponse extends T1CResponse {
    constructor(data, success) {
        super(success, data);
        this.data = data;
        this.success = success;
    }
}
export class Type {
    constructor(appid, entity, type, abs_path, access_mode, status, files) {
        this.appid = appid;
        this.entity = entity;
        this.type = type;
        this.abs_path = abs_path;
        this.files = files;
    }
}
export class TypeList {
    constructor(types, total) {
        this.types = types;
        this.total = total;
    }
}
export class Page {
    constructor(start, size, sort) {
        this.start = start;
        this.size = size;
        this.sort = sort;
    }
}
export class FileSort {
}
FileSort.ASC = 'asc';
FileSort.DESC = 'desc';
export class AccessMode {
}
AccessMode.READ = 'r';
AccessMode.WRITE = 'w';
AccessMode.EXEC = 'x';
AccessMode.READ_WRITE = 'rw';
AccessMode.READ_EXEC = 'rx';
AccessMode.WRITE_EXEC = 'wx';
AccessMode.READ_WRITE_EXEC = 'rwx';
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
export class ModalType {
}
ModalType.INFO = 'info';
ModalType.CHOICE = 'choice';
//# sourceMappingURL=FileExchangeModel.js.map