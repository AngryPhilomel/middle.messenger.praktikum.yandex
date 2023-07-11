import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import tmpl from "./button.tmpl.ts";

interface ButtonProps extends Record<string, unknown> {
    type?: string;
    text?: string;
    negative?: boolean;
}
export default class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
