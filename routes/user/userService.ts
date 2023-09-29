import {UserStore} from "./userStore";
import {User} from "./user";
import {HttpError} from "../../utils/httpError";

export class UserService {
    private store: UserStore;

    constructor() {
        this.store = new UserStore();
    }

    async getUser(userID: string|undefined): Promise<User | HttpError> {
        if (userID === undefined) return new HttpError(400, "Didn't receive an user id!")

        const user = await this.store.getUser(userID);

        if (user === undefined) return new HttpError(404, "No user with that id was found!");

        return user;
    }
}