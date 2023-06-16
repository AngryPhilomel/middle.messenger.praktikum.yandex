import Handlebars from "handlebars";
import tmpl from "./profile.tmpl.ts";
import Block from "../../core/block.ts";
import CenteredLayout from "../../components/centered-layout";
import Input from "../../components/ui/input";
import ProfileLayout from "../../layout/profile";
import Link from "../../components/ui/link";
import Avatar from "../../components/ui/avatar";

interface ProfileProps extends Record<string, unknown> {
    root: Block;
}
class Profile extends Block<ProfileProps> {
    constructor(public props: ProfileProps) {
        super(props);
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
        disabled: true,
    },
    {
        name: "login",
        value: user.login,
        label: "Login",
        type: "text",
        disabled: true,
    },
    {
        name: "first_name",
        value: user.first_name,
        label: "First name",
        type: "text",
        disabled: true,
    },
    {
        name: "second_name",
        value: user.second_name,
        label: "Second name",
        type: "text",
        disabled: true,
    },
    {
        name: "display_name",
        value: user.display_name,
        label: "Display name",
        type: "text",
        disabled: true,
    },
    {
        name: "phone",
        value: user.phone,
        label: "Phone",
        type: "number",
        disabled: true,
    },
];

const page = new Profile({
    root: new CenteredLayout({
        child: new ProfileLayout({
            backButton: new Link({
                text: "❮ Back",
                href: "../../index.html",
            }),
            avatar: new Avatar({
                src: user.avatar,
                changeable: true,
                href: "../change-avatar/change-avatar.html",
            }),
            inputs: inputs.map((input) => new Input({ ...input })),
            buttons: [
                new Link({
                    text: "Change profile data",
                    href: "../change-profile/change-profile.html",
                }),
                new Link({
                    text: "Change password",
                    href: "../change-password/change-password.html",
                }),
                new Link({
                    text: "Logout",
                    href: "./logout",
                    negative: true,
                }),
            ],
        }),
    }),
});

document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");
    root!.innerHTML = page.getContent().outerHTML;
});