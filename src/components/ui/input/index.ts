import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import tmpl from "./input.tmpl.ts";

interface InputProps extends Record<string, unknown> {
    label?: string;
    name?: string;
    type?: string;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
}
export default class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
