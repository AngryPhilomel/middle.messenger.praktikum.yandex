import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import formLayout from "./form.layout.ts";
import Input from "../../ui/input";
import Button from "../../ui/button";

interface FormProps extends Record<string, unknown> {
    heading: string;
    inputs: Block | Block[];
    buttons: Block | Block[];
}
export default class FormLayout extends Block<FormProps> {
    constructor(props: FormProps) {
        super(props);
    }

    init() {
        if (Array.isArray(this.children.inputs)) {
            this.children.inputs.forEach((input) => {
                input.on("blur", function (e) {
                    (input as Input).validate(
                        ((e as FocusEvent).target as HTMLInputElement).value
                    );
                });
            });
        }
        if (Array.isArray(this.children.buttons)) {
            this.children.buttons.forEach((button) => {
                if (button instanceof Button) {
                    button.on("click", (e) => {
                        (e as Event).preventDefault();
                        if (Array.isArray(this.children.inputs)) {
                            const result: Record<string, string> = {};
                            const errs = this.children.inputs.map((input) => {
                                const i: Input = input as Input;
                                const name = i.getName();
                                const value = i.getValue();
                                if (
                                    name === "password_again" &&
                                    result["password"] !== value
                                ) {
                                    input.setProps({
                                        error: "Passwords not same",
                                        value,
                                    });
                                    return true;
                                }
                                result[name] = value;

                                return i.validate(value);
                            });
                            if (!errs.includes(true)) {
                                console.log(result);
                            }
                        }
                    });
                }
            });
        }
    }

    render() {
        const template = Handlebars.compile(formLayout());
        return this.compile(template, this.props);
    }
}
