import API, { AuthApi, SignInData, SignUpData } from "../api/auth-api.ts";
import router from "../core/router.ts";
import { Routes } from "../index.ts";
import store from "../core/store.ts";

export class AuthController {
    private api: AuthApi = API;

    async signIn(data: SignInData) {
        try {
            await this.api.signIn(data);
            this.getUser();
            router.go(Routes.Messenger);
        } catch (e) {
            console.log(e);
        }
    }

    async signUp(data: SignUpData) {
        try {
            await this.api.signUp(data);
            this.getUser();
            router.go(Routes.Messenger);
        } catch (e) {
            console.log(e);
        }
    }

    async logout() {
        try {
            await this.api.logout();
            router.go(Routes.Login);
        } catch (e) {
            console.log(e);
        }
    }

    async getUser() {
        const user = await this.api.getUser();
        console.log(user);
        store.setUser(user);
    }
}

export default new AuthController();
