import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "../change-password/change-password.tmpl.ts";
import CenteredLayout from "../../components/layouts/centered-layout";
import Link from "../../components/ui/link";
import ErrorLayout from "../../components/layouts/error";

class Error500 extends Block {
    constructor() {
        super({});
    }

    protected init() {
        this.children.root = new CenteredLayout({
            child: new ErrorLayout({
                backButton: new Link({
                    text: "Back to app",
                    href: "../../index.html",
                }),
                errorCode: "500",
                errorText: "We're already fixing it",
            }),
        });
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}

const page = new Error500();

document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");
    root!.append(page.getContent());
});
