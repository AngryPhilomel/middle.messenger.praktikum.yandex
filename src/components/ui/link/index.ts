import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import tmpl from "./link.tmpl.ts";

interface LinkProps extends Record<string, unknown> {
    text: string;
    href: string;
}
export default class Link extends Block<LinkProps> {
    constructor(public props: LinkProps) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
