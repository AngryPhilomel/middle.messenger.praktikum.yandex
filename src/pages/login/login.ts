import Handlebars from "handlebars";
import form from "./login.tmpl.ts";
// eslint-disable-next-line import/extensions,import/no-unresolved
import Button from "../../components/ui/button";

document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");
    const template = Handlebars.compile(form);

    root!.innerHTML = template({
        heading: "Sign in",
        inputs: [
            { label: "Login", name: "login", type: "text", error: "error!" },
            { label: "Password", name: "password", type: "password" },
        ],
        // formButton: { text: "Sign in" },
        SubmitButton: new Button({ text: "Sign in", type: "submit" }).render(),
        altButton: { text: "Sign up", href: "../register/register.html" },
    });
});
