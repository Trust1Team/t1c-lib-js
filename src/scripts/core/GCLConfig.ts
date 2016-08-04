/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @since 2016
 */
const defaultGclUrl = "https://localhost:10433/v1";
const defaultDSUrl = "https://dist.t1t.be/gcl-ds/v1";
const defaultAllowAutoUpdate = true;
class GCLConfig {
    private _gclUrl:string;
    private _dsUrl:string;
    private _apiKey:string;
    private _client_id:string;
    private _client_credential:string;
    private _jwt:string;
    private _allowAutoUpdate:boolean;

    constructor(gclUrl?:string, dsUrl?:string, apiKey?:string, allowAutoUpdate?:boolean){
        this._gclUrl = gclUrl||defaultGclUrl;
        this._dsUrl = dsUrl||defaultDSUrl;
        this._apiKey = apiKey||'';
        this._allowAutoUpdate = allowAutoUpdate||defaultAllowAutoUpdate;
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

    get client_credential():string {
        return this._client_credential;
    }

    set client_credential(value:string) {
        this._client_credential = value;
    }

    get jwt():string {
        return this._jwt;
    }

    set jwt(value:string) {
        this._jwt = value;
    }
}

export {GCLConfig}