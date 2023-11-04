import {Socket} from "socket.io";
import {RegisterService} from "./RegisterService";
import {sendWSErrorIfPresent} from "../../utils/resolver";

export class RegisterController {
    private registerService: RegisterService;

    constructor(socket: Socket) {
        this.registerService = new RegisterService(socket);
        this.init(socket);
    }

    private init(socket: Socket) {
        socket.on("register", code => {
            const result = this.registerService.register(code);
            sendWSErrorIfPresent(socket, result);
        })

        socket.on("disconnect", () => {
            this.registerService.removeRegistry();
        })
    }
}