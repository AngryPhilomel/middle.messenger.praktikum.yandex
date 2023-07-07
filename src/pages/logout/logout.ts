import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "../change-password/change-password.tmpl.ts";
import CenteredLayout from "../../components/layouts/centered-layout";
import Link from "../../components/ui/link";
import ErrorLayout from "../../components/layouts/error";
import { Routes } from "../../index.ts";
import authController from "../../controllers/auth-controller.ts";

export default class Logout extends Block {
    constructor() {
        super({});
    }

    componentDidMount() {
        authController.logout();
    }

    protected init() {
        this.children.root = new CenteredLayout({
            child: new ErrorLayout({
                backButton: new Link({
                    text: "Back to app",
                    href: Routes.Messenger,
                }),
                errorCode: "200",
                errorText: "Goodbye!",
            }),
        });
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
