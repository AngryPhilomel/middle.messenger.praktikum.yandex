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
import Logout from "./pages/logout/logout.ts";

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
    Logout = "/logout",
}

window.addEventListener("DOMContentLoaded", async () => {
    Router.use(Routes.Login, Login, false)
        .use(Routes.Logout, Logout, true)
        .use(Routes.Register, Register, false)
        .use(Routes.Profile, Profile, true)
        .use(Routes.ChangeProfile, ChangeProfile, true)
        .use(Routes.ChangeAvatar, ChangeAvatar, true)
        .use(Routes.ChangePassword, ChangePassword, true)
        .use(Routes.Messenger, Messenger, true)
        .use(Routes.Error404, Error404, false)
        .use(Routes.Error500, Error500, false)
        .start();
});
