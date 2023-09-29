import {UserStore} from "./userStore";
import {User} from "./user";
import {HttpError} from "../../utils/httpError";
import {UserCreationData} from "./userCreationData";

export class UserService {
    private store: UserStore;

    constructor() {
        this.store = new UserStore();
    }

    async getUser(userID: string|undefined): Promise<User | HttpError> {
        if (userID === undefined) return new HttpError(400, "Didn't receive an user id!")

        const user = await this.store.getUserByID(userID);

        if (user === undefined) return new HttpError(404, "No user with that id was found!");

        return user;
    }

    async createUser(userCreationData: UserCreationData): Promise<string |HttpError> {
        if (userCreationData === undefined || userCreationData.name === undefined)
            return new HttpError(400, "Didn't pass the name for the user to create!")

        const existingUser = await this.store.getUserByName(userCreationData.name);
        if (existingUser !== undefined) return new HttpError(406, "Username isn't available any more!");

        const id = await this.store.createDefaultUser(userCreationData.name);
        if (id === undefined) return new HttpError(406, "Username isn't available any more!");

        return id;
    }
}