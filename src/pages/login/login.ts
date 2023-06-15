import Handlebars from "handlebars";
import tmpl from "./login.tmpl.ts";
import Button from "../../components/ui/button";
import CenteredLayout from "../../components/centered-layout";
import Block from "../../core/block.ts";
import FormLayout from "../../layout/form";
import Input from "../../components/ui/input";
import Link from "../../components/ui/link";

class Login extends Block {
    constructor(public props: Record<string, unknown>) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
const page = new Login({
    root: new CenteredLayout({
        child: new FormLayout({
            heading: "Sign in",
            inputs: [
                new Input({
                    label: "Login",
                    name: "login",
                    type: "text",
                    error: "error!",
                }),
                new Input({
                    label: "Password",
                    name: "password",
                    type: "password",
                }),
            ],
            buttons: [
                new Button({
                    text: "Sign in",
                    type: "submit",
                }),
                new Link({
                    text: "Sign up",
                    href: "../register/register.html",
                }),
            ],
        }),
    }),
});

document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");
    root!.innerHTML = page.getContent().outerHTML;
});
