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
import authController from "./controllers/auth-controller.ts";

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
    Router.use(Routes.Login, Login)
        .use(Routes.Logout, Logout)
        .use(Routes.Register, Register)
        .use(Routes.Profile, Profile)
        .use(Routes.ChangeProfile, ChangeProfile)
        .use(Routes.ChangeAvatar, ChangeAvatar)
        .use(Routes.ChangePassword, ChangePassword)
        .use(Routes.Messenger, Messenger)
        .use(Routes.Error404, Error404)
        .use(Routes.Error500, Error500);

    if (
        ![Routes.Login, Routes.Register].includes(
            window.location.pathname as Routes
        )
    ) {
        try {
            await authController.getUser();
            Router.start();
        } catch (e) {
            Router.start();
            Router.go(Routes.Login);
        }
    }
});
