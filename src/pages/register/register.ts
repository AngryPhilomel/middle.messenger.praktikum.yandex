import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "../login/login.tmpl.ts";
import CenteredLayout from "../../components/layouts/centered-layout";
import FormLayout from "../../components/layouts/form";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import Link from "../../components/ui/link";

class Register extends Block {
    constructor(public props: Record<string, unknown>) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}

const page = new Register({
    root: new CenteredLayout({
        child: new FormLayout({
            heading: "Sign up",
            inputs: [
                new Input({
                    label: "First Name",
                    name: "first_name",
                    type: "text",
                }),
                new Input({
                    label: "Second Name",
                    name: "second_name",
                    type: "text",
                }),
                new Input({ label: "Login", name: "login", type: "text" }),
                new Input({ label: "Email", name: "email", type: "email" }),
                new Input({
                    label: "Password",
                    name: "password",
                    type: "password",
                }),
                new Input({
                    label: "Password again",
                    name: "password_again",
                    type: "password",
                }),
                new Input({ label: "Phone", name: "phone", type: "text" }),
            ],
            buttons: [
                new Button({
                    text: "Sign up",
                    type: "submit",
                }),
                new Link({
                    text: "Sign in",
                    href: "../login/login.html",
                }),
            ],
        }),
    }),
});

document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");
    root!.innerHTML = page.getContent().outerHTML;
});
