/**
 * @author Michallis
 * @since 2016
 */
import {EidBe} from "./eid/be/EidBe";
import {EMV, AbstractEMV} from "./emv/EMV";
import {AbstractEidBE} from "./eid/be/EidBe";
import {AbstractEidEST} from "./eid/est/EidEst";
import {AbstractEidLUX} from "./eid/lux/EidLux";
import {LocalConnection} from "../../core/client/Connection";
import {GCLConfig} from "../../core/GCLConfig";
import {AbstractMobib, Mobib} from "./mobib/mobib";

interface AbstractFactory {
    createEidBE(reader_id?: string): AbstractEidBE;
    createEidEST(reader_id?: string): AbstractEidEST;
    createEidLUX(reader_id?: string): AbstractEidLUX;
    createEmv(reader_id?: string): AbstractEMV;
    createMobib(reader_id?:string): AbstractMobib;
}

export class CardFactory implements AbstractFactory{
    createEidEST(reader_id?:string):AbstractEidEST {
        return undefined;
    }

    createEidLUX(reader_id?:string):AbstractEidLUX {
        return undefined;
    }

    constructor(private url:string,private connection:LocalConnection,private cfg:GCLConfig) {}

    public createEidBE(reader_id?:string):AbstractEidBE {return new EidBe(this.url,this.connection,reader_id);}

    public createEmv(reader_id?:string): EMV {return new EMV(this.url,this.connection,reader_id);}

    public createMobib(reader_id?:string): Mobib {
        return new Mobib(this.url, this.connection, reader_id);
    }
}