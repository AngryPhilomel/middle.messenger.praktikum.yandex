import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import tmpl from "./error.layout.ts";

interface ErrorLayoutProps extends Record<string, unknown> {
    backButton: Block;
    errorCode: string;
    errorText: string;
}
export default class ErrorLayout extends Block<ErrorLayoutProps> {
    constructor(public props: ErrorLayoutProps) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
