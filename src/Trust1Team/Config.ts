/**
 * @author Maarten Casteels
 * @since 2016
 */
export class Config {

    private defConnectorUrl:string = 'http://localhost:12345/v1';
    private defDistributionUrl:string = 'https://dist.t1t.be/gcl-ds/v1';

    private _connectorUrl:string;
    private _distributionUrl:string;
    private _performCheck:boolean;

    constructor(connectorUrl?:string, distributionUrl?:string, performCheck?:boolean) {
        this._connectorUrl = connectorUrl || this.defConnectorUrl;
        this._distributionUrl = distributionUrl || this.defDistributionUrl;
        this._performCheck = performCheck || true;
    }

    public connectorUrl():string {
        return this._connectorUrl;
    }

    public distributionUrl():string {
        return this._distributionUrl;
    }

    public performCheck():boolean {
        return this._performCheck;
    }
}