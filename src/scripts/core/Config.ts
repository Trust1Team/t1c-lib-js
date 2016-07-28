/**
 * @author Maarten Casteels
 * @author Michallis Pashidis
 * @since 2016
 */
export class Config {

    private defConnectorUrl= 'https://localhost:12345/v1';
    //private defConnectorUrl = 'http://mockbin.com/bin/cdd45060-b7e5-49da-8881-1df0e84784a2';
    private defDistributionUrl = 'https://dist.t1t.be/gcl-ds/v1';

    private _connectorUrl:string;
    private _distributionUrl:string;
    private _performCheck:boolean;

    constructor(connectorUrl?:string, distributionUrl?:string, performCheck?:boolean) {
        this._connectorUrl = connectorUrl || this.defConnectorUrl;
        this._distributionUrl = distributionUrl || this.defDistributionUrl;
        this._performCheck = performCheck || true;
    }

    get connectorUrl():string {
        return this._connectorUrl;
    }

    get distributionUrl():string {
        return this._distributionUrl;
    }

    get performCheck():boolean {
        return this._performCheck;
    }

    get infoUrl():string {
        return this._connectorUrl+"/info";
    }
}