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
import { Routes } from "../../index.ts";

export default class ChangeAvatar extends Block {
    constructor() {
        super({});
    }

    protected init() {
        this.children.root = new CenteredLayout({
            child: new ProfileLayout({
                backButton: new Link({
                    text: "❮ Back",
                    href: Routes.Profile,
                }),
                avatar: avatarElement,
                form: new FormLayout({
                    inputs: [
                        new Input({
                            id: "avatarUpload",
                            name: "avatar",
                            label: "Avatar",
                            type: "file",
                            accept: "image/*",
                            events: {
                                change: showAvatar,
                            },
                        }),
                    ],
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

const avatarElement = new Avatar({
    src: user.avatar,
    id: "avatar",
});

function showAvatar(
    e: Event & { target: HTMLInputElement & { files: FileList } }
) {
    const img = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        if (avatarElement) {
            avatarElement.setProps({
                src: e.target?.result as string,
            });
        }
    };
    reader.readAsDataURL(img);
}
