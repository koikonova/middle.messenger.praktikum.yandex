import {HTTPTransport} from "../utils/HTTPTransport";

export abstract class BaseApi {
    protected http: HTTPTransport;

    protected constructor(endpoint: string) {
        this.http = new HTTPTransport(endpoint);
    }
}