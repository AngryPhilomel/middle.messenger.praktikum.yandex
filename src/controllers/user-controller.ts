import router from "../core/router.ts";
import { Routes } from "../index.ts";
import API, {
    UpdatePasswordData,
    UpdateProfileData,
    UserApi,
} from "../api/user-api.ts";
import authController from "./auth-controller.ts";

export class AuthController {
    private api: UserApi = API;

    async updateProfile(data: UpdateProfileData) {
        try {
            await this.api.updateProfile(data);
            await authController.getUser();
            router.go(Routes.Profile);
        } catch (e) {
            console.log(e);
        }
    }

    async updatePassword(data: UpdatePasswordData) {
        try {
            await this.api.updatePassword(data);
            router.go(Routes.Profile);
        } catch (e) {
            console.log(e);
        }
    }

    async updateAvatar(data: FormData) {
        try {
            await this.api.updateAvatar(data);
            await authController.getUser();
            router.go(Routes.Profile);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new AuthController();
