import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "../change-password/change-password.tmpl.ts";
import CenteredLayout from "../../components/centered-layout";
import Link from "../../components/ui/link";
import ErrorLayout from "../../layout/error";

interface Error404Props extends Record<string, unknown> {
    root: Block;
}
class Error404 extends Block<Error404Props> {
    constructor(public props: Error404Props) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}

const page = new Error404({
    root: new CenteredLayout({
        child: new ErrorLayout({
            backButton: new Link({
                text: "Back to app",
                href: "../../index.html",
            }),
            errorCode: "404",
            errorText: "Not found",
        }),
    }),
});

document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");
    root!.innerHTML = page.getContent().outerHTML;
});
