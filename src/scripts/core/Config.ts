/**
 * @author Maarten Casteels
 * @since 2016
 */
export class Config {

    private defConnectorUrl:string = 'https://localhost:12345/v1';
    private defDistributionUrl:string = 'https://dist.t1t.be/gcl-ds/v1';
    private defEndpointInfo = "/info";

    private _connectorUrl:string;
    private _distributionUrl:string;
    private _infoUrl:string;
    private _performCheck:boolean;

    constructor(connectorUrl?:string, distributionUrl?:string, performCheck?:boolean) {
        this._connectorUrl = connectorUrl || this.defConnectorUrl;
        this._distributionUrl = distributionUrl || this.defDistributionUrl;
        this._infoUrl = connectorUrl+this.defEndpointInfo || this.defConnectorUrl + this.defEndpointInfo;
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
        return this._infoUrl;
    }
}