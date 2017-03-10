/**
 * @author Michallis
 * @since 2016
 */
import {EMV, AbstractEMV} from "./emv/EMV";
import {AbstractEidBE, EidBe} from "./eid/be/EidBe";
import {AbstractEidLUX, EidLux} from "./eid/lux/EidLux";
import {LocalConnection} from "../../core/client/Connection";
import {GCLConfig} from "../../core/GCLConfig";
import {AbstractMobib, Mobib} from "./mobib/mobib";
import {LuxTrust, AbstractLuxTrust} from "./luxtrust/LuxTrust";
import {Ocra, AbstractOcra} from "./ocra/ocra";

interface AbstractFactory {
    createEidBE(reader_id?: string): AbstractEidBE;
    createEidLUX(reader_id?: string): AbstractEidLUX;
    createEmv(reader_id?: string): AbstractEMV;
    createLuxTrust(reader_id?: string): AbstractLuxTrust;
    createMobib(reader_id?:string): AbstractMobib;
    createOcra(reader_id?:string): AbstractOcra;
}

export class CardFactory implements AbstractFactory{
    constructor(private url:string,private connection:LocalConnection,private cfg:GCLConfig) {}

    public createEidBE(reader_id?:string):AbstractEidBE {return new EidBe(this.url,this.connection,reader_id);}

    public createEidLUX(reader_id?:string, pin?:string):AbstractEidLUX {return new EidLux(this.url,this.connection,reader_id,pin);}

    public createEmv(reader_id?:string): EMV {return new EMV(this.url,this.connection,reader_id);}

    public createLuxTrust(reader_id?:string): LuxTrust { return new LuxTrust(this.url, this.connection, reader_id); }

    public createMobib(reader_id?:string): Mobib { return new Mobib(this.url, this.connection, reader_id); }

    public createOcra(reader_id?:string): Ocra { return new Ocra(this.url, this.connection, reader_id); }
}