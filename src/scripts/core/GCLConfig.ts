/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @since 2016
 */

const defaultGclUrl = "https://localhost:10443/v1";
const defaultDSUrl = "https://accapim.t1t.be:443";
const defaultDSContextPath = "/trust1team/gclds/v1";
const defaultOCVContextPath = "/trust1team/ocv-api/v1";
const defaultDSContextPathTestMode = "/gcl-ds-web/v1";
const fileDownloadUrlPostfix = "/trust1team/gclds-file/v1";
const defaultAllowAutoUpdate = true;
const defaultImplicitDownload = false;
const defaultLocalTestMode = false;

class GCLConfig {
    //singleton pattern
    private static instance:GCLConfig;
    private _dsUrlBase:string;
    private _ocvUrl:string;
    private _gclUrl:string;
    private _dsFileDownloadUrl:string;
    private _dsUrl:string;
    private _apiKey:string;
    private _client_id:string;
    private _client_secret:string;
    private _jwt:string;
    private _allowAutoUpdate:boolean;
    private _implicitDownload:boolean;
    private _localTestMode:boolean;

    // constructor for DTO
    constructor(dsUriValue?:string, apiKey?:string){
        this._gclUrl = defaultGclUrl;
        this._dsUrl = dsUriValue + defaultDSContextPath;
        this._ocvUrl = dsUriValue + defaultOCVContextPath;
        this._dsFileDownloadUrl = dsUriValue + fileDownloadUrlPostfix;
        this._dsUrlBase = dsUriValue;
        this._apiKey = apiKey;
        this._jwt = 'none';
        this._allowAutoUpdate = defaultAllowAutoUpdate;
        this._implicitDownload = defaultImplicitDownload;
        this._localTestMode = defaultLocalTestMode;
    }

    get ocvUrl(): string {
        return this._ocvUrl;
    }

    set ocvUrl(value: string) {
        this._ocvUrl = value;
    }

    get gclUrl():string {
        return this._gclUrl;
    }

    set gclUrl(value:string) {
        this._gclUrl = value||defaultGclUrl;
    }

    get dsUrl():string {
        return this._dsUrl;
    }

    set dsUrl(dsUriValue:string) {
        if(strEndsWith(dsUriValue,defaultDSContextPath)){
            this._dsUrlBase = dsUriValue.replace(defaultDSContextPath,'');
            this._dsUrl = dsUriValue;
            this._dsFileDownloadUrl = this._dsUrlBase + fileDownloadUrlPostfix;
        }else {
            this._dsUrl = dsUriValue + defaultDSContextPath;
            this._dsFileDownloadUrl = dsUriValue + fileDownloadUrlPostfix;
            this._dsUrlBase = dsUriValue;
        }
    }

    get apiKey():string {
        return this._apiKey;
    }

    set apiKey(value:string) {
        this._apiKey = value;
    }

    get allowAutoUpdate():boolean {
        return this._allowAutoUpdate;
    }

    set allowAutoUpdate(value:boolean) {
        this._allowAutoUpdate = value;
    }
    
    get client_id():string {
        return this._client_id;
    }

    set client_id(value:string) {
        this._client_id = value;
    }

    get client_secret():string {
        return this._client_secret;
    }

    set client_secret(value:string) {
        this._client_secret = value;
    }

    get jwt():string {
        return this._jwt;
    }

    set jwt(value:string) {
        this._jwt = value;
    }

    get implicitDownload():boolean {
        return this._implicitDownload;
    }

    set implicitDownload(value:boolean) {
        this._implicitDownload = value;
    }


    get dsFilDownloadUrl():string {
        return this._dsFileDownloadUrl;
    }

    get dsUrlBase() {
        return this._dsUrlBase;
    }


    get localTestMode(): boolean {
        return this._localTestMode;
    }

    set localTestMode(value: boolean) {
        this._localTestMode = value;
        if (this._localTestMode)this._dsUrl = this._dsUrlBase + defaultDSContextPathTestMode;
    }
}

function strEndsWith(str, suffix) {
    return str.match(suffix+"$")==suffix;
}

export {GCLConfig}