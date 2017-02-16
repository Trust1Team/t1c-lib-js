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
	var CoreService_1 = __webpack_require__(6);
	var Connection_1 = __webpack_require__(9);
	var DSClient_1 = __webpack_require__(36);
	var OCVClient_1 = __webpack_require__(37);
	var GCLClient = (function () {
	    function GCLClient(cfg) {
	        var _this = this;
	        this.core = function () { return _this.coreService; };
	        this.config = function () { return _this.cfg; };
	        this.ds = function () { return _this.dsClient; };
	        this.ocv = function () { return _this.ocvClient; };
	        this.beid = function (reader_id) { return _this.cardFactory.createEidBE(reader_id); };
	        this.luxeid = function (reader_id, pin) { return _this.cardFactory.createEidLUX(reader_id, pin); };
	        this.emv = function (reader_id) { return _this.cardFactory.createEmv(reader_id); };
	        var self = this;
	        this.cfg = this.resolveConfig(cfg);
	        this.connection = new Connection_1.LocalConnection(this.cfg);
	        this.authConnection = new Connection_1.LocalAuthConnection(this.cfg);
	        this.remoteConnection = new Connection_1.RemoteConnection(this.cfg);
	        this.cardFactory = new CardFactory_1.CardFactory(this.cfg.gclUrl, this.connection, this.cfg);
	        this.coreService = new CoreService_1.CoreService(this.cfg.gclUrl, this.authConnection, this.cfg);
	        this.dsClient = new DSClient_1.DSClient(this.cfg.dsUrl, this.remoteConnection, this.cfg);
	        this.ocvClient = new OCVClient_1.OCVClient(this.cfg.ocvUrl, this.remoteConnection, this.cfg);
	        if (this.cfg.implicitDownload && true) {
	            this.implicitDownload();
	        }
	        this.initSecurityContext(function (err, data) {
	            if (err) {
	                console.log(JSON.stringify(err));
	                return;
	            }
	            self.registerAndActivate();
	        });
	        this.initOCVContext(function (err, data) {
	            if (err) {
	                console.warn("OCV not available for apikey, contact support@trust1team.com to add this capability");
	            }
	            else
	                console.log("OCV available for apikey");
	        });
	    }
	    GCLClient.prototype.resolveConfig = function (cfg) {
	        var resolvedCfg = new GCLConfig_1.GCLConfig(cfg.dsUrlBase, cfg.apiKey);
	        resolvedCfg.allowAutoUpdate = cfg.allowAutoUpdate;
	        resolvedCfg.client_id = cfg.client_id;
	        resolvedCfg.client_secret = cfg.client_secret;
	        resolvedCfg.jwt = cfg.jwt;
	        resolvedCfg.gclUrl = cfg.gclUrl;
	        resolvedCfg.implicitDownload = cfg.implicitDownload;
	        return resolvedCfg;
	    };
	    GCLClient.prototype.initOCVContext = function (cb) {
	        return this.ocvClient.getInfo(cb);
	    };
	    GCLClient.prototype.initSecurityContext = function (cb) {
	        var self = this;
	        var clientCb = cb;
	        this.core().getPubKey(function (err, gclResponse) {
	            if (err && err.data && !err.data.success) {
	                self.dsClient.getPubKey(function (err, dsResponse) {
	                    console.log(dsResponse);
	                    if (err)
	                        return clientCb(err, null);
	                    var innerCb = clientCb;
	                    self.core().setPubKey(dsResponse.pubkey, function (err, response) {
	                        if (err)
	                            return innerCb(err, null);
	                        return innerCb(null, {});
	                    });
	                });
	            }
	            return cb(null, {});
	        });
	    };
	    GCLClient.prototype.registerAndActivate = function () {
	        var self = this;
	        var self_cfg = this.cfg;
	        self.core().info(function (err, infoResponse) {
	            if (err) {
	                console.log(JSON.stringify(err));
	                return;
	            }
	            var activated = infoResponse.data.activated;
	            var managed = infoResponse.data.managed;
	            var core_version = infoResponse.data.version;
	            var uuid = infoResponse.data.uid;
	            var info = self.core().infoBrowserSync();
	            info.managed = managed;
	            info.core_version = core_version;
	            info.activated = activated;
	            if (!activated) {
	                self.dsClient.register(info, uuid, function (err, activationResponse) {
	                    if (err)
	                        return;
	                    self_cfg.jwt = activationResponse.token;
	                    self.core().activate(function (err, data) {
	                        if (err)
	                            return;
	                        info.activated = true;
	                        self.dsClient.sync(info, uuid, function (err, syncResponse) {
	                            return;
	                        });
	                    });
	                });
	            }
	            else {
	                self.dsClient.sync(info, uuid, function (err, activationResponse) {
	                    if (err)
	                        return;
	                    self_cfg.jwt = activationResponse.token;
	                    return;
	                });
	            }
	        });
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
	var defaultDSUrl = "https://accapim.t1t.be:443";
	var defaultDSContextPath = "/trust1team/gclds/v1";
	var defaultOCVContextPath = "/trust1team/ocv-api/v1";
	var fileDownloadUrlPostfix = "/trust1team/gclds-file/v1";
	var defaultAllowAutoUpdate = true;
	var defaultImplicitDownload = false;
	var GCLConfig = (function () {
	    function GCLConfig(dsUriValue, apiKey) {
	        this._gclUrl = defaultGclUrl;
	        this._dsUrl = dsUriValue + defaultDSContextPath;
	        this._ocvUrl = dsUriValue + defaultOCVContextPath;
	        this._dsFileDownloadUrl = dsUriValue + fileDownloadUrlPostfix;
	        this._dsUrlBase = dsUriValue;
	        this._apiKey = apiKey;
	        this._jwt = 'none';
	        this._allowAutoUpdate = defaultAllowAutoUpdate;
	        this._implicitDownload = defaultImplicitDownload;
	    }
	    Object.defineProperty(GCLConfig.prototype, "ocvUrl", {
	        get: function () {
	            return this._ocvUrl;
	        },
	        set: function (value) {
	            this._ocvUrl = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GCLConfig.prototype, "gclUrl", {
	        get: function () {
	            return this._gclUrl;
	        },
	        set: function (value) {
	            this._gclUrl = value || defaultGclUrl;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GCLConfig.prototype, "dsUrl", {
	        get: function () {
	            return this._dsUrl;
	        },
	        set: function (dsUriValue) {
	            if (strEndsWith(dsUriValue, defaultDSContextPath)) {
	                this._dsUrlBase = dsUriValue.replace(defaultDSContextPath, '');
	                this._dsUrl = dsUriValue;
	                this._dsFileDownloadUrl = this._dsUrlBase + fileDownloadUrlPostfix;
	            }
	            else {
	                this._dsUrl = dsUriValue + defaultDSContextPath;
	                this._dsFileDownloadUrl = dsUriValue + fileDownloadUrlPostfix;
	                this._dsUrlBase = dsUriValue;
	            }
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
	    Object.defineProperty(GCLConfig.prototype, "dsFilDownloadUrl", {
	        get: function () {
	            return this._dsFileDownloadUrl;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GCLConfig.prototype, "dsUrlBase", {
	        get: function () {
	            return this._dsUrlBase;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return GCLConfig;
	}());
	exports.GCLConfig = GCLConfig;
	function strEndsWith(str, suffix) {
	    return str.match(suffix + "$") == suffix;
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var EMV_1 = __webpack_require__(3);
	var EidBe_1 = __webpack_require__(4);
	var EidLux_1 = __webpack_require__(5);
	var CardFactory = (function () {
	    function CardFactory(url, connection, cfg) {
	        this.url = url;
	        this.connection = connection;
	        this.cfg = cfg;
	    }
	    CardFactory.prototype.createEidBE = function (reader_id) { return new EidBe_1.EidBe(this.url, this.connection, reader_id); };
	    CardFactory.prototype.createEidLUX = function (reader_id, pin) { return new EidLux_1.EidLux(this.url, this.connection, reader_id, pin); };
	    CardFactory.prototype.createEmv = function (reader_id) { return new EMV_1.EMV(this.url, this.connection, reader_id); };
	    return CardFactory;
	}());
	exports.CardFactory = CardFactory;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var SEPARATOR = "/";
	var PLUGIN_CONTEXT_EMV = "/plugins/emv";
	var EMV_PAN = "/pan";
	var EMV_VERIFY_PIN = "/verify-pin";
	function createFilter(filters) {
	    return { filter: filters.join(',') };
	}
	var EMV = (function () {
	    function EMV(url, connection, reader_id) {
	        this.url = url;
	        this.connection = connection;
	        this.reader_id = reader_id;
	        this.url = url + PLUGIN_CONTEXT_EMV;
	    }
	    EMV.prototype.resolvedReaderURI = function () { return this.url + SEPARATOR + this.reader_id; };
	    EMV.prototype.allData = function (filters, callback) {
	        if (filters && filters.length > 0) {
	            this.connection.get(this.resolvedReaderURI(), callback, createFilter(filters));
	        }
	        else {
	            this.connection.get(this.resolvedReaderURI(), callback);
	        }
	    };
	    EMV.prototype.verifyPin = function (body, callback) {
	        var _req = {};
	        if (body.pin) {
	            _req.pin = body.pin;
	        }
	        this.connection.post(this.resolvedReaderURI() + EMV_VERIFY_PIN, _req, callback);
	    };
	    EMV.prototype.pan = function (callback) { this.connection.get(this.resolvedReaderURI() + EMV_PAN, callback); };
	    return EMV;
	}());
	exports.EMV = EMV;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var SEPARATOR = "/";
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
	function createFilter(filters) {
	    return { filter: filters.join(',') };
	}
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
	            this.connection.get(this.resolvedReaderURI(), callback, createFilter(filters));
	        }
	        else {
	            this.connection.get(this.resolvedReaderURI(), callback);
	        }
	    };
	    EidBe.prototype.allCerts = function (filters, callback) {
	        if (filters && filters.length > 0) {
	            this.connection.get(this.resolvedReaderURI() + BEID_ALL_CERTIFICATES, callback, createFilter(filters));
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
	    EidBe.prototype.signData = function (body, callback) {
	        var _req = {};
	        if (body) {
	            _req.algorithm_reference = body.algorithm_reference;
	            _req.data = body.data;
	            if (body.pin) {
	                _req.pin = body.pin;
	            }
	        }
	        this.connection.post(this.resolvedReaderURI() + BEID_SIGN_DATA, _req, callback);
	    };
	    EidBe.prototype.authenticate = function (body, callback) {
	        var _req = {};
	        if (body) {
	            _req.data = body.data;
	            _req.algorithm_reference = body.algorithm_reference;
	            if (body.pin) {
	                _req.pin = body.pin;
	            }
	        }
	        this.connection.post(this.resolvedReaderURI() + BEID_AUTHENTICATE, _req, callback);
	    };
	    return EidBe;
	}());
	exports.EidBe = EidBe;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	function createFilterQueryParam(filters, pin) {
	    return { filter: filters.join(','), pin: pin };
	}
	function createPinQueryParam(pin) {
	    return { pin: pin };
	}
	var SEPARATOR = "/";
	var PLUGIN_CONTEXT_LUXEID = "/plugins/luxeid";
	var LUX_ALL_CERTIFICATES = "/certificates";
	var LUX_BIOMETRIC = "/biometric";
	var LUX_ADDRESS = "/address";
	var LUX_PHOTO = "/picture";
	var LUX_CERT_ROOT = LUX_ALL_CERTIFICATES + "/root";
	var LUX_CERT_AUTHENTICATION = LUX_ALL_CERTIFICATES + "/authentication";
	var LUX_CERT_NON_REPUDIATION = LUX_ALL_CERTIFICATES + "/non-repudiation";
	var LUX_VERIFY_PIN = "/verify-pin";
	var LUX_SIGN_DATA = "/sign";
	var LUX_AUTHENTICATE = "/authenticate";
	var EidLux = (function () {
	    function EidLux(url, connection, reader_id, pin) {
	        this.url = url;
	        this.connection = connection;
	        this.reader_id = reader_id;
	        this.pin = pin;
	        this.url = url + PLUGIN_CONTEXT_LUXEID;
	        this.pin = pin;
	    }
	    EidLux.prototype.allDataFilters = function () {
	        return ["authentication-certificate", "biometric", "non-repudiation-certificate", "picture", "root-certificates"];
	    };
	    EidLux.prototype.allCertFilters = function () {
	        return ["authentication-certificate", "non-repudiation-certificate", "root-certificates"];
	    };
	    EidLux.prototype.resolvedReaderURI = function () {
	        return this.url + SEPARATOR + this.reader_id;
	    };
	    EidLux.prototype.allData = function (filters, callback) {
	        if (filters && filters.length > 0) {
	            this.connection.get(this.resolvedReaderURI(), callback, createFilterQueryParam(filters, this.pin));
	        }
	        else {
	            this.connection.get(this.resolvedReaderURI(), callback, createPinQueryParam(this.pin));
	        }
	    };
	    EidLux.prototype.allCerts = function (filters, callback) {
	        if (filters && filters.length > 0) {
	            this.connection.get(this.resolvedReaderURI() + LUX_ALL_CERTIFICATES, callback, createFilterQueryParam(filters, this.pin));
	        }
	        else {
	            this.connection.get(this.resolvedReaderURI() + LUX_ALL_CERTIFICATES, callback, createPinQueryParam(this.pin));
	        }
	    };
	    EidLux.prototype.biometric = function (callback) { this.connection.get(this.resolvedReaderURI() + LUX_BIOMETRIC, callback, createPinQueryParam(this.pin)); };
	    EidLux.prototype.address = function (callback) { this.connection.get(this.resolvedReaderURI() + LUX_ADDRESS, callback, createPinQueryParam(this.pin)); };
	    EidLux.prototype.picture = function (callback) { this.connection.get(this.resolvedReaderURI() + LUX_PHOTO, callback, createPinQueryParam(this.pin)); };
	    EidLux.prototype.rootCertificate = function (callback) { this.connection.get(this.resolvedReaderURI() + LUX_CERT_ROOT, callback, createPinQueryParam(this.pin)); };
	    EidLux.prototype.authenticationCertificate = function (callback) { this.connection.get(this.resolvedReaderURI() + LUX_CERT_AUTHENTICATION, callback, createPinQueryParam(this.pin)); };
	    EidLux.prototype.nonRepudiationCertificate = function (callback) { this.connection.get(this.resolvedReaderURI() + LUX_CERT_NON_REPUDIATION, callback, createPinQueryParam(this.pin)); };
	    EidLux.prototype.verifyPin = function (body, callback) {
	        var _res = {};
	        _res.result = false;
	        _res.info = "TBD";
	        callback(_res, null);
	    };
	    EidLux.prototype.signData = function (body, callback) {
	        var _res = {};
	        _res.result = false;
	        _res.info = "TBD";
	        callback(_res, null);
	    };
	    EidLux.prototype.authenticate = function (body, callback) {
	        var _res = {};
	        _res.result = false;
	        _res.info = "TBD";
	        callback(_res, null);
	    };
	    return EidLux;
	}());
	exports.EidLux = EidLux;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var platform = __webpack_require__(7);
	var CORE_INFO = "/";
	var CORE_PLUGINS = "/plugins";
	var CORE_READERS = "/card-readers";
	var CORE_READER_ID = "/readers/{id}";
	var CORE_ACTIVATE = "/admin/activate";
	var CORE_PUB_KEY = "/admin/certificate";
	function cardInsertedFilter(inserted) {
	    return { 'card-inserted': inserted };
	}
	var CoreService = (function () {
	    function CoreService(url, connection, cfg) {
	        this.url = url;
	        this.connection = connection;
	        this.cfg = cfg;
	    }
	    CoreService.prototype.info = function (callback) { this.connection.get(this.url + CORE_INFO, callback); };
	    CoreService.prototype.readers = function (callback) { this.connection.get(this.url + CORE_READERS, callback); };
	    CoreService.prototype.readersCardAvailable = function (callback) { this.connection.get(this.url + CORE_READERS, callback, cardInsertedFilter(true)); };
	    CoreService.prototype.readersCardsUnavailable = function (callback) { this.connection.get(this.url + CORE_READERS, callback, cardInsertedFilter(false)); };
	    CoreService.prototype.reader = function (reader_id, callback) { this.connection.get(this.url + CORE_READERS + "/" + reader_id, callback); };
	    CoreService.prototype.plugins = function (callback) { this.connection.get(this.url + CORE_PLUGINS, callback); };
	    CoreService.prototype.activate = function (callback) { this.connection.post(this.url + CORE_ACTIVATE, {}, callback); };
	    CoreService.prototype.getPubKey = function (callback) { this.connection.get(this.url + CORE_PUB_KEY, callback); };
	    CoreService.prototype.setPubKey = function (pubkey, callback) {
	        var req = {};
	        req.certificate = pubkey;
	        this.connection.put(this.url + CORE_PUB_KEY, req, callback);
	    };
	    CoreService.prototype.infoBrowser = function (callback) {
	        callback(null, this.platformInfo());
	    };
	    CoreService.prototype.pollCardInserted = function (secondsToPollCard, callback, connectReaderCb, insertCardCb, cardTimeoutCb) {
	        var maxSeconds = secondsToPollCard;
	        var self = this;
	        console.debug("start poll cards");
	        cardTimeout(callback, cardTimeoutCb, connectReaderCb, insertCardCb);
	        function cardTimeout(cb, rtcb, crcb, iccb) {
	            var selfTimeout = this;
	            setTimeout(function () {
	                console.debug("seconds left:", maxSeconds);
	                --maxSeconds;
	                self.readers(function (error, data) {
	                    if (error) {
	                        console.debug("Waiting...");
	                        crcb();
	                        cardTimeout(cb, rtcb, crcb, iccb);
	                    }
	                    ;
	                    if (maxSeconds == 0) {
	                        return rtcb();
	                    }
	                    else if (data.data.length === 0) {
	                        console.debug("Waiting...");
	                        crcb();
	                        cardTimeout(cb, rtcb, crcb, iccb);
	                    }
	                    else {
	                        var readerWithCard = self.checkReadersForCardObject(data.data);
	                        if (readerWithCard != null) {
	                            console.debug("card found: " + JSON.stringify(readerWithCard));
	                            return cb(null, readerWithCard);
	                        }
	                        else {
	                            iccb();
	                            cardTimeout(cb, rtcb, crcb, iccb);
	                        }
	                    }
	                });
	            }, 1000);
	        }
	        ;
	    };
	    CoreService.prototype.checkReadersForCardObject = function (readers) {
	        if (readers && readers.length > 0) {
	            for (var i in readers) {
	                if (readers[i].card)
	                    return readers[i];
	            }
	        }
	        else
	            return null;
	    };
	    CoreService.prototype.pollReaders = function (secondsToPollReader, callback, connectReaderCb, readerTimeoutCb) {
	        var maxSeconds = secondsToPollReader;
	        var self = this;
	        console.debug("start poll readers");
	        readerTimeout(callback, readerTimeoutCb, connectReaderCb);
	        function readerTimeout(cb, rtcb, crcb) {
	            var selfTimeout = this;
	            setTimeout(function () {
	                console.debug("seconds left:", maxSeconds);
	                --maxSeconds;
	                self.readers(function (error, data) {
	                    if (error) {
	                        console.debug("Waiting...");
	                        crcb();
	                        readerTimeout(cb, rtcb, crcb);
	                    }
	                    ;
	                    if (maxSeconds == 0) {
	                        return rtcb();
	                    }
	                    else if (data.data.length === 0) {
	                        console.debug("Waiting...");
	                        crcb();
	                        readerTimeout(cb, rtcb, crcb);
	                    }
	                    else {
	                        console.debug("readerCount:", data.data.length);
	                        return cb(null, data);
	                    }
	                });
	            }, 1000);
	        }
	        ;
	    };
	    CoreService.prototype.infoBrowserSync = function () { return this.platformInfo(); };
	    CoreService.prototype.getUrl = function () { return this.url; };
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
	    CoreService.prototype.version = function () {
	        return 'v1.0.2';
	    };
	    return CoreService;
	}());
	exports.CoreService = CoreService;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*!
	 * Platform.js v1.3.1 <http://mths.be/platform>
	 * Copyright 2014-2016 Benjamin Tan <https://d10.github.io/>
	 * Copyright 2011-2013 John-David Dalton <http://allyoucanleet.com/>
	 * Available under MIT license <http://mths.be/mit>
	 */
	;(function() {
	  'use strict';
	
	  /** Used to determine if values are of the language type `Object` */
	  var objectTypes = {
	    'function': true,
	    'object': true
	  };
	
	  /** Used as a reference to the global object */
	  var root = (objectTypes[typeof window] && window) || this;
	
	  /** Backup possible global object */
	  var oldRoot = root;
	
	  /** Detect free variable `exports` */
	  var freeExports = objectTypes[typeof exports] && exports;
	
	  /** Detect free variable `module` */
	  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
	
	  /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
	  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;
	  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
	    root = freeGlobal;
	  }
	
	  /**
	   * Used as the maximum length of an array-like object.
	   * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
	   * for more details.
	   */
	  var maxSafeInteger = Math.pow(2, 53) - 1;
	
	  /** Opera regexp */
	  var reOpera = /\bOpera/;
	
	  /** Possible global object */
	  var thisBinding = this;
	
	  /** Used for native method references */
	  var objectProto = Object.prototype;
	
	  /** Used to check for own properties of an object */
	  var hasOwnProperty = objectProto.hasOwnProperty;
	
	  /** Used to resolve the internal `[[Class]]` of values */
	  var toString = objectProto.toString;
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * Capitalizes a string value.
	   *
	   * @private
	   * @param {string} string The string to capitalize.
	   * @returns {string} The capitalized string.
	   */
	  function capitalize(string) {
	    string = String(string);
	    return string.charAt(0).toUpperCase() + string.slice(1);
	  }
	
	  /**
	   * A utility function to clean up the OS name.
	   *
	   * @private
	   * @param {string} os The OS name to clean up.
	   * @param {string} [pattern] A `RegExp` pattern matching the OS name.
	   * @param {string} [label] A label for the OS.
	   */
	  function cleanupOS(os, pattern, label) {
	    // platform tokens defined at
	    // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
	    // http://web.archive.org/web/20081122053950/http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
	    var data = {
	      '6.4':  '10',
	      '6.3':  '8.1',
	      '6.2':  '8',
	      '6.1':  'Server 2008 R2 / 7',
	      '6.0':  'Server 2008 / Vista',
	      '5.2':  'Server 2003 / XP 64-bit',
	      '5.1':  'XP',
	      '5.01': '2000 SP1',
	      '5.0':  '2000',
	      '4.0':  'NT',
	      '4.90': 'ME'
	    };
	    // detect Windows version from platform tokens
	    if (pattern && label && /^Win/i.test(os) &&
	        (data = data[0/*Opera 9.25 fix*/, /[\d.]+$/.exec(os)])) {
	      os = 'Windows ' + data;
	    }
	    // correct character case and cleanup
	    os = String(os);
	
	    if (pattern && label) {
	      os = os.replace(RegExp(pattern, 'i'), label);
	    }
	
	    os = format(
	      os.replace(/ ce$/i, ' CE')
	        .replace(/\bhpw/i, 'web')
	        .replace(/\bMacintosh\b/, 'Mac OS')
	        .replace(/_PowerPC\b/i, ' OS')
	        .replace(/\b(OS X) [^ \d]+/i, '$1')
	        .replace(/\bMac (OS X)\b/, '$1')
	        .replace(/\/(\d)/, ' $1')
	        .replace(/_/g, '.')
	        .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
	        .replace(/\bx86\.64\b/gi, 'x86_64')
	        .replace(/\b(Windows Phone) OS\b/, '$1')
	        .split(' on ')[0]
	    );
	
	    return os;
	  }
	
	  /**
	   * An iteration utility for arrays and objects.
	   *
	   * @private
	   * @param {Array|Object} object The object to iterate over.
	   * @param {Function} callback The function called per iteration.
	   */
	  function each(object, callback) {
	    var index = -1,
	        length = object ? object.length : 0;
	
	    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
	      while (++index < length) {
	        callback(object[index], index, object);
	      }
	    } else {
	      forOwn(object, callback);
	    }
	  }
	
	  /**
	   * Trim and conditionally capitalize string values.
	   *
	   * @private
	   * @param {string} string The string to format.
	   * @returns {string} The formatted string.
	   */
	  function format(string) {
	    string = trim(string);
	    return /^(?:webOS|i(?:OS|P))/.test(string)
	      ? string
	      : capitalize(string);
	  }
	
	  /**
	   * Iterates over an object's own properties, executing the `callback` for each.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} callback The function executed per own property.
	   */
	  function forOwn(object, callback) {
	    for (var key in object) {
	      if (hasOwnProperty.call(object, key)) {
	        callback(object[key], key, object);
	      }
	    }
	  }
	
	  /**
	   * Gets the internal `[[Class]]` of a value.
	   *
	   * @private
	   * @param {*} value The value.
	   * @returns {string} The `[[Class]]`.
	   */
	  function getClassOf(value) {
	    return value == null
	      ? capitalize(value)
	      : toString.call(value).slice(8, -1);
	  }
	
	  /**
	   * Host objects can return type values that are different from their actual
	   * data type. The objects we are concerned with usually return non-primitive
	   * types of "object", "function", or "unknown".
	   *
	   * @private
	   * @param {*} object The owner of the property.
	   * @param {string} property The property to check.
	   * @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.
	   */
	  function isHostType(object, property) {
	    var type = object != null ? typeof object[property] : 'number';
	    return !/^(?:boolean|number|string|undefined)$/.test(type) &&
	      (type == 'object' ? !!object[property] : true);
	  }
	
	  /**
	   * Prepares a string for use in a `RegExp` by making hyphens and spaces optional.
	   *
	   * @private
	   * @param {string} string The string to qualify.
	   * @returns {string} The qualified string.
	   */
	  function qualify(string) {
	    return String(string).replace(/([ -])(?!$)/g, '$1?');
	  }
	
	  /**
	   * A bare-bones `Array#reduce` like utility function.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} callback The function called per iteration.
	   * @returns {*} The accumulated result.
	   */
	  function reduce(array, callback) {
	    var accumulator = null;
	    each(array, function(value, index) {
	      accumulator = callback(accumulator, value, index, array);
	    });
	    return accumulator;
	  }
	
	  /**
	   * Removes leading and trailing whitespace from a string.
	   *
	   * @private
	   * @param {string} string The string to trim.
	   * @returns {string} The trimmed string.
	   */
	  function trim(string) {
	    return String(string).replace(/^ +| +$/g, '');
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * Creates a new platform object.
	   *
	   * @memberOf platform
	   * @param {Object|string} [ua=navigator.userAgent] The user agent string or
	   *  context object.
	   * @returns {Object} A platform object.
	   */
	  function parse(ua) {
	
	    /** The environment context object */
	    var context = root;
	
	    /** Used to flag when a custom context is provided */
	    var isCustomContext = ua && typeof ua == 'object' && getClassOf(ua) != 'String';
	
	    // juggle arguments
	    if (isCustomContext) {
	      context = ua;
	      ua = null;
	    }
	
	    /** Browser navigator object */
	    var nav = context.navigator || {};
	
	    /** Browser user agent string */
	    var userAgent = nav.userAgent || '';
	
	    ua || (ua = userAgent);
	
	    /** Used to flag when `thisBinding` is the [ModuleScope] */
	    var isModuleScope = isCustomContext || thisBinding == oldRoot;
	
	    /** Used to detect if browser is like Chrome */
	    var likeChrome = isCustomContext
	      ? !!nav.likeChrome
	      : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());
	
	    /** Internal `[[Class]]` value shortcuts */
	    var objectClass = 'Object',
	        airRuntimeClass = isCustomContext ? objectClass : 'ScriptBridgingProxyObject',
	        enviroClass = isCustomContext ? objectClass : 'Environment',
	        javaClass = (isCustomContext && context.java) ? 'JavaPackage' : getClassOf(context.java),
	        phantomClass = isCustomContext ? objectClass : 'RuntimeObject';
	
	    /** Detect Java environment */
	    var java = /\bJava/.test(javaClass) && context.java;
	
	    /** Detect Rhino */
	    var rhino = java && getClassOf(context.environment) == enviroClass;
	
	    /** A character to represent alpha */
	    var alpha = java ? 'a' : '\u03b1';
	
	    /** A character to represent beta */
	    var beta = java ? 'b' : '\u03b2';
	
	    /** Browser document object */
	    var doc = context.document || {};
	
	    /**
	     * Detect Opera browser (Presto-based)
	     * http://www.howtocreate.co.uk/operaStuff/operaObject.html
	     * http://dev.opera.com/articles/view/opera-mini-web-content-authoring-guidelines/#operamini
	     */
	    var opera = context.operamini || context.opera;
	
	    /** Opera `[[Class]]` */
	    var operaClass = reOpera.test(operaClass = (isCustomContext && opera) ? opera['[[Class]]'] : getClassOf(opera))
	      ? operaClass
	      : (opera = null);
	
	    /*------------------------------------------------------------------------*/
	
	    /** Temporary variable used over the script's lifetime */
	    var data;
	
	    /** The CPU architecture */
	    var arch = ua;
	
	    /** Platform description array */
	    var description = [];
	
	    /** Platform alpha/beta indicator */
	    var prerelease = null;
	
	    /** A flag to indicate that environment features should be used to resolve the platform */
	    var useFeatures = ua == userAgent;
	
	    /** The browser/environment version */
	    var version = useFeatures && opera && typeof opera.version == 'function' && opera.version();
	
	    /** A flag to indicate if the OS ends with "/ Version" */
	    var isSpecialCasedOS;
	
	    /* Detectable layout engines (order is important) */
	    var layout = getLayout([
	      'Trident',
	      { 'label': 'WebKit', 'pattern': 'AppleWebKit' },
	      'iCab',
	      'Presto',
	      'NetFront',
	      'Tasman',
	      'KHTML',
	      'Gecko'
	    ]);
	
	    /* Detectable browser names (order is important) */
	    var name = getName([
	      'Adobe AIR',
	      'Arora',
	      'Avant Browser',
	      'Breach',
	      'Camino',
	      'Epiphany',
	      'Fennec',
	      'Flock',
	      'Galeon',
	      'GreenBrowser',
	      'iCab',
	      'Iceweasel',
	      { 'label': 'SRWare Iron', 'pattern': 'Iron' },
	      'K-Meleon',
	      'Konqueror',
	      'Lunascape',
	      'Maxthon',
	      'Midori',
	      'Nook Browser',
	      'PhantomJS',
	      'Raven',
	      'Rekonq',
	      'RockMelt',
	      'SeaMonkey',
	      { 'label': 'Silk', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
	      'Sleipnir',
	      'SlimBrowser',
	      'Sunrise',
	      'Swiftfox',
	      'WebPositive',
	      'Opera Mini',
	      { 'label': 'Opera Mini', 'pattern': 'OPiOS' },
	      'Opera',
	      { 'label': 'Opera', 'pattern': 'OPR' },
	      'Chrome',
	      { 'label': 'Chrome Mobile', 'pattern': '(?:CriOS|CrMo)' },
	      { 'label': 'Firefox', 'pattern': '(?:Firefox|Minefield)' },
	      { 'label': 'IE', 'pattern': 'IEMobile' },
	      { 'label': 'IE', 'pattern': 'MSIE' },
	      'Safari'
	    ]);
	
	    /* Detectable products (order is important) */
	    var product = getProduct([
	      { 'label': 'BlackBerry', 'pattern': 'BB10' },
	      'BlackBerry',
	      { 'label': 'Galaxy S', 'pattern': 'GT-I9000' },
	      { 'label': 'Galaxy S2', 'pattern': 'GT-I9100' },
	      { 'label': 'Galaxy S3', 'pattern': 'GT-I9300' },
	      { 'label': 'Galaxy S4', 'pattern': 'GT-I9500' },
	      'Google TV',
	      'Lumia',
	      'iPad',
	      'iPod',
	      'iPhone',
	      'Kindle',
	      { 'label': 'Kindle Fire', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
	      'Nook',
	      'PlayBook',
	      'PlayStation 4',
	      'PlayStation 3',
	      'PlayStation Vita',
	      'TouchPad',
	      'Transformer',
	      { 'label': 'Wii U', 'pattern': 'WiiU' },
	      'Wii',
	      'Xbox One',
	      { 'label': 'Xbox 360', 'pattern': 'Xbox' },
	      'Xoom'
	    ]);
	
	    /* Detectable manufacturers */
	    var manufacturer = getManufacturer({
	      'Apple': { 'iPad': 1, 'iPhone': 1, 'iPod': 1 },
	      'Amazon': { 'Kindle': 1, 'Kindle Fire': 1 },
	      'Asus': { 'Transformer': 1 },
	      'Barnes & Noble': { 'Nook': 1 },
	      'BlackBerry': { 'PlayBook': 1 },
	      'Google': { 'Google TV': 1 },
	      'HP': { 'TouchPad': 1 },
	      'HTC': {},
	      'LG': {},
	      'Microsoft': { 'Xbox': 1, 'Xbox One': 1 },
	      'Motorola': { 'Xoom': 1 },
	      'Nintendo': { 'Wii U': 1,  'Wii': 1 },
	      'Nokia': { 'Lumia': 1 },
	      'Samsung': { 'Galaxy S': 1, 'Galaxy S2': 1, 'Galaxy S3': 1, 'Galaxy S4': 1 },
	      'Sony': { 'PlayStation 4': 1, 'PlayStation 3': 1, 'PlayStation Vita': 1 }
	    });
	
	    /* Detectable OSes (order is important) */
	    var os = getOS([
	      'Windows Phone ',
	      'Android',
	      'CentOS',
	      'Debian',
	      'Fedora',
	      'FreeBSD',
	      'Gentoo',
	      'Haiku',
	      'Kubuntu',
	      'Linux Mint',
	      'Red Hat',
	      'SuSE',
	      'Ubuntu',
	      'Xubuntu',
	      'Cygwin',
	      'Symbian OS',
	      'hpwOS',
	      'webOS ',
	      'webOS',
	      'Tablet OS',
	      'Linux',
	      'Mac OS X',
	      'Macintosh',
	      'Mac',
	      'Windows 98;',
	      'Windows '
	    ]);
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * Picks the layout engine from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An array of guesses.
	     * @returns {null|string} The detected layout engine.
	     */
	    function getLayout(guesses) {
	      return reduce(guesses, function(result, guess) {
	        return result || RegExp('\\b' + (
	          guess.pattern || qualify(guess)
	        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
	      });
	    }
	
	    /**
	     * Picks the manufacturer from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An object of guesses.
	     * @returns {null|string} The detected manufacturer.
	     */
	    function getManufacturer(guesses) {
	      return reduce(guesses, function(result, value, key) {
	        // lookup the manufacturer by product or scan the UA for the manufacturer
	        return result || (
	          value[product] ||
	          value[0/*Opera 9.25 fix*/, /^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] ||
	          RegExp('\\b' + qualify(key) + '(?:\\b|\\w*\\d)', 'i').exec(ua)
	        ) && key;
	      });
	    }
	
	    /**
	     * Picks the browser name from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An array of guesses.
	     * @returns {null|string} The detected browser name.
	     */
	    function getName(guesses) {
	      return reduce(guesses, function(result, guess) {
	        return result || RegExp('\\b' + (
	          guess.pattern || qualify(guess)
	        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
	      });
	    }
	
	    /**
	     * Picks the OS name from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An array of guesses.
	     * @returns {null|string} The detected OS name.
	     */
	    function getOS(guesses) {
	      return reduce(guesses, function(result, guess) {
	        var pattern = guess.pattern || qualify(guess);
	        if (!result && (result =
	              RegExp('\\b' + pattern + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(ua)
	            )) {
	          result = cleanupOS(result, pattern, guess.label || guess);
	        }
	        return result;
	      });
	    }
	
	    /**
	     * Picks the product name from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An array of guesses.
	     * @returns {null|string} The detected product name.
	     */
	    function getProduct(guesses) {
	      return reduce(guesses, function(result, guess) {
	        var pattern = guess.pattern || qualify(guess);
	        if (!result && (result =
	              RegExp('\\b' + pattern + ' *\\d+[.\\w_]*', 'i').exec(ua) ||
	              RegExp('\\b' + pattern + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(ua)
	            )) {
	          // split by forward slash and append product version if needed
	          if ((result = String((guess.label && !RegExp(pattern, 'i').test(guess.label)) ? guess.label : result).split('/'))[1] && !/[\d.]+/.test(result[0])) {
	            result[0] += ' ' + result[1];
	          }
	          // correct character case and cleanup
	          guess = guess.label || guess;
	          result = format(result[0]
	            .replace(RegExp(pattern, 'i'), guess)
	            .replace(RegExp('; *(?:' + guess + '[_-])?', 'i'), ' ')
	            .replace(RegExp('(' + guess + ')[-_.]?(\\w)', 'i'), '$1 $2'));
	        }
	        return result;
	      });
	    }
	
	    /**
	     * Resolves the version using an array of UA patterns.
	     *
	     * @private
	     * @param {Array} patterns An array of UA patterns.
	     * @returns {null|string} The detected version.
	     */
	    function getVersion(patterns) {
	      return reduce(patterns, function(result, pattern) {
	        return result || (RegExp(pattern +
	          '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)', 'i').exec(ua) || 0)[1] || null;
	      });
	    }
	
	    /**
	     * Returns `platform.description` when the platform object is coerced to a string.
	     *
	     * @name toString
	     * @memberOf platform
	     * @returns {string} Returns `platform.description` if available, else an empty string.
	     */
	    function toStringPlatform() {
	      return this.description || '';
	    }
	
	    /*------------------------------------------------------------------------*/
	
	    // convert layout to an array so we can add extra details
	    layout && (layout = [layout]);
	
	    // detect product names that contain their manufacturer's name
	    if (manufacturer && !product) {
	      product = getProduct([manufacturer]);
	    }
	    // clean up Google TV
	    if ((data = /\bGoogle TV\b/.exec(product))) {
	      product = data[0];
	    }
	    // detect simulators
	    if (/\bSimulator\b/i.test(ua)) {
	      product = (product ? product + ' ' : '') + 'Simulator';
	    }
	    // detect Opera Mini 8+ running in Turbo/Uncompressed mode on iOS
	    if (name == 'Opera Mini' && /\bOPiOS\b/.test(ua)) {
	      description.push('running in Turbo/Uncompressed mode');
	    }
	    // detect iOS
	    if (/^iP/.test(product)) {
	      name || (name = 'Safari');
	      os = 'iOS' + ((data = / OS ([\d_]+)/i.exec(ua))
	        ? ' ' + data[1].replace(/_/g, '.')
	        : '');
	    }
	    // detect Kubuntu
	    else if (name == 'Konqueror' && !/buntu/i.test(os)) {
	      os = 'Kubuntu';
	    }
	    // detect Android browsers
	    else if (manufacturer && manufacturer != 'Google' &&
	        ((/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua)) || /\bVita\b/.test(product))) {
	      name = 'Android Browser';
	      os = /\bAndroid\b/.test(os) ? os : 'Android';
	    }
	    // detect false positives for Firefox/Safari
	    else if (!name || (data = !/\bMinefield\b|\(Android;/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
	      // escape the `/` for Firefox 1
	      if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + '/') + 8))) {
	        // clear name of false positives
	        name = null;
	      }
	      // reassign a generic name
	      if ((data = product || manufacturer || os) &&
	          (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
	        name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + ' Browser';
	      }
	    }
	    // detect Firefox OS
	    if ((data = /\((Mobile|Tablet).*?Firefox\b/i.exec(ua)) && data[1]) {
	      os = 'Firefox OS';
	      if (!product) {
	        product = data[1];
	      }
	    }
	    // detect non-Opera versions (order is important)
	    if (!version) {
	      version = getVersion([
	        '(?:Cloud9|CriOS|CrMo|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|Silk(?!/[\\d.]+$))',
	        'Version',
	        qualify(name),
	        '(?:Firefox|Minefield|NetFront)'
	      ]);
	    }
	    // detect stubborn layout engines
	    if (layout == 'iCab' && parseFloat(version) > 3) {
	      layout = ['WebKit'];
	    } else if (
	        layout != 'Trident' &&
	        (data =
	          /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? 'Blink' : 'Presto') ||
	          /\b(?:Midori|Nook|Safari)\b/i.test(ua) && 'WebKit' ||
	          !layout && /\bMSIE\b/i.test(ua) && (os == 'Mac OS' ? 'Tasman' : 'Trident')
	        )
	    ) {
	      layout = [data];
	    }
	    // detect NetFront on PlayStation
	    else if (/\bPlayStation\b(?! Vita\b)/i.test(name) && layout == 'WebKit') {
	      layout = ['NetFront'];
	    }
	    // detect Windows Phone 7 desktop mode
	    if (name == 'IE' && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
	      name += ' Mobile';
	      os = 'Windows Phone ' + (/\+$/.test(data) ? data : data + '.x');
	      description.unshift('desktop mode');
	    }
	    // detect Windows Phone 8+ desktop mode
	    else if (/\bWPDesktop\b/i.test(ua)) {
	      name = 'IE Mobile';
	      os = 'Windows Phone 8+';
	      description.unshift('desktop mode');
	      version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
	    }
	    // detect IE 11 and above
	    else if (name != 'IE' && layout == 'Trident' && (data = /\brv:([\d.]+)/.exec(ua))) {
	      if (!/\bWPDesktop\b/i.test(ua)) {
	        if (name) {
	          description.push('identifying as ' + name + (version ? ' ' + version : ''));
	        }
	        name = 'IE';
	      }
	      version = data[1];
	    }
	    // detect Microsoft Edge
	    else if ((name == 'Chrome' || name != 'IE') && (data = /\bEdge\/([\d.]+)/.exec(ua))) {
	      name = 'Microsoft Edge';
	      version = data[1];
	      layout = ['Trident'];
	    }
	    // leverage environment features
	    if (useFeatures) {
	      // detect server-side environments
	      // Rhino has a global function while others have a global object
	      if (isHostType(context, 'global')) {
	        if (java) {
	          data = java.lang.System;
	          arch = data.getProperty('os.arch');
	          os = os || data.getProperty('os.name') + ' ' + data.getProperty('os.version');
	        }
	        if (isModuleScope && isHostType(context, 'system') && (data = [context.system])[0]) {
	          os || (os = data[0].os || null);
	          try {
	            data[1] = context.require('ringo/engine').version;
	            version = data[1].join('.');
	            name = 'RingoJS';
	          } catch(e) {
	            if (data[0].global.system == context.system) {
	              name = 'Narwhal';
	            }
	          }
	        }
	        else if (typeof context.process == 'object' && (data = context.process)) {
	          name = 'Node.js';
	          arch = data.arch;
	          os = data.platform;
	          version = /[\d.]+/.exec(data.version)[0];
	        }
	        else if (rhino) {
	          name = 'Rhino';
	        }
	      }
	      // detect Adobe AIR
	      else if (getClassOf((data = context.runtime)) == airRuntimeClass) {
	        name = 'Adobe AIR';
	        os = data.flash.system.Capabilities.os;
	      }
	      // detect PhantomJS
	      else if (getClassOf((data = context.phantom)) == phantomClass) {
	        name = 'PhantomJS';
	        version = (data = data.version || null) && (data.major + '.' + data.minor + '.' + data.patch);
	      }
	      // detect IE compatibility modes
	      else if (typeof doc.documentMode == 'number' && (data = /\bTrident\/(\d+)/i.exec(ua))) {
	        // we're in compatibility mode when the Trident version + 4 doesn't
	        // equal the document mode
	        version = [version, doc.documentMode];
	        if ((data = +data[1] + 4) != version[1]) {
	          description.push('IE ' + version[1] + ' mode');
	          layout && (layout[1] = '');
	          version[1] = data;
	        }
	        version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];
	      }
	      os = os && format(os);
	    }
	    // detect prerelease phases
	    if (version && (data =
	          /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) ||
	          /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ';' + (useFeatures && nav.appMinorVersion)) ||
	          /\bMinefield\b/i.test(ua) && 'a'
	        )) {
	      prerelease = /b/i.test(data) ? 'beta' : 'alpha';
	      version = version.replace(RegExp(data + '\\+?$'), '') +
	        (prerelease == 'beta' ? beta : alpha) + (/\d+\+?/.exec(data) || '');
	    }
	    // detect Firefox Mobile
	    if (name == 'Fennec' || name == 'Firefox' && /\b(?:Android|Firefox OS)\b/.test(os)) {
	      name = 'Firefox Mobile';
	    }
	    // obscure Maxthon's unreliable version
	    else if (name == 'Maxthon' && version) {
	      version = version.replace(/\.[\d.]+/, '.x');
	    }
	    // detect Silk desktop/accelerated modes
	    else if (name == 'Silk') {
	      if (!/\bMobi/i.test(ua)) {
	        os = 'Android';
	        description.unshift('desktop mode');
	      }
	      if (/Accelerated *= *true/i.test(ua)) {
	        description.unshift('accelerated');
	      }
	    }
	    // detect Xbox 360 and Xbox One
	    else if (/\bXbox\b/i.test(product)) {
	      os = null;
	      if (product == 'Xbox 360' && /\bIEMobile\b/.test(ua)) {
	        description.unshift('mobile mode');
	      }
	    }
	    // add mobile postfix
	    else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) &&
	        (os == 'Windows CE' || /Mobi/i.test(ua))) {
	      name += ' Mobile';
	    }
	    // detect IE platform preview
	    else if (name == 'IE' && useFeatures && context.external === null) {
	      description.unshift('platform preview');
	    }
	    // detect BlackBerry OS version
	    // http://docs.blackberry.com/en/developers/deliverables/18169/HTTP_headers_sent_by_BB_Browser_1234911_11.jsp
	    else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data =
	          (RegExp(product.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(ua) || 0)[1] ||
	          version
	        )) {
	      data = [data, /BB10/.test(ua)];
	      os = (data[1] ? (product = null, manufacturer = 'BlackBerry') : 'Device Software') + ' ' + data[0];
	      version = null;
	    }
	    // detect Opera identifying/masking itself as another browser
	    // http://www.opera.com/support/kb/view/843/
	    else if (this != forOwn && (
	          product != 'Wii' && (
	            (useFeatures && opera) ||
	            (/Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua)) ||
	            (name == 'Firefox' && /\bOS X (?:\d+\.){2,}/.test(os)) ||
	            (name == 'IE' && (
	              (os && !/^Win/.test(os) && version > 5.5) ||
	              /\bWindows XP\b/.test(os) && version > 8 ||
	              version == 8 && !/\bTrident\b/.test(ua)
	            ))
	          )
	        ) && !reOpera.test((data = parse.call(forOwn, ua.replace(reOpera, '') + ';'))) && data.name) {
	
	      // when "indentifying", the UA contains both Opera and the other browser's name
	      data = 'ing as ' + data.name + ((data = data.version) ? ' ' + data : '');
	      if (reOpera.test(name)) {
	        if (/\bIE\b/.test(data) && os == 'Mac OS') {
	          os = null;
	        }
	        data = 'identify' + data;
	      }
	      // when "masking", the UA contains only the other browser's name
	      else {
	        data = 'mask' + data;
	        if (operaClass) {
	          name = format(operaClass.replace(/([a-z])([A-Z])/g, '$1 $2'));
	        } else {
	          name = 'Opera';
	        }
	        if (/\bIE\b/.test(data)) {
	          os = null;
	        }
	        if (!useFeatures) {
	          version = null;
	        }
	      }
	      layout = ['Presto'];
	      description.push(data);
	    }
	    // detect WebKit Nightly and approximate Chrome/Safari versions
	    if ((data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
	      // correct build for numeric comparison
	      // (e.g. "532.5" becomes "532.05")
	      data = [parseFloat(data.replace(/\.(\d)$/, '.0$1')), data];
	      // nightly builds are postfixed with a `+`
	      if (name == 'Safari' && data[1].slice(-1) == '+') {
	        name = 'WebKit Nightly';
	        prerelease = 'alpha';
	        version = data[1].slice(0, -1);
	      }
	      // clear incorrect browser versions
	      else if (version == data[1] ||
	          version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
	        version = null;
	      }
	      // use the full Chrome version when available
	      data[1] = (/\bChrome\/([\d.]+)/i.exec(ua) || 0)[1];
	      // detect Blink layout engine
	      if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && name != 'IE' && name != 'Microsoft Edge') {
	        layout = ['Blink'];
	      }
	      // detect JavaScriptCore
	      // http://stackoverflow.com/questions/6768474/how-can-i-detect-which-javascript-engine-v8-or-jsc-is-used-at-runtime-in-androi
	      if (!useFeatures || (!likeChrome && !data[1])) {
	        layout && (layout[1] = 'like Safari');
	        data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? '4+' : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : '8');
	      } else {
	        layout && (layout[1] = 'like Chrome');
	        data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.10 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.30 ? 11 : data < 535.01 ? 12 : data < 535.02 ? '13+' : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.10 ? 19 : data < 537.01 ? 20 : data < 537.11 ? '21+' : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != 'Blink' ? '27' : '28');
	      }
	      // add the postfix of ".x" or "+" for approximate versions
	      layout && (layout[1] += ' ' + (data += typeof data == 'number' ? '.x' : /[.+]/.test(data) ? '' : '+'));
	      // obscure version for some Safari 1-2 releases
	      if (name == 'Safari' && (!version || parseInt(version) > 45)) {
	        version = data;
	      }
	    }
	    // detect Opera desktop modes
	    if (name == 'Opera' &&  (data = /\bzbov|zvav$/.exec(os))) {
	      name += ' ';
	      description.unshift('desktop mode');
	      if (data == 'zvav') {
	        name += 'Mini';
	        version = null;
	      } else {
	        name += 'Mobile';
	      }
	      os = os.replace(RegExp(' *' + data + '$'), '');
	    }
	    // detect Chrome desktop mode
	    else if (name == 'Safari' && /\bChrome\b/.exec(layout && layout[1])) {
	      description.unshift('desktop mode');
	      name = 'Chrome Mobile';
	      version = null;
	
	      if (/\bOS X\b/.test(os)) {
	        manufacturer = 'Apple';
	        os = 'iOS 4.3+';
	      } else {
	        os = null;
	      }
	    }
	    // strip incorrect OS versions
	    if (version && version.indexOf((data = /[\d.]+$/.exec(os))) == 0 &&
	        ua.indexOf('/' + data + '-') > -1) {
	      os = trim(os.replace(data, ''));
	    }
	    // add layout engine
	    if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (
	        /Browser|Lunascape|Maxthon/.test(name) ||
	        /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Sleipnir|Web)/.test(name) && layout[1])) {
	      // don't add layout details to description if they are falsey
	      (data = layout[layout.length - 1]) && description.push(data);
	    }
	    // combine contextual information
	    if (description.length) {
	      description = ['(' + description.join('; ') + ')'];
	    }
	    // append manufacturer
	    if (manufacturer && product && product.indexOf(manufacturer) < 0) {
	      description.push('on ' + manufacturer);
	    }
	    // append product
	    if (product) {
	      description.push((/^on /.test(description[description.length -1]) ? '' : 'on ') + product);
	    }
	    // parse OS into an object
	    if (os) {
	      data = / ([\d.+]+)$/.exec(os);
	      isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == '/';
	      os = {
	        'architecture': 32,
	        'family': (data && !isSpecialCasedOS) ? os.replace(data[0], '') : os,
	        'version': data ? data[1] : null,
	        'toString': function() {
	          var version = this.version;
	          return this.family + ((version && !isSpecialCasedOS) ? ' ' + version : '') + (this.architecture == 64 ? ' 64-bit' : '');
	        }
	      };
	    }
	    // add browser/OS architecture
	    if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
	      if (os) {
	        os.architecture = 64;
	        os.family = os.family.replace(RegExp(' *' + data), '');
	      }
	      if (
	          name && (/\bWOW64\b/i.test(ua) ||
	          (useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua)))
	      ) {
	        description.unshift('32-bit');
	      }
	    }
	
	    ua || (ua = null);
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * The platform object.
	     *
	     * @name platform
	     * @type Object
	     */
	    var platform = {};
	
	    /**
	     * The platform description.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.description = ua;
	
	    /**
	     * The name of the browser's layout engine.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.layout = layout && layout[0];
	
	    /**
	     * The name of the product's manufacturer.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.manufacturer = manufacturer;
	
	    /**
	     * The name of the browser/environment.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.name = name;
	
	    /**
	     * The alpha/beta release indicator.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.prerelease = prerelease;
	
	    /**
	     * The name of the product hosting the browser.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.product = product;
	
	    /**
	     * The browser's user agent string.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.ua = ua;
	
	    /**
	     * The browser/environment version.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.version = name && version;
	
	    /**
	     * The name of the operating system.
	     *
	     * @memberOf platform
	     * @type Object
	     */
	    platform.os = os || {
	
	      /**
	       * The CPU architecture the OS is built for.
	       *
	       * @memberOf platform.os
	       * @type number|null
	       */
	      'architecture': null,
	
	      /**
	       * The family of the OS.
	       *
	       * Common values include:
	       * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
	       * "Windows XP", "OS X", "Ubuntu", "Debian", "Fedora", "Red Hat", "SuSE",
	       * "Android", "iOS" and "Windows Phone"
	       *
	       * @memberOf platform.os
	       * @type string|null
	       */
	      'family': null,
	
	      /**
	       * The version of the OS.
	       *
	       * @memberOf platform.os
	       * @type string|null
	       */
	      'version': null,
	
	      /**
	       * Returns the OS string.
	       *
	       * @memberOf platform.os
	       * @returns {string} The OS string.
	       */
	      'toString': function() { return 'null'; }
	    };
	
	    platform.parse = parse;
	    platform.toString = toStringPlatform;
	
	    if (platform.version) {
	      description.unshift(version);
	    }
	    if (platform.name) {
	      description.unshift(name);
	    }
	    if (os && name && !(os == String(os).split(' ')[0] && (os == name.split(' ')[0] || product))) {
	      description.push(product ? '(' + os + ')' : 'on ' + os);
	    }
	    if (description.length) {
	      platform.description = description.join(' ');
	    }
	    return platform;
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  // export platform
	  // some AMD build optimizers, like r.js, check for condition patterns like the following:
	  if (true) {
	    // define as an anonymous module so, through path mapping, it can be aliased
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return parse();
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  // check for `exports` after `define` in case a build optimizer adds an `exports` object
	  else if (freeExports && freeModule) {
	    // in Narwhal, Node.js, Rhino -require, or RingoJS
	    forOwn(parse(), function(value, key) {
	      freeExports[key] = value;
	    });
	  }
	  // in a browser or Rhino
	  else {
	    root.platform = parse();
	  }
	}.call(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module), (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var axios_1 = __webpack_require__(10);
	var LocalAuthConnection = (function () {
	    function LocalAuthConnection(cfg) {
	        this.cfg = cfg;
	    }
	    LocalAuthConnection.prototype.get = function (url, callback, queryParams) {
	        return handleRequest(url, 'GET', callback, undefined, queryParams, undefined, this.cfg.jwt);
	    };
	    LocalAuthConnection.prototype.post = function (url, body, callback) {
	        return handleRequest(url, 'POST', callback, body, undefined, undefined, this.cfg.jwt);
	    };
	    LocalAuthConnection.prototype.put = function (url, body, callback) {
	        return handleRequest(url, 'PUT', callback, body, undefined, undefined, this.cfg.jwt);
	    };
	    return LocalAuthConnection;
	}());
	exports.LocalAuthConnection = LocalAuthConnection;
	var LocalConnection = (function () {
	    function LocalConnection(cfg) {
	        this.cfg = cfg;
	    }
	    LocalConnection.prototype.get = function (url, callback, queryParams) {
	        return handleRequest(url, 'GET', callback, undefined, queryParams, undefined, this.cfg.jwt);
	    };
	    LocalConnection.prototype.post = function (url, body, callback) {
	        return handleRequest(url, 'POST', callback, body, undefined, undefined, this.cfg.jwt);
	    };
	    LocalConnection.prototype.put = function (url, body, callback) {
	        return handleRequest(url, 'PUT', callback, body, undefined, undefined, this.cfg.jwt);
	    };
	    return LocalConnection;
	}());
	exports.LocalConnection = LocalConnection;
	var RemoteConnection = (function () {
	    function RemoteConnection(cfg) {
	        this.cfg = cfg;
	    }
	    RemoteConnection.prototype.get = function (url, callback, queryParams) {
	        return handleRequest(url, 'GET', callback, undefined, queryParams, this.cfg.apiKey, undefined);
	    };
	    RemoteConnection.prototype.post = function (url, body, callback) {
	        return handleRequest(url, 'POST', callback, body, undefined, this.cfg.apiKey, undefined);
	    };
	    RemoteConnection.prototype.put = function (url, body, callback) {
	        return handleRequest(url, 'PUT', callback, body, undefined, this.cfg.apiKey, undefined);
	    };
	    return RemoteConnection;
	}());
	exports.RemoteConnection = RemoteConnection;
	function handleRequest(url, method, callback, body, params, apikey, jwt) {
	    var request = {
	        url: url,
	        method: method,
	        headers: {
	            'Accept-Language': 'en-US'
	        },
	        responseType: 'json'
	    };
	    if (body)
	        request['data'] = body;
	    if (params) {
	        request['params'] = params;
	    }
	    if (apikey)
	        request.headers['apikey'] = apikey;
	    if (jwt)
	        request.headers['Authorization'] = 'Bearer ' + jwt;
	    axios_1.default.request(request).then(function (response) {
	        return callback(null, response.data);
	    }).catch(function (error) {
	        if (error.response)
	            return callback(error.response, null);
	        else
	            return callback(error, null);
	    });
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	var bind = __webpack_require__(13);
	var Axios = __webpack_require__(14);
	var defaults = __webpack_require__(15);
	
	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);
	
	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);
	
	  // Copy context to instance
	  utils.extend(instance, context);
	
	  return instance;
	}
	
	// Create the default instance to be exported
	var axios = createInstance(defaults);
	
	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;
	
	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils.merge(defaults, instanceConfig));
	};
	
	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(33);
	axios.CancelToken = __webpack_require__(34);
	axios.isCancel = __webpack_require__(30);
	
	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(35);
	
	module.exports = axios;
	
	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bind = __webpack_require__(13);
	
	/*global toString:true*/
	
	// utils is a library of generic helper functions non-specific to axios
	
	var toString = Object.prototype.toString;
	
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}
	
	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}
	
	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}
	
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}
	
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}
	
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}
	
	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
	
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}
	
	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}
	
	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}
	
	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}
	
	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}
	
	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}
	
	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}
	
	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}
	
	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}
	
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
	
	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }
	
	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}
	
	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }
	
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}
	
	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}
	
	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaults = __webpack_require__(15);
	var utils = __webpack_require__(12);
	var InterceptorManager = __webpack_require__(27);
	var dispatchRequest = __webpack_require__(28);
	var isAbsoluteURL = __webpack_require__(31);
	var combineURLs = __webpack_require__(32);
	
	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}
	
	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }
	
	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
	
	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }
	
	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);
	
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }
	
	  return promise;
	};
	
	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});
	
	module.exports = Axios;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var utils = __webpack_require__(12);
	var normalizeHeaderName = __webpack_require__(17);
	
	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};
	
	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}
	
	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(18);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(18);
	  }
	  return adapter;
	}
	
	var defaults = {
	  adapter: getDefaultAdapter(),
	
	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],
	
	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],
	
	  timeout: 0,
	
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',
	
	  maxContentLength: -1,
	
	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};
	
	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};
	
	utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
	  defaults.headers[method] = {};
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});
	
	module.exports = defaults;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 16 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var utils = __webpack_require__(12);
	var settle = __webpack_require__(19);
	var buildURL = __webpack_require__(22);
	var parseHeaders = __webpack_require__(23);
	var isURLSameOrigin = __webpack_require__(24);
	var createError = __webpack_require__(20);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(25);
	
	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;
	
	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }
	
	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;
	
	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (process.env.NODE_ENV !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }
	
	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }
	
	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
	
	    // Set the request timeout in MS
	    request.timeout = config.timeout;
	
	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }
	
	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }
	
	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };
	
	      settle(resolve, reject, response);
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(26);
	
	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;
	
	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }
	
	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }
	
	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }
	
	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        if (request.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }
	
	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }
	
	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }
	
	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }
	
	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }
	
	    if (requestData === undefined) {
	      requestData = null;
	    }
	
	    // Send the request
	    request.send(requestData);
	  });
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createError = __webpack_require__(20);
	
	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response
	    ));
	  }
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var enhanceError = __webpack_require__(21);
	
	/**
	 * Create an Error with the specified message, config, error code, and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, response);
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.response = response;
	  return error;
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}
	
	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }
	
	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];
	
	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }
	
	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }
	
	      if (!utils.isArray(val)) {
	        val = [val];
	      }
	
	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });
	
	    serializedParams = parts.join('&');
	  }
	
	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }
	
	  return url;
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;
	
	  if (!headers) { return parsed; }
	
	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));
	
	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });
	
	  return parsed;
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;
	
	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;
	
	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }
	
	      urlParsingNode.setAttribute('href', href);
	
	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }
	
	    originURL = resolveURL(window.location.href);
	
	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :
	
	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js
	
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';
	
	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}
	
	module.exports = btoa;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));
	
	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }
	
	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }
	
	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }
	
	        if (secure === true) {
	          cookie.push('secure');
	        }
	
	        document.cookie = cookie.join('; ');
	      },
	
	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },
	
	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :
	
	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
	function InterceptorManager() {
	  this.handlers = [];
	}
	
	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};
	
	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};
	
	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};
	
	module.exports = InterceptorManager;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	var transformData = __webpack_require__(29);
	var isCancel = __webpack_require__(30);
	var defaults = __webpack_require__(15);
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}
	
	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);
	
	  // Ensure headers exist
	  config.headers = config.headers || {};
	
	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );
	
	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );
	
	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );
	
	  var adapter = config.adapter || defaults.adapter;
	
	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);
	
	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );
	
	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);
	
	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }
	
	    return Promise.reject(reason);
	  });
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });
	
	  return data;
	};


/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}
	
	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};
	
	Cancel.prototype.__CANCEL__ = true;
	
	module.exports = Cancel;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Cancel = __webpack_require__(33);
	
	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }
	
	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });
	
	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }
	
	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};
	
	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};
	
	module.exports = CancelToken;


/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";
	var SEPARATOR = "/";
	var QP_APIKEY = "?apikey=";
	var SECURITY = "/security";
	var SYS_INFO = "/system/status";
	var SECURITY_JWT_ISSUE = SECURITY + "/jwt/issue";
	var SECURITY_JWT_REFRESH = SECURITY + "/jwt/refresh";
	var DOWNLOAD = "/download/gcl";
	var PUB_KEY = SECURITY + "/keys/public";
	var DEVICE = "/devices";
	var DSClient = (function () {
	    function DSClient(url, connection, cfg) {
	        this.url = url;
	        this.connection = connection;
	        this.cfg = cfg;
	    }
	    DSClient.prototype.getUrl = function () { return this.url; };
	    DSClient.prototype.getInfo = function (callback) {
	        var consumerCb = callback;
	        this.connection.get(this.url + SYS_INFO, function (error, data) {
	            if (error)
	                return consumerCb(error, null);
	            return consumerCb(null, data);
	        });
	    };
	    DSClient.prototype.getDevice = function (uuid, callback) {
	        var consumerCb = callback;
	        this.connection.get(this.url + DEVICE + SEPARATOR + uuid, function (error, data) {
	            if (error)
	                return consumerCb(error, null);
	            if (data)
	                return consumerCb(null, data);
	            return consumerCb(null, data);
	        });
	    };
	    DSClient.prototype.getJWT = function (callback) {
	        var consumerCb = callback;
	        var self_cfg = this.cfg;
	        this.connection.get(this.url + SECURITY_JWT_ISSUE, function (error, data) {
	            if (error)
	                return consumerCb(error, null);
	            if (data && data.token)
	                self_cfg.jwt = data.token;
	            return consumerCb(null, data);
	        });
	    };
	    DSClient.prototype.refreshJWT = function (callback) {
	        var actualJWT = this.cfg.jwt;
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
	    DSClient.prototype.getPubKey = function (callback) {
	        this.connection.get(this.url + PUB_KEY, callback);
	    };
	    DSClient.prototype.downloadLink = function (infoBrowser, callback) {
	        var _dsBase = this.cfg.dsUrlBase;
	        var _apikey = this.cfg.apiKey;
	        this.connection.post(this.url + DOWNLOAD, infoBrowser, function (err, data) {
	            if (err)
	                return callback(err, null);
	            var _res = {};
	            _res.url = _dsBase + data.path + QP_APIKEY + _apikey;
	            return callback(null, _res);
	        });
	    };
	    DSClient.prototype.register = function (info, device_id, callback) {
	        var _req = {};
	        _req.uuid = device_id;
	        _req.browser = info.browser;
	        _req.os = info.os;
	        _req.manufacturer = info.manufacturer;
	        _req.ua = info.ua;
	        _req.activated = info.activated;
	        _req.managed = info.managed;
	        _req.version = info.core_version;
	        this.connection.put(this.url + DEVICE + SEPARATOR + device_id, _req, callback);
	    };
	    DSClient.prototype.sync = function (info, device_id, callback) {
	        var _req = {};
	        _req.uuid = device_id;
	        _req.browser = info.browser;
	        _req.os = info.os;
	        _req.manufacturer = info.manufacturer;
	        _req.ua = info.ua;
	        _req.activated = info.activated;
	        _req.managed = info.managed;
	        _req.version = info.core_version;
	        this.connection.post(this.url + DEVICE + SEPARATOR + device_id, _req, callback);
	    };
	    return DSClient;
	}());
	exports.DSClient = DSClient;


/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";
	var CHALLENGE = "/challenge";
	var CERTIFICATE = "/certs/validate-chain";
	var SYSTEM_STATUS = "/system/status";
	var SIGNATURE = "/signature/validate";
	var OCVClient = (function () {
	    function OCVClient(url, connection, cfg) {
	        this.url = url;
	        this.connection = connection;
	        this.cfg = cfg;
	    }
	    OCVClient.prototype.getUrl = function () { return this.url; };
	    OCVClient.prototype.validateSignature = function (data, callback) {
	        var _req = {};
	        _req.rawData = data.rawData;
	        _req.signature = data.signedData;
	        _req.certificate = data.signingCert;
	        this.connection.post(this.url + SIGNATURE, _req, callback);
	    };
	    OCVClient.prototype.getInfo = function (callback) {
	        var cb = callback;
	        this.connection.get(this.url + SYSTEM_STATUS, function (error, data) {
	            if (error)
	                return cb(error, null);
	            return cb(null, data);
	        });
	    };
	    OCVClient.prototype.getChallenge = function (digestAlgorithm, callback) {
	        var consumerCb = callback;
	        this.connection.get(this.url + CHALLENGE, function (error, data) {
	            if (error)
	                return consumerCb(error, null);
	            return consumerCb(null, data);
	        }, { digest: digestAlgorithm });
	    };
	    OCVClient.prototype.validateChallengeSignedHash = function (data, callback) {
	        var _req = {};
	        _req.base64Signature = data.base64Signature;
	        _req.base64Certificate = data.base64Certificate;
	        _req.hash = data.hash;
	        _req.digestAlgorithm = data.digestAlgorithm;
	        this.connection.post(this.url + CHALLENGE, _req, callback);
	    };
	    OCVClient.prototype.validateCertificateChain = function (data, callback) {
	        var _req = {};
	        _req.certificateChain = data.certificateChain;
	        this.connection.post(this.url + CERTIFICATE, _req, callback);
	    };
	    return OCVClient;
	}());
	exports.OCVClient = OCVClient;


/***/ }
/******/ ]);
//# sourceMappingURL=GCLLib.js.map