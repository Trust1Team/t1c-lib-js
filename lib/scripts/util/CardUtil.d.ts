import { Options } from './RequestHandler';
import { SmartCard } from '../core/service/CoreModel';
export declare class CardUtil {
    static canAuthenticate(card: SmartCard): boolean;
    static canSign(card: SmartCard): boolean;
    static canVerifyPin(card: SmartCard): boolean;
    static determineContainer(card: SmartCard): string;
    static defaultAlgo(container: string): string;
    static dumpMethod(container: string): "allData" | "slots";
    static dumpOptions(container: string): Options;
}
