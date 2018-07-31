import { GCLClient } from '../GCLLib';
export declare class T1CLibException {
    status: number;
    code: string;
    description: string;
    client?: GCLClient;
    constructor(status: number, code: string, description: string, client?: GCLClient);
}
