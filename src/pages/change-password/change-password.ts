import Handlebars from "handlebars";
import tmpl from "./change-password.tmpl.ts";
import Block from "../../core/block.ts";
import CenteredLayout from "../../components/layouts/centered-layout";
import Input from "../../components/ui/input";
import ProfileLayout from "../../components/layouts/profile";
import Link from "../../components/ui/link";
import Button from "../../components/ui/button";

interface ChangePasswordProps extends Record<string, unknown> {
    root: Block;
}
class ChangePassword extends Block<ChangePasswordProps> {
    constructor(public props: ChangePasswordProps) {
        super(props);
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
    },
    {
        name: "newPassword",
        label: "New password",
        type: "password",
    },
    {
        name: "newPasswordRepeat",
        label: "New password repeat",
        type: "password",
    },
];

const page = new ChangePassword({
    root: new CenteredLayout({
        child: new ProfileLayout({
            backButton: new Link({
                text: "❮ Back",
                href: "../profile/profile.html",
            }),
            inputs: inputs.map((input) => new Input({ ...input })),
            buttons: new Button({
                text: "Save",
                type: "submit",
            }),
        }),
    }),
});

document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");
    root!.innerHTML = page.getContent().outerHTML;
});
