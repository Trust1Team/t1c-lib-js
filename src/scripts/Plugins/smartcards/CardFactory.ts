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
    // card factory
    private _belgiumElectronicID:EidBe;

    constructor(url:string) {
        this._belgiumElectronicID = new EidBe(url);
    }


    get belgiumElectronicID():EidBe {
        return this._belgiumElectronicID;
    }
}