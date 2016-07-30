/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @since 2016
 */
const defaultGclUrl = "http://localhost:10080/v1";
const defaultDSUrl = "https://dist.t1t.be/gcl-ds/v1";
const defaultAllowAutoUpdate = true;
export class Config {
    private _gclUrl:string;
    private _dsUrl:string;
    private _apiKey:string;
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

    get dsUrl():string {
        return this._dsUrl;
    }

    get apiKey():string {
        return this._apiKey;
    }

    get allowAutoUpdate():boolean {
        return this._allowAutoUpdate;
    }
}