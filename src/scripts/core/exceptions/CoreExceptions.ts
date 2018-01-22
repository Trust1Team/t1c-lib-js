/**
 * @author Michallis Pashidis
 */
class RestException {
    constructor(public status: number, public code: string, public description: string) {}
}

export { RestException };
