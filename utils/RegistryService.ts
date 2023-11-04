import {RegistryError} from "./RegistryError";
import {Socket} from "socket.io";

export class RegistryService {
    static instance: RegistryService = new RegistryService();

    private registry: Map<String, Socket>;

    private constructor() {
        this.registry = new Map();
    }

    public register(code: String, socket: Socket): RegistryError|null {
        if (this.registry.get(code) != null) {
            return {
                type: "already_in_use"
            };
        }

        this.registry.set(code, socket);
        return null;
    }

    public request(code: String, userID: string): RegistryError|null {
        const host = this.registry.get(code);
        if (host == null) {
            return {
                type: "doesnt_exist"
            };
        }

        host.emit("requested", userID);
        return null;
    }

    removeRegister(code: string) {
        this.registry.delete(code);
    }
}