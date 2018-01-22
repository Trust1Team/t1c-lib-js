/**
 * @author Maarten Somers
 * @since 2018
 */
import { GCLConfig } from '../core/GCLConfig';
import { BrowserInfo } from '../core/service/CoreModel';
import { Promise } from 'es6-promise';
import { DSClient } from '../core/ds/DSClient';
import { AdminService } from '../core/admin/admin';
import { DSPlatformInfo } from '../core/ds/DSClientModel';

export { ActivationUtil };

class ActivationUtil {
    // constructor
    constructor() {}

    public static unManagedInitialization(admin: AdminService,
                                          ds: DSClient,
                                          self_cfg: GCLConfig,
                                          mergedInfo: DSPlatformInfo,
                                          uuid: string): Promise<{}> {
        // do core v2 initialization flow
        return new Promise((resolve, reject) => {
            ActivationUtil.preRegister(admin)
                          .then(pubKey => {
                              return Promise.resolve({ ds, uuid, pubKey, mergedInfo});
                          })
                          .then(ActivationUtil.register)
                          .then(activationResponse => {
                              return Promise.resolve({ admin, activationResponse });
                          })
                          .then(ActivationUtil.postRegister)
                          .then(() => {
                              // activation sequence complete, resolve promise
                              resolve();
                          }).catch(err => {
                reject(err);
            });
        });
    }

    private static preRegister(admin: AdminService) {
        // get GCL pubkey and registration info
        return new Promise((resolve, reject) => {
            admin.getPubKey().then(pubKey => {
                resolve(pubKey);
            }).catch(err => {
                reject(err);
            });
        });

    }

    private static register(args: { ds: DSClient, uuid: string, pubKey: string,
        mergedInfo: DSPlatformInfo }) {
        // register with DS
        return new Promise((resolve, reject) => {
            args.ds.activationRequest(args.pubKey, args.mergedInfo).then(res => {
                resolve(res.data);
            }, err => {
                reject(err);
            });
        });
    }

    private static postRegister(args: { admin: AdminService, activationResponse: any }) {
        // activate GCL
        return args.admin.activateGcl(args.activationResponse);
    }
}
