/**
 * @author Maarten Casteels
 * @since 2016
 */
import {Reader} from "../../core/model/Reader";
import {Card} from "./Card";
import {EidBe} from "./eid/be/EidBe";
import {EMV} from "./emv/EMV";
import {AbstractEidBE} from "./eid/be/EidBe";
import {AbstractEidEST} from "./eid/est/EidEst";
import {AbstractEidLUX} from "./eid/lux/EidLux";
import {LocalConnection} from "../../core/client/Connection";

interface AbstractFactory {
    createEidBE(reader_id?: Reader, card_id?: Card): AbstractEidBE;
    createEidEST(reader_id?: Reader, card_id?: Card): AbstractEidEST;
    createEidLUX(reader_id?: Reader, card_id?: Card): AbstractEidLUX;
}

export class CardFactory {
    constructor(private url:string,private connection:LocalConnection) {}

    public getEidBE():EidBe {return new EidBe(this.url,this.connection);}

    public getEMV(): EMV {return new EMV(this.url,this.connection);}

}