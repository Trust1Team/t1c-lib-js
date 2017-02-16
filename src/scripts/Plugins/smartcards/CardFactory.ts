/**
 * @author Michallis
 * @since 2016
 */
import {EMV, AbstractEMV} from "./emv/EMV";
import {AbstractEidBE, EidBe} from "./eid/be/EidBe";
import {AbstractEidLUX, EidLux} from "./eid/lux/EidLux";
import {LocalConnection} from "../../core/client/Connection";
import {GCLConfig} from "../../core/GCLConfig";

interface AbstractFactory {
    createEidBE(reader_id?: string): AbstractEidBE;
    createEidLUX(reader_id?: string): AbstractEidLUX;
    createEmv(reader_id?: string): AbstractEMV;
}

export class CardFactory implements AbstractFactory{
    constructor(private url:string,private connection:LocalConnection,private cfg:GCLConfig) {}

    public createEidBE(reader_id?:string):AbstractEidBE {return new EidBe(this.url,this.connection,reader_id);}

    public createEidLUX(reader_id?:string, pin?:string):AbstractEidLUX {return new EidLux(this.url,this.connection,reader_id,pin);}

    public createEmv(reader_id?:string): EMV {return new EMV(this.url,this.connection,reader_id);}

}