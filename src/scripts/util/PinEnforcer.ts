/**
 * @author Maarten Somers
 */
import { GenericConnection } from "../core/client/Connection";
import { Promise } from "es6-promise";

export { PinEnforcer };

const CORE_READERS = "/card-readers";

class PinEnforcer  {

    // TODO figure out how to use generics to return a promise with correct type
    public static check(connection: GenericConnection,
                        baseUrl: string,
                        readerId: string,
                        pinValue: string): Promise<any> {
        // if forceHardwarePinpad enabled,
        return new Promise((resolve, reject) => {
            if (connection.cfg.forceHardwarePinpad) {
                // check if reader has pinpad
                connection.get(baseUrl, CORE_READERS + "/" + readerId, undefined).then(reader => {
                    if (reader.data.pinpad) {
                        // if true, check that no pin was sent
                        if (pinValue) {
                            reject({ data: { message: "Strict pinpad enforcement is enabled. This request was sent with a PIN, but the" +
                                                   " reader has a pinpad." } });
                        } else { resolve(); }
                    } else {
                        // if false, check if a pin was sent
                        if (pinValue) {
                            reject({ data: { message: "Strict pinpad enforcement is enabled. This request was sent without a PIN, but the" +
                                                " reader does not have a pinpad."} });
                        } else { resolve(); }
                    }
                }, error => {
                    reject(error);
                });
            } else { resolve(); }
        });
    }

}
