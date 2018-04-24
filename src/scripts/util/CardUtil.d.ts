import { Card } from '../core/service/CoreModel';
import { Options } from './RequestHandler';
export { CardUtil };
declare class CardUtil {
    static canAuthenticate(card: Card): boolean;
    static canSign(card: Card): boolean;
    static canVerifyPin(card: Card): boolean;
    static determineContainer(card: Card): string;
    static defaultAlgo(container: string): string;
    static dumpMethod(container: string): "allData" | "slots";
    static dumpOptions(container: string): Options;
}
