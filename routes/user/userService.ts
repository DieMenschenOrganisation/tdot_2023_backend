import {UserStore} from "./userStore";
import {User} from "./user";
import {HttpError} from "../../utils/httpError";
import {UserCreationData} from "./userCreationData";

export class UserService {
    private store: UserStore;

    constructor() {
        this.store = new UserStore();
    }

    async getUser(userID: string | undefined): Promise<User | HttpError> {
        if (userID === undefined) return new HttpError(400, "Es wurde keine Nutzer-ID übergeben!")

        const user = await this.store.getUserByID(userID);

        if (user === undefined) return new HttpError(404, "Es gibt keinen Nutzer mit dieser ID!");

        return user;
    }

    async createUser(userCreationData: UserCreationData): Promise<string | HttpError> {
        if (userCreationData === undefined || userCreationData.name === undefined)
            return new HttpError(400, "Es wurde kein Name übergeben!")

        const existingUser = await this.store.getUserByName(userCreationData.name);
        if (existingUser !== undefined) return new HttpError(406, "Dieser Benutzername wird bereits verwendet!");

        const id = await this.store.createDefaultUser(userCreationData.name);
        if (id === undefined) return new HttpError(406, "Dieser Benutzername wird bereits verwendet!");

        return id;
    }

    async removeUser(userID: string | undefined): Promise<string | HttpError> {
        if (userID === undefined) return new HttpError(400, "Es wurde keine Nutzer-ID übergeben!")

        await this.store.deleteUserByID(userID);

        return "ok";
    }

    async getUserPoints(userID: string): Promise<number | HttpError> {
        const user = await this.getUser(userID);
        if (user instanceof HttpError) return user;
        return user.points;
    }
}