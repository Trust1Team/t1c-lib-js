var GCLLib =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var GCLConfig_1 = __webpack_require__(1);
	exports.GCLConfig = GCLConfig_1.GCLConfig;
	var CardFactory_1 = __webpack_require__(2);
	var CoreService_1 = __webpack_require__(5);
	var Connection_1 = __webpack_require__(6);
	var DSClient_1 = __webpack_require__(7);
	var GCLClient = (function () {
	    function GCLClient(cfg) {
	        var _this = this;
	        this.core = function () { return _this.coreService; };
	        this.config = function () { return _this.cfg; };
	        this.ds = function () { return _this.dsClient; };
	        this.beid = function (reader_id) { return _this.cardFactory.createEidBE(reader_id); };
	        this.emv = function (reader_id) { return _this.cardFactory.createEmv(reader_id); };
	        this.cfg = this.resolveConfig(cfg);
	        this.connection = new Connection_1.LocalConnection();
	        this.authConnection = new Connection_1.LocalAuthConnection();
	        this.remoteConnection = new Connection_1.RemoteConnection();
	        this.cardFactory = new CardFactory_1.CardFactory(this.cfg.gclUrl, this.connection);
	        this.coreService = new CoreService_1.CoreService(this.cfg.gclUrl, this.connection);
	        this.dsClient = new DSClient_1.DSClient(this.cfg.dsUrl, this.remoteConnection);
	        this.initSecurityContext();
	        if (this.cfg.implicitDownload && true) {
	            this.implicitDownload();
	        }
	        this.registerAndActivate();
	    }
	    GCLClient.prototype.resolveConfig = function (cfg) {
	        var resolvedCfg = GCLConfig_1.GCLConfig.Instance;
	        resolvedCfg.apiKey = cfg.apiKey;
	        resolvedCfg.allowAutoUpdate = cfg.allowAutoUpdate;
	        resolvedCfg.client_id = cfg.client_id;
	        resolvedCfg.client_secret = cfg.client_secret;
	        resolvedCfg.jwt = cfg.jwt;
	        resolvedCfg.dsUrl = cfg.dsUrl;
	        resolvedCfg.gclUrl = cfg.gclUrl;
	        resolvedCfg.implicitDownload = cfg.implicitDownload;
	        return resolvedCfg;
	    };
	    GCLClient.prototype.initSecurityContext = function () {
	    };
	    GCLClient.prototype.registerAndActivate = function () {
	    };
	    GCLClient.prototype.implicitDownload = function () {
	        var self = this;
	        this.core().info(function (error, data) {
	            console.log("implicit error", JSON.stringify(error));
	            if (error) {
	                var _info = self.core().infoBrowserSync();
	                console.log("implicit error", JSON.stringify(_info));
	                self.ds().downloadLink(_info, function (error, downloadResponse) {
	                    if (error)
	                        console.error("could not download GCL package:", error.description);
	                    window.open(downloadResponse.url);
	                    return;
	                });
	            }
	            else
	                return;
	        });
	    };
	    return GCLClient;
	}());
	exports.GCLClient = GCLClient;


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var defaultGclUrl = "https://localhost:10433/v1";
	var defaultDSUrl = "https://accapim.t1t.be:443/trust1team/gclds/v1";
	var defaultAllowAutoUpdate = true;
	var defaultImplicitDownload = false;
	var GCLConfig = (function () {
	    function GCLConfig(gclUrl, dsUrl, apiKey, allowAutoUpdate, implicitDownload) {
	        this._gclUrl = gclUrl || defaultGclUrl;
	        this._dsUrl = dsUrl || defaultDSUrl;
	        this._apiKey = apiKey || '';
	        this._allowAutoUpdate = allowAutoUpdate || defaultAllowAutoUpdate;
	        this._implicitDownload = implicitDownload || defaultImplicitDownload;
	    }
	    Object.defineProperty(GCLConfig, "Instance", {
	        get: function () {
	            if (this.instance === null || this.instance === undefined) {
	                this.instance = new GCLConfig();
	                this.instance.gclUrl = defaultGclUrl;
	                this.instance.dsUrl = defaultDSUrl;
	                this.instance.apiKey = '';
	                this.instance.allowAutoUpdate = defaultAllowAutoUpdate;
	                this.instance.implicitDownload = false;
	            }
	            return this.instance;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GCLConfig.prototype, "gclUrl", {
	        get: function () {
	            return this._gclUrl;
	        },
	        set: function (value) {
	            this._gclUrl = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GCLConfig.prototype, "dsUrl", {
	        get: function () {
	            return this._dsUrl;
	        },
	        set: function (value) {
	            this._dsUrl = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GCLConfig.prototype, "apiKey", {
	        get: function () {
	            return this._apiKey;
	        },
	        set: function (value) {
	            this._apiKey = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GCLConfig.prototype, "allowAutoUpdate", {
	        get: function () {
	            return this._allowAutoUpdate;
	        },
	        set: function (value) {
	            this._allowAutoUpdate = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GCLConfig.prototype, "client_id", {
	        get: function () {
	            return this._client_id;
	        },
	        set: function (value) {
	            this._client_id = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GCLConfig.prototype, "client_secret", {
	        get: function () {
	            return this._client_secret;
	        },
	        set: function (value) {
	            this._client_secret = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GCLConfig.prototype, "jwt", {
	        get: function () {
	            return this._jwt;
	        },
	        set: function (value) {
	            this._jwt = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GCLConfig.prototype, "implicitDownload", {
	        get: function () {
	            return this._implicitDownload;
	        },
	        set: function (value) {
	            this._implicitDownload = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return GCLConfig;
	}());
	exports.GCLConfig = GCLConfig;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var EidBe_1 = __webpack_require__(3);
	var EMV_1 = __webpack_require__(4);
	var CardFactory = (function () {
	    function CardFactory(url, connection) {
	        this.url = url;
	        this.connection = connection;
	    }
	    CardFactory.prototype.createEidEST = function (reader_id) {
	        return undefined;
	    };
	    CardFactory.prototype.createEidLUX = function (reader_id) {
	        return undefined;
	    };
	    CardFactory.prototype.createEidBE = function (reader_id) { return new EidBe_1.EidBe(this.url, this.connection, reader_id); };
	    CardFactory.prototype.createEmv = function (reader_id) { return new EMV_1.EMV(this.url, this.connection, reader_id); };
	    return CardFactory;
	}());
	exports.CardFactory = CardFactory;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var SEPARATOR = "/";
	var QUERY_PARAM_FILTER = "filter=";
	var PLUGIN_CONTEXT_BEID = "/plugins/beid";
	var BEID_ALL_CERTIFICATES = "/certificates";
	var BEID_RN_DATA = "/rn";
	var BEID_ADDRESS = "/address";
	var BEID_PHOTO = "/picture";
	var BEID_CERT_ROOT = BEID_ALL_CERTIFICATES + "/root";
	var BEID_CERT_CITIZEN = BEID_ALL_CERTIFICATES + "/citizen";
	var BEID_CERT_AUTHENTICATION = BEID_ALL_CERTIFICATES + "/authentication";
	var BEID_CERT_NON_REPUDIATION = BEID_ALL_CERTIFICATES + "/non-repudiation";
	var BEID_CERT_RRN = BEID_ALL_CERTIFICATES + "/rrn";
	var BEID_VERIFY_PIN = "/verify-pin";
	var BEID_SIGN_DATA = "/sign";
	var BEID_AUTHENTICATE = "/authenticate";
	var VERIFY_PRIV_KEY_REF = "non-repudiation";
	var EidBe = (function () {
	    function EidBe(url, connection, reader_id) {
	        this.url = url;
	        this.connection = connection;
	        this.reader_id = reader_id;
	        this.url = url + PLUGIN_CONTEXT_BEID;
	    }
	    EidBe.prototype.resolvedReaderURI = function () {
	        return this.url + SEPARATOR + this.reader_id;
	    };
	    EidBe.prototype.allData = function (filters, callback) {
	        if (filters && filters.length > 0) {
	            this.connection.get(this.resolvedReaderURI(), callback, QUERY_PARAM_FILTER + filters.join(","));
	        }
	        else {
	            this.connection.get(this.resolvedReaderURI(), callback);
	        }
	    };
	    EidBe.prototype.allCerts = function (filters, callback) {
	        if (filters && filters.length > 0) {
	            this.connection.get(this.resolvedReaderURI() + BEID_ALL_CERTIFICATES, callback, QUERY_PARAM_FILTER + filters.join(","));
	        }
	        else {
	            this.connection.get(this.resolvedReaderURI() + BEID_ALL_CERTIFICATES, callback);
	        }
	    };
	    EidBe.prototype.rnData = function (callback) { this.connection.get(this.resolvedReaderURI() + BEID_RN_DATA, callback); };
	    EidBe.prototype.address = function (callback) { this.connection.get(this.resolvedReaderURI() + BEID_ADDRESS, callback); };
	    EidBe.prototype.picture = function (callback) { this.connection.get(this.resolvedReaderURI() + BEID_PHOTO, callback); };
	    EidBe.prototype.rootCertificate = function (callback) { this.connection.get(this.resolvedReaderURI() + BEID_CERT_ROOT, callback); };
	    EidBe.prototype.citizenCertificate = function (callback) { this.connection.get(this.resolvedReaderURI() + BEID_CERT_CITIZEN, callback); };
	    EidBe.prototype.authenticationCertificate = function (callback) { this.connection.get(this.resolvedReaderURI() + BEID_CERT_AUTHENTICATION, callback); };
	    EidBe.prototype.nonRepudiationCertificate = function (callback) { this.connection.get(this.resolvedReaderURI() + BEID_CERT_NON_REPUDIATION, callback); };
	    EidBe.prototype.rrnCertificate = function (callback) { this.connection.get(this.resolvedReaderURI() + BEID_CERT_RRN, callback); };
	    EidBe.prototype.verifyPin = function (body, callback) {
	        var _req = {};
	        _req.private_key_reference = VERIFY_PRIV_KEY_REF;
	        if (body.pin) {
	            _req.pin = body.pin;
	        }
	        this.connection.post(this.resolvedReaderURI() + BEID_VERIFY_PIN, _req, callback);
	    };
	    EidBe.prototype.signData = function (body, callback) { this.connection.post(this.resolvedReaderURI() + BEID_SIGN_DATA, body, callback); };
	    EidBe.prototype.authenticate = function (body, callback) {
	        var _req = {};
	        if (body) {
	            _req.data = body.challenge;
	            _req.pin = body.pin;
	            _req.algorithm_reference = body.algorithm_reference;
	        }
	        this.connection.post(this.resolvedReaderURI() + BEID_AUTHENTICATE, _req, callback);
	    };
	    return EidBe;
	}());
	exports.EidBe = EidBe;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var SEPARATOR = "/";
	var PLUGIN_CONTEXT_EMV = "/plugins/emv";
	var EMV_PAN = "/pan";
	var EMV_VERIFY = "/verify-pin";
	var EMV = (function () {
	    function EMV(url, connection, reader_id) {
	        this.url = url;
	        this.connection = connection;
	        this.reader_id = reader_id;
	        this.url = url + PLUGIN_CONTEXT_EMV;
	    }
	    EMV.prototype.resolvedReaderURI = function () {
	        return this.url + SEPARATOR + this.reader_id;
	    };
	    EMV.prototype.pan = function (callback) { this.connection.get(this.resolvedReaderURI() + EMV_PAN, callback); };
	    return EMV;
	}());
	exports.EMV = EMV;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var FILTER_CARD_INSERTED = "card-inserted=";
	var CORE_INFO = "/";
	var CORE_PLUGINS = "/plugins";
	var CORE_READERS = "/card-readers";
	var CORE_READER_ID = "/readers/{id}";
	var CORE_DUMMY_JWT = "/admin/manage";
	var CoreService = (function () {
	    function CoreService(url, connection) {
	        this.url = url;
	        this.connection = connection;
	    }
	    CoreService.prototype.info = function (callback) { this.connection.get(this.url + CORE_INFO, callback); };
	    CoreService.prototype.readers = function (callback) { this.connection.get(this.url + CORE_READERS, callback); };
	    CoreService.prototype.readersCardAvailable = function (callback) { this.connection.get(this.url + CORE_READERS, callback, FILTER_CARD_INSERTED + 'true'); };
	    CoreService.prototype.readersCardsUnavailable = function (callback) { this.connection.get(this.url + CORE_READERS, callback, FILTER_CARD_INSERTED + 'false'); };
	    CoreService.prototype.reader = function (reader_id, callback) { this.connection.get(this.url + CORE_READERS + "/" + reader_id, callback); };
	    CoreService.prototype.plugins = function (callback) { this.connection.get(this.url + CORE_PLUGINS, callback); };
	    CoreService.prototype.manage = function (callback) { this.connection.post(this.url + CORE_DUMMY_JWT, {}, callback); };
	    CoreService.prototype.infoBrowser = function (callback) {
	        callback(null, this.platformInfo());
	    };
	    CoreService.prototype.pollReaders = function (seconds, callback) {
	        var maxSeconds = seconds;
	        var self = this;
	        console.debug("start poll readers");
	        readerTimeout(callback);
	        function readerTimeout(callback) {
	            setTimeout(function () {
	                console.debug("seconds left:", maxSeconds);
	                --maxSeconds;
	                self.readers(function (error, data) {
	                    if (error) {
	                        console.log("Waiting...");
	                        readerTimeout(callback);
	                    }
	                    ;
	                    console.debug(JSON.stringify(data));
	                    if (maxSeconds == 0) {
	                        return callback(null, null);
	                    }
	                    else if (data.data.length === 0) {
	                        console.debug("Waiting...");
	                        readerTimeout(callback);
	                    }
	                    else {
	                        console.debug("readerCount:", data.data.length);
	                        return callback(null, { reader_found: "yes" });
	                    }
	                });
	            }, 1000);
	        }
	        ;
	    };
	    CoreService.prototype.infoBrowserSync = function () { return this.platformInfo(); };
	    CoreService.prototype.platformInfo = function () {
	        return {
	            manufacturer: platform.manufacturer || '',
	            browser: {
	                name: platform.name,
	                version: platform.version
	            },
	            os: {
	                name: platform.os.family,
	                version: platform.os.version,
	                architecture: platform.os.architecture
	            },
	            ua: platform.ua
	        };
	    };
	    return CoreService;
	}());
	exports.CoreService = CoreService;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var GCLConfig_1 = __webpack_require__(1);
	var LocalAuthConnection = (function () {
	    function LocalAuthConnection() {
	    }
	    LocalAuthConnection.prototype.get = function (url, callback, queryParams) {
	        $.ajax({
	            url: url,
	            type: 'GET',
	            dataType: 'json',
	            data: queryParams,
	            headers: { 'Authorization': ('Bearer ' + GCLConfig_1.GCLConfig.Instance.jwt), 'Accept-Language': 'en-US' },
	            success: function (successResponse, status, jqXHR) {
	                return callback(null, successResponse);
	            },
	            error: function (errorResponse, status, jqXHR) {
	                return callback(errorResponse, null);
	            }
	        });
	    };
	    LocalAuthConnection.prototype.post = function (url, body, callback) {
	        $.ajax({
	            url: url,
	            type: 'POST',
	            data: JSON.stringify(body),
	            contentType: 'application/json; charset=utf-8',
	            processData: false,
	            dataType: 'json',
	            mimeType: 'application/json',
	            headers: { 'Authorization': ('Bearer ' + GCLConfig_1.GCLConfig.Instance.jwt), 'Accept-Language': 'en-US' },
	            success: function (successResponse, status) {
	                return callback(null, successResponse);
	            },
	            error: function (errorResponse, status, jqXHR) {
	                return callback(errorResponse, null);
	            }
	        });
	    };
	    return LocalAuthConnection;
	}());
	exports.LocalAuthConnection = LocalAuthConnection;
	var LocalConnection = (function () {
	    function LocalConnection() {
	    }
	    LocalConnection.prototype.get = function (url, callback, queryParams) {
	        $.ajax({
	            url: url,
	            type: 'GET',
	            dataType: 'json',
	            data: queryParams,
	            headers: { 'Authorization': ('Bearer ' + GCLConfig_1.GCLConfig.Instance.jwt), 'Accept-Language': 'en-US' },
	            success: function (successResponse, status, jqXHR) {
	                return callback(null, successResponse);
	            },
	            error: function (errorResponse, status, jqXHR) {
	                return callback(errorResponse, null);
	            }
	        });
	    };
	    LocalConnection.prototype.post = function (url, body, callback) {
	        $.ajax({
	            url: url,
	            type: 'POST',
	            data: JSON.stringify(body),
	            contentType: 'application/json; charset=utf-8',
	            processData: false,
	            dataType: 'json',
	            mimeType: 'application/json',
	            headers: { 'Authorization': ('Bearer ' + GCLConfig_1.GCLConfig.Instance.jwt), 'Accept-Language': 'en-US' },
	            success: function (successResponse, status) {
	                return callback(null, successResponse);
	            },
	            error: function (errorResponse, status, jqXHR) {
	                return callback(errorResponse, null);
	            }
	        });
	    };
	    return LocalConnection;
	}());
	exports.LocalConnection = LocalConnection;
	var RemoteConnection = (function () {
	    function RemoteConnection() {
	    }
	    RemoteConnection.prototype.get = function (url, callback, queryParams) {
	        $.ajax({
	            url: url,
	            type: 'GET',
	            dataType: 'json',
	            data: queryParams,
	            headers: { 'apikey': GCLConfig_1.GCLConfig.Instance.apiKey, 'Accept-Language': 'en-US' },
	            success: function (successResponse, status, jqXHR) {
	                return callback(null, successResponse);
	            },
	            error: function (errorResponse, status, jqXHR) {
	                return callback(errorResponse, null);
	            }
	        });
	    };
	    RemoteConnection.prototype.post = function (url, body, callback) {
	        $.ajax({
	            url: url,
	            type: 'POST',
	            data: JSON.stringify(body),
	            contentType: 'application/json; charset=utf-8',
	            processData: false,
	            dataType: 'json',
	            headers: { 'apikey': GCLConfig_1.GCLConfig.Instance.apiKey, 'Accept-Language': 'en-US' },
	            mimeType: 'application/json',
	            success: function (successResponse, status, jqXHR) {
	                return callback(null, successResponse);
	            },
	            error: function (errorResponse, status, jqXHR) {
	                return callback(errorResponse, null);
	            }
	        });
	    };
	    RemoteConnection.prototype.put = function (url, body, callback) {
	        $.ajax({
	            url: url,
	            type: 'PUT',
	            data: JSON.stringify(body),
	            contentType: 'application/json; charset=utf-8',
	            processData: false,
	            dataType: 'json',
	            headers: { 'apikey': GCLConfig_1.GCLConfig.Instance.apiKey, 'Accept-Language': 'en-US' },
	            mimeType: 'application/json',
	            success: function (successResponse, status, jqXHR) {
	                return callback(null, successResponse);
	            },
	            error: function (errorResponse, status, jqXHR) {
	                return callback(errorResponse, null);
	            }
	        });
	    };
	    return RemoteConnection;
	}());
	exports.RemoteConnection = RemoteConnection;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var GCLConfig_1 = __webpack_require__(1);
	var SEPARATOR = "/";
	var SECURITY = "/security";
	var SECURITY_JWT_ISSUE = SECURITY + "/jwt/issue";
	var SECURITY_JWT_REFRESH = SECURITY + "/jwt/refresh";
	var DOWNLOAD = "/download/gcl";
	var DEVICE = "/device";
	var DSClient = (function () {
	    function DSClient(url, connection) {
	        this.url = url;
	        this.connection = connection;
	    }
	    DSClient.prototype.getJWT = function (callback) {
	        var consumerCb = callback;
	        this.connection.get(this.url + SECURITY_JWT_ISSUE, function (error, data) {
	            if (error)
	                return consumerCb(error, null);
	            if (data && data.token)
	                GCLConfig_1.GCLConfig.Instance.jwt = data.token;
	            return consumerCb(null, data);
	        });
	    };
	    DSClient.prototype.refreshJWT = function (callback) {
	        var actualJWT = GCLConfig_1.GCLConfig.Instance.jwt;
	        if (actualJWT) {
	            var _body = {};
	            _body.originalJWT = actualJWT;
	            this.connection.post(this.url + SECURITY_JWT_REFRESH, _body, callback);
	        }
	        else {
	            var noJWT = {};
	            noJWT.code = '500';
	            noJWT.description = 'No JWT available';
	            noJWT.status = 412;
	            callback(noJWT, null);
	        }
	    };
	    DSClient.prototype.downloadLink = function (infoBrowser, callback) {
	        this.connection.post(this.url + DOWNLOAD, infoBrowser, callback);
	    };
	    DSClient.prototype.register = function (info, device_id, callback) {
	        var _req = {};
	        _req.config = JSON.stringify(info);
	        this.connection.put(this.url + DEVICE + SEPARATOR + device_id, _req, callback);
	    };
	    DSClient.prototype.activate = function (device_id, callback) {
	        var _req = {};
	        _req.config = {};
	        this.connection.post(this.url + DEVICE + SEPARATOR + device_id, _req, callback);
	    };
	    return DSClient;
	}());
	exports.DSClient = DSClient;


/***/ }
/******/ ]);
//# sourceMappingURL=GCLLib.js.map