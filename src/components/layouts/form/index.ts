import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import formLayout from "./form.layout.ts";
import Input from "../../ui/input";

interface FormProps extends Record<string, unknown> {
    heading?: string;
    inputs: Block[];
    buttons: Block | Block[];
    onSubmit: (data: unknown) => void;
}
export default class FormLayout extends Block<FormProps> {
    constructor(props: FormProps) {
        super(props, "form");
    }

    init() {
        this.on("submit", (event) => {
            const e = event as SubmitEvent & { target: HTMLFormElement };
            e.preventDefault();
            const data = new FormData(e.target);
            const formDataObj: Record<string, unknown> = {};
            data.forEach((value, key) => {
                formDataObj[key] = value;
            });
            if (Array.isArray(this.children.inputs)) {
                const errs = this.children.inputs.map((input) => {
                    const i: Input = input as Input;
                    const name = i.getName();
                    const value = i.getValue();
                    if (
                        (name === "password_again" &&
                            formDataObj["password"] !== value) ||
                        (name === "newPasswordRepeat" &&
                            formDataObj["newPassword"] !== value)
                    ) {
                        input.setProps({
                            error: "Passwords not same",
                            value,
                        });
                        return true;
                    }
                    return i.validate(value);
                });
                if (!errs.includes(true)) {
                    if (data.has("avatar")) {
                        this.props.onSubmit(data);
                    } else {
                        this.props.onSubmit(formDataObj);
                    }
                }
            }
        });

        if (Array.isArray(this.children.inputs)) {
            this.children.inputs.forEach((input) => {
                input.on("blur", function (e) {
                    (input as Input).validate(
                        ((e as FocusEvent).target as HTMLInputElement).value
                    );
                });
            });
        }
    }

    render() {
        const template = Handlebars.compile(formLayout());
        return this.compile(template, this.props);
    }
}
