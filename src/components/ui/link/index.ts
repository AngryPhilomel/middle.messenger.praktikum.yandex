import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import tmpl from "./link.tmpl.ts";
import Router from "../../../core/router.ts";

interface LinkProps extends Record<string, unknown> {
    text: string;
    href: string;
    negative?: boolean;
}
export default class Link extends Block<LinkProps> {
    constructor(props: LinkProps) {
        super(props);
    }

    protected init() {
        this.on("click", (e) => {
            (e as PointerEvent).preventDefault();
            Router.go(this.props.href);
        });
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
