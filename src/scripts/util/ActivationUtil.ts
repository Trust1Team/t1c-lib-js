/**
 * @author Maarten Somers
 * @since 2018
 */
import { GCLConfig } from '../core/GCLConfig';
import { BrowserInfo } from '../core/service/CoreModel';
import { DSPlatformInfo, JWTResponse } from '../core/ds/DSClientModel';
import { Promise } from 'es6-promise';
import { DSClient } from '../core/ds/DSClient';
import { AdminService } from '../core/admin/admin';
import { CoreService } from '../core/service/CoreService';

export { ActivationUtil };

class ActivationUtil {
    // constructor
    constructor() {}

    public static unManagedInitialization(admin: AdminService,
                                          core: CoreService,
                                          ds: DSClient,
                                          self_cfg: GCLConfig,
                                          mergedInfo: { managed: boolean, core_version: string, activated: boolean } & BrowserInfo,
                                          uuid: string): Promise<{}> {
        // check if we can use core v2 initialization
        if (self_cfg.v2Compatible) {
            // do core v2 initialization flow
            return ActivationUtil.coreV2Init(admin, ds, mergedInfo, uuid);
        } else {
            // do v1 initialization
            return ActivationUtil.coreV1Init(core, ds, self_cfg, mergedInfo, uuid);
        }
    }

    private static coreV1Init(core: CoreService,
                              ds: DSClient,
                              self_cfg: GCLConfig,
                              mergedInfo: { managed: boolean, core_version: string, activated: boolean } & BrowserInfo,
                              uuid: string) {
        return new Promise((resolve, reject) => {
            // make sure pub key is set
            core.getPubKey().then(() => {
                // certificate loaded
                // console.log('certificate present, no need to retrieve from DS');
                resolve();
            }, err => {
                if (err && !err.success && err.code === 201) {
                    // no certificate loaded, retrieve it from DS
                    // console.log('no certificate set - retrieve cert from DS');
                    ds.getPubKey().then(dsResponse => {
                        return core.setPubKey(dsResponse.pubkey).then(() => {
                            // activate & register
                            // we need to register the device
                            // console.log('Register device:' + uuid);
                            return ActivationUtil.registerDevice(ds, self_cfg, mergedInfo, uuid).then(() => { resolve(); });
                        });
                    }).catch(error => {
                        reject(error);
                    });
                }
            });
        });
    }

    private static coreV2Init(admin: AdminService,
                              ds: DSClient,
                              mergedInfo: { managed: boolean, core_version: string, activated: boolean } & BrowserInfo,
                              uuid: string) {
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
        mergedInfo: { managed: boolean, core_version: string, activated: boolean } & BrowserInfo }) {
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

    private static registerDevice(ds: DSClient, config: GCLConfig, info: DSPlatformInfo, deviceId: string): Promise<JWTResponse> {
        return ds.register(info, deviceId).then(activationResponse => {
            config.jwt = activationResponse.token;
            return activationResponse;
        });
    }
}
