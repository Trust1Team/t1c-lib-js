/**
 * @author Maarten Casteels
 * @since 2016
 */
import {Reader} from "../../core/comm/Reader";
import {Card} from "../../core/comm/Card";
import {EidBe} from "./eid/be/EidBe";
import {AbstractEidBE} from "./eid/be/EidBe";
import {AbstractEidEST} from "./eid/est/EidEst";
import {AbstractEidLUX} from "./eid/lux/EidLux";

interface AbstractFactory {
    createEidBE(reader_id?: Reader, card_id?: Card): AbstractEidBE;
    createEidEST(reader_id?: Reader, card_id?: Card): AbstractEidEST;
    createEidLUX(reader_id?: Reader, card_id?: Card): AbstractEidLUX;
}

export class Cards {
    constructor(private url:string) {}

    public getEidBE():EidBe {
        return new EidBe(this.url);
    }

}