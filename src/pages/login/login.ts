import Handlebars from "handlebars";
import form from "./login.tmpl.ts";

document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");
    const template = Handlebars.compile(form);

    root!.innerHTML = template({
        heading: "Sign in",
        inputs: [
            { label: "Login", name: "login", type: "text", error: "error!" },
            { label: "Password", name: "password", type: "password" },
        ],
        formButton: { text: "Sign in" },
        altButton: { text: "Sign up", href: "../register/register.html" },
    });
});
