import {RegistryService} from "../../utils/RegistryService";
import {Socket} from "socket.io";
import {WSError} from "../../utils/WSError";

export class RegisterService {
    private registryService: RegistryService;
    private registeredCode: null|string;
    private readonly socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
        this.registryService = RegistryService.instance;
        this.registeredCode = null;
    }

    register(code: string): WSError|null {
        const error = this.registryService.register(code, this.socket);
        if (error != null) return new WSError(error.type);
        this.registeredCode = code;
        return null;
    }

    removeRegistry() {
        if (this.registeredCode == null) return;
        this.registryService.removeRegister(this.registeredCode);
    }
}