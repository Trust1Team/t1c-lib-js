/**
 * @author Michallis Pashidis
 * @author Maarten Somers
 */
import {GCLClient} from '../GCLLib';
import {ObjectUtil} from '../../util/ObjectUtil';

/**
 * Generic REST exception
 */
class RestException {
    constructor(public status: number, public code: string, public description: string, public client?: GCLClient) {
        // remove null and undefined fields during construction
        ObjectUtil.removeNullAndUndefinedFields(this);
    }
}

export {RestException};
