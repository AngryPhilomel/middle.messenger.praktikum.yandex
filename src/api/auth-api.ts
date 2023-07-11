import HttpTransport from "../core/http-transport.ts";
import { UserResponse } from "../core/types.ts";

export interface SignInData extends Record<string, string> {
    login: string;
    password: string;
}

export interface SignUpData extends Record<string, string> {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export class AuthApi {
    private http: HttpTransport = new HttpTransport("/auth");

    signIn(data: SignInData) {
        return this.http.post("/signin", { data });
    }

    signUp(data: SignUpData) {
        return this.http.post("/signup", { data });
    }

    getUser(): Promise<UserResponse> {
        return this.http.get("/user");
    }

    logout() {
        return this.http.post("/logout");
    }
}

export default new AuthApi();
