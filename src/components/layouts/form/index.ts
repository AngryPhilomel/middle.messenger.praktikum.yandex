import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import formLayout from "./form.layout.ts";

interface FormProps extends Record<string, unknown> {
    heading: string;
    inputs: Block | Block[];
    buttons: Block | Block[];
}
export default class FormLayout extends Block<FormProps> {
    constructor(props: FormProps) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(formLayout());
        return this.compile(template, this.props);
    }
}
