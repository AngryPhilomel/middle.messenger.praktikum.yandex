import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import buttonTmpl from "./button.tmpl.ts";

interface ButtonProps {
    type?: string;
    text?: string;
}
export default class Button extends Block {
    constructor(props: ButtonProps) {
        super("button", props);
    }

    render(): string {
        const template = Handlebars.compile(buttonTmpl());
        return template(this.props);
    }
}
