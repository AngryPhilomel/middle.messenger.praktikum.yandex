import Handlebars from "handlebars";
import tmpl from "./change-profile.tmpl.ts";
import Block from "../../core/block.ts";
import CenteredLayout from "../../components/layouts/centered-layout";
import Input from "../../components/ui/input";
import ProfileLayout from "../../components/layouts/profile";
import Link from "../../components/ui/link";
import Button from "../../components/ui/button";
import FormLayout from "../../components/layouts/form";

class ChangeProfile extends Block {
    constructor() {
        super({});
    }

    protected init() {
        this.children.root = new CenteredLayout({
            child: new ProfileLayout({
                backButton: new Link({
                    text: "❮ Back",
                    href: "../profile/profile.html",
                }),
                form: new FormLayout({
                    inputs: inputs.map(
                        (input) => new Input({ ...input }, input.rules)
                    ),
                    buttons: new Button({
                        text: "Save",
                        type: "submit",
                    }),
                }),
            }),
        });
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}

const user = {
    id: 123,
    first_name: "Petya",
    second_name: "Pupkin",
    display_name: "Petya Pupkin",
    login: "userLogin",
    email: "my@email.com",
    phone: "89223332211",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
};

const inputs = [
    {
        name: "email",
        value: user.email,
        label: "Email",
        type: "email",
        rules: [Input.VALIDATE_RULES.REQUIRED, Input.VALIDATE_RULES.EMAIL],
    },
    {
        name: "login",
        value: user.login,
        label: "Login",
        type: "text",
        rules: [Input.VALIDATE_RULES.REQUIRED, Input.VALIDATE_RULES.LOGIN],
    },
    {
        name: "first_name",
        value: user.first_name,
        label: "First name",
        type: "text",
        rules: [Input.VALIDATE_RULES.REQUIRED, Input.VALIDATE_RULES.NAME],
    },
    {
        name: "second_name",
        value: user.second_name,
        label: "Second name",
        type: "text",
        rules: [Input.VALIDATE_RULES.REQUIRED, Input.VALIDATE_RULES.NAME],
    },
    {
        name: "display_name",
        value: user.display_name,
        label: "Display name",
        type: "text",
        rules: [Input.VALIDATE_RULES.REQUIRED],
    },
    {
        name: "phone",
        value: user.phone,
        label: "Phone",
        type: "number",
        rules: [Input.VALIDATE_RULES.REQUIRED, Input.VALIDATE_RULES.PHONE],
    },
];

const page = new ChangeProfile();

document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");
    root!.append(page.getContent());
});
