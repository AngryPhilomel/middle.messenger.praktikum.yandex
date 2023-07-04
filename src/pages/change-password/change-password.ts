import Handlebars from "handlebars";
import tmpl from "./change-password.tmpl.ts";
import Block from "../../core/block.ts";
import CenteredLayout from "../../components/layouts/centered-layout";
import Input from "../../components/ui/input";
import ProfileLayout from "../../components/layouts/profile";
import Link from "../../components/ui/link";
import Button from "../../components/ui/button";
import FormLayout from "../../components/layouts/form";

class ChangePassword extends Block {
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

const inputs = [
    {
        name: "oldPassword",
        label: "Old password",
        type: "password",
        rules: [Input.VALIDATE_RULES.REQUIRED, Input.VALIDATE_RULES.PASSWORD],
    },
    {
        name: "newPassword",
        label: "New password",
        type: "password",
        rules: [Input.VALIDATE_RULES.REQUIRED, Input.VALIDATE_RULES.PASSWORD],
    },
    {
        name: "newPasswordRepeat",
        label: "New password repeat",
        type: "password",
        rules: [Input.VALIDATE_RULES.REQUIRED, Input.VALIDATE_RULES.PASSWORD],
    },
];

const page = new ChangePassword();

document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");
    root!.append(page.getContent());
});
