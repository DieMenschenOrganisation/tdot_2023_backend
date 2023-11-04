import {RegistryService} from "../../utils/RegistryService";
import {HttpError} from "../../utils/httpError";

export class RequestService {
    private registryService: RegistryService;

    constructor() {
        this.registryService = RegistryService.instance;
    }

    requestHost(code: string, userID: string): HttpError|null {
        if (code == null) return new HttpError(400, "No host code passed!");
        if (userID == null) return new HttpError(400, "No UserID passed!");

        this.registryService.request(code, userID);
        return null;
    }
}