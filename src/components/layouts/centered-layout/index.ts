import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import layoutTmpl from "./centered-layout.tmpl.ts";

interface CenteredLayoutProps extends Record<string, unknown> {
    child: Block;
}
export default class CenteredLayout extends Block<CenteredLayoutProps> {
    constructor(public props: CenteredLayoutProps) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(layoutTmpl);
        return this.compile(template, this.props);
    }
}
