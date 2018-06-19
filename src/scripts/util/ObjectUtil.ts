/**
 * @author Maarten Somers
 * @since 2018
 */

export class ObjectUtil {

    public static removeNullAndUndefinedFields(obj: any): any {
        Object.keys(obj).forEach(key => !obj[key] && delete obj[key]);
    }

}
