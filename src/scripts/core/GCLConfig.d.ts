declare class GCLConfig {
    private static instance;
    private _dsUrlBase;
    private _ocvUrl;
    private _gclUrl;
    private _dsFileDownloadUrl;
    private _dsUrl;
    private _apiKey;
    private _client_id;
    private _client_secret;
    private _jwt;
    private _allowAutoUpdate;
    private _implicitDownload;
    private _localTestMode;
    constructor(dsUriValue?: string, apiKey?: string);
    ocvUrl: string;
    gclUrl: string;
    dsUrl: string;
    apiKey: string;
    allowAutoUpdate: boolean;
    client_id: string;
    client_secret: string;
    jwt: string;
    implicitDownload: boolean;
    readonly dsFilDownloadUrl: string;
    readonly dsUrlBase: string;
    localTestMode: boolean;
}
export { GCLConfig };
