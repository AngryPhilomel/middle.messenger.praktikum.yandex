import HttpTransport from "../core/http-transport.ts";
import { UserResponse } from "../core/types.ts";

export interface UpdatePasswordData extends Record<string, string> {
    oldPassword: "string";
    newPassword: "string";
}

export interface UpdateProfileData extends Record<string, string> {
    first_name: "string";
    second_name: "string";
    display_name: "string";
    login: "string";
    email: "string";
    phone: "string";
}

export class UserApi {
    private http: HttpTransport = new HttpTransport("/user");

    updateProfile(data: UpdateProfileData) {
        return this.http.put("/profile", { data });
    }

    updateAvatar(data: FormData): Promise<UserResponse> {
        return this.http.put("/profile/avatar", { data });
    }

    updatePassword(data: UpdatePasswordData) {
        return this.http.put("/password", { data });
    }

    getById(id: string): Promise<UserResponse> {
        return this.http.get(`/${id}`);
    }

    search(login: string) {
        return this.http.post("/search", { data: { login } });
    }
}

export default new UserApi();
