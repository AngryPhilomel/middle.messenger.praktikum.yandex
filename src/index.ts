import Router from "./core/router.ts";
import Login from "./pages/login/login.ts";
import Register from "./pages/register/register.ts";
import Profile from "./pages/profile/profile.ts";
import ChangeProfile from "./pages/change-profile/change-profile.ts";
import ChangeAvatar from "./pages/change-avatar/change-avatar.ts";
import ChangePassword from "./pages/change-password/change-password.ts";
import Messenger from "./pages/main/main.ts";
import Error404 from "./pages/404/404.ts";
import Error500 from "./pages/500/500.ts";

export enum Routes {
    Login = "/",
    Register = "/sign-up",
    Profile = "/profile",
    ChangeProfile = "/settings",
    ChangeAvatar = "/settings-avatar",
    ChangePassword = "/settings-password",
    Messenger = "/messenger",
    Error404 = "/404",
    Error500 = "/500",
    Logout = "/",
}

window.addEventListener("DOMContentLoaded", async () => {
    Router.use(Routes.Login, Login)
        .use(Routes.Register, Register)
        .use(Routes.Profile, Profile)
        .use(Routes.ChangeProfile, ChangeProfile)
        .use(Routes.ChangeAvatar, ChangeAvatar)
        .use(Routes.ChangePassword, ChangePassword)
        .use(Routes.Messenger, Messenger)
        .use(Routes.Error404, Error404)
        .use(Routes.Error500, Error500)
        .start();
});
