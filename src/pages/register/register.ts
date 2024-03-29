import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "../login/login.tmpl.ts";
import CenteredLayout from "../../components/layouts/centered-layout";
import FormLayout from "../../components/layouts/form";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import Link from "../../components/ui/link";
import { Routes } from "../../index.ts";
import { SignUpData } from "../../api/auth-api.ts";
import authController from "../../controllers/auth-controller.ts";

export default class Register extends Block {
    constructor() {
        super({});
    }

    protected init() {
        this.children.root = new CenteredLayout({
            child: new FormLayout({
                onSubmit: (data: unknown) => {
                    authController.signUp(data as SignUpData);
                },
                heading: "Sign up",
                inputs: [
                    new Input(
                        {
                            label: "First Name",
                            name: "first_name",
                            type: "text",
                        },
                        [
                            Input.VALIDATE_RULES.REQUIRED,
                            Input.VALIDATE_RULES.NAME,
                        ],
                    ),
                    new Input(
                        {
                            label: "Second Name",
                            name: "second_name",
                            type: "text",
                        },
                        [
                            Input.VALIDATE_RULES.REQUIRED,
                            Input.VALIDATE_RULES.NAME,
                        ],
                    ),

                    new Input(
                        {
                            label: "Login",
                            name: "login",
                            type: "text",
                        },
                        [
                            Input.VALIDATE_RULES.REQUIRED,
                            Input.VALIDATE_RULES.LOGIN,
                        ],
                    ),
                    new Input(
                        {
                            label: "Email",
                            name: "email",
                            type: "email",
                        },
                        [
                            Input.VALIDATE_RULES.REQUIRED,
                            Input.VALIDATE_RULES.EMAIL,
                        ],
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
                        ],
                    ),
                    new Input(
                        {
                            label: "Password again",
                            name: "password_again",
                            type: "password",
                        },
                        [
                            Input.VALIDATE_RULES.REQUIRED,
                            Input.VALIDATE_RULES.PASSWORD,
                        ],
                    ),
                    new Input(
                        {
                            label: "Phone",
                            name: "phone",
                            type: "text",
                        },
                        [
                            Input.VALIDATE_RULES.REQUIRED,
                            Input.VALIDATE_RULES.PHONE,
                        ],
                    ),
                ],
                buttons: [
                    new Button({
                        text: "Sign up",
                        type: "submit",
                    }),
                    new Link({
                        text: "Sign in",
                        href: Routes.Login,
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
