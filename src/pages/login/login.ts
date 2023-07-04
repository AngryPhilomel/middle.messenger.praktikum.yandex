import Handlebars from "handlebars";
import tmpl from "./login.tmpl.ts";
import Button from "../../components/ui/button";
import CenteredLayout from "../../components/layouts/centered-layout";
import Block from "../../core/block.ts";
import FormLayout from "../../components/layouts/form";
import Input from "../../components/ui/input";
import Link from "../../components/ui/link";
import { Routes } from "../../index.ts";

export default class Login extends Block {
    constructor() {
        super({});
    }

    protected init() {
        this.children.root = new CenteredLayout({
            child: new FormLayout({
                heading: "Sign in",
                inputs: [
                    new Input(
                        {
                            label: "Login",
                            name: "login",
                            type: "text",
                        },
                        [
                            Input.VALIDATE_RULES.REQUIRED,
                            Input.VALIDATE_RULES.LOGIN,
                        ]
                    ),
                    new Input(
                        {
                            label: "Password",
                            name: "password",
                            type: "password",
                        },
                        [
                            Input.VALIDATE_RULES.REQUIRED,
                            Input.VALIDATE_RULES.PASSWORD,
                        ]
                    ),
                ],
                buttons: [
                    new Button({
                        text: "Sign in",
                        type: "submit",
                    }),
                    new Link({
                        text: "Sign up",
                        href: Routes.Register,
                    }),
                ],
            }),
        });
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
