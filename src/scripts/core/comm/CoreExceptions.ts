/**
 * @author Michallis Pashidis
 */
interface RestException{
    description:string;
    status:number;
    code:string;
}
interface DataException{}

export {RestException,DataException}