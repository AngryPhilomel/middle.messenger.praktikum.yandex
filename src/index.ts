import Handlebars from "handlebars";
import centeredFullscreen from "./partials/centeredFullscreen/centeredFullscreen.prt.ts";
import input from "./partials/input/input.prt.ts";
import button from "./partials/button/button.prt.ts";
import link from "./partials/link/link.prt.ts";
import avatar from "./partials/avatar/avatar.prt.ts";
import chat from "./partials/chat/chat.prt.ts";
import emptyChat from "./partials/empty-chat/empty-chat.prt.ts";
import profileLayout from "./layout/profile/profile.tayout.ts";
import errorLayout from "./layout/error/error.layout.ts";
import formLayout from "./layout/form/form.layout.ts";
import twoSide from "./layout/two-side/two-side.layout.ts";
import { toLocalTime } from "./utils/toLocalTime.ts";

Handlebars.registerPartial("centeredFullscreen", centeredFullscreen);
Handlebars.registerPartial("input", input);
Handlebars.registerPartial("button", button);
Handlebars.registerPartial("link", link);
Handlebars.registerPartial("avatar", avatar);
Handlebars.registerPartial("chat", chat);
Handlebars.registerPartial("emptyChat", emptyChat);

Handlebars.registerPartial("profileLayout", profileLayout);
Handlebars.registerPartial("errorLayout", errorLayout);
Handlebars.registerPartial("formLayout", formLayout);
Handlebars.registerPartial("twoSide", twoSide);

Handlebars.registerHelper("toLocalTime", toLocalTime);
