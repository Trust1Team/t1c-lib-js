/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 */
import { GCLClient } from '../GCLLib';
import { ObjectUtil } from '../../util/ObjectUtil';

class RestException {
    constructor(public status: number, public code: string, public description: string, public client?: GCLClient) {
        ObjectUtil.removeNullAndUndefinedFields(this);
    }
}

export { RestException };
