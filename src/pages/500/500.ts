import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "../change-password/change-password.tmpl.ts";
import CenteredLayout from "../../components/layouts/centered-layout";
import Link from "../../components/ui/link";
import ErrorLayout from "../../components/layouts/error";

interface Error500Props extends Record<string, unknown> {
    root: Block;
}
class Error500 extends Block<Error500Props> {
    constructor(public props: Error500Props) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}

const page = new Error500({
    root: new CenteredLayout({
        child: new ErrorLayout({
            backButton: new Link({
                text: "Back to app",
                href: "../../index.html",
            }),
            errorCode: "500",
            errorText: "We're already fixing it",
        }),
    }),
});

document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");
    root!.innerHTML = page.getContent().outerHTML;
});
