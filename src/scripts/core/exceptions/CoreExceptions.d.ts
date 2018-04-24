import { GCLClient } from '../GCLLib';
declare class RestException {
    status: number;
    code: string;
    description: string;
    client: GCLClient;
    constructor(status: number, code: string, description: string, client?: GCLClient);
}
export { RestException };
