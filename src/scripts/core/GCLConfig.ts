/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @since 2016
 */
const defaultGclUrl = "https://localhost:10433/v1";
const defaultDSUrl = "https://dist.t1t.be/gcl-ds/v1";
const defaultAllowAutoUpdate = true;
const defaultImplicitDownload = false;

class GCLConfig {
    //singleton pattern
    private static instance:GCLConfig;

    private _gclUrl:string;
    private _dsUrl:string;
    private _apiKey:string;
    private _client_id:string;
    private _client_secret:string;
    private _jwt:string;
    private _allowAutoUpdate:boolean;
    private _implicitDownload:boolean;

    // constructor for DTO
    constructor(gclUrl?:string, dsUrl?:string, apiKey?:string, allowAutoUpdate?:boolean, implicitDownload?:boolean){
        this._gclUrl = gclUrl||defaultGclUrl;
        this._dsUrl = dsUrl||defaultDSUrl;
        this._apiKey = apiKey||'';
        this._allowAutoUpdate = allowAutoUpdate||defaultAllowAutoUpdate;
        this._implicitDownload = implicitDownload||defaultImplicitDownload;
    }

    // singleton pattern for use in T1C-JS
    static get Instance() {
        if (this.instance === null || this.instance === undefined) {
            this.instance = new GCLConfig();
            this.instance.gclUrl = defaultGclUrl;
            this.instance.dsUrl = defaultDSUrl;
            this.instance.apiKey = '';
            this.instance.allowAutoUpdate = defaultAllowAutoUpdate;
            this.instance.implicitDownload = false;
        }
        return this.instance;
    }

    get gclUrl():string {
        return this._gclUrl;
    }

    set gclUrl(value:string) {
        this._gclUrl = value;
    }

    get dsUrl():string {
        return this._dsUrl;
    }

    set dsUrl(value:string) {
        this._dsUrl = value;
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
}

export {GCLConfig}