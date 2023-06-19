import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "../change-password/change-password.tmpl.ts";
import CenteredLayout from "../../components/layouts/centered-layout";
import ProfileLayout from "../../components/layouts/profile";
import Link from "../../components/ui/link";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import Avatar from "../../components/ui/avatar";
import FormLayout from "../../components/layouts/form";

interface ChangeAvatarProps extends Record<string, unknown> {
    root: Block;
}
class ChangeAvatar extends Block<ChangeAvatarProps> {
    constructor(props: ChangeAvatarProps) {
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

const page = new ChangeAvatar({
    root: new CenteredLayout({
        child: new ProfileLayout({
            backButton: new Link({
                text: "❮ Back",
                href: "../profile/profile.html",
            }),
            avatar: new Avatar({
                src: user.avatar,
                id: "avatar",
            }),
            form: new FormLayout({
                inputs: [
                    new Input({
                        id: "avatarUpload",
                        name: "avatar",
                        label: "Avatar",
                        type: "file",
                        accept: "image/*",
                    }),
                ],
                buttons: new Button({
                    text: "Save",
                    type: "submit",
                }),
            }),
        }),
    }),
});

document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");
    root!.append(page.getContent());

    const avatar: HTMLImageElement | null = document.querySelector("#avatar");
    const avatarUpload: HTMLInputElement | null =
        document.querySelector("#avatarUpload");
    if (!avatarUpload || !avatar) {
        return;
    }
    avatarUpload.addEventListener("change", showAvatar);
    function showAvatar() {
        if (!avatarUpload || !avatarUpload.files) {
            return;
        }
        const img = avatarUpload.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            if (avatar) {
                avatar.src = e.target?.result as string;
            }
        };
        reader.readAsDataURL(img);
    }
});
