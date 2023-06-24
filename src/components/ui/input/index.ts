import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import tmpl from "./input.tmpl.ts";

interface InputProps extends Record<string, unknown> {
    label?: string;
    name?: string;
    type?: string;
    value?: string;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
}

enum VALIDATE_RULES {
    REQUIRED,
    LOGIN,
    PASSWORD,
    EMAIL,
    PHONE,
    NAME,
}
export default class Input extends Block<InputProps> {
    static VALIDATE_RULES = VALIDATE_RULES;

    constructor(props: InputProps, private rules: VALIDATE_RULES[] = []) {
        super(props, "input");
    }

    public getValue() {
        return this.getContent().querySelector("input")!.value;
    }

    public getName() {
        return this.getContent().querySelector("input")!.name;
    }

    public validate(value: string, preventErrorMessage = false) {
        let errorMessage = "";
        return this.rules.reduce((err, rule) => {
            if (err) {
                return err;
            }
            switch (rule) {
                case VALIDATE_RULES.REQUIRED:
                    if (value.trim() === "") {
                        err = true;
                        errorMessage = "Can`t be empty";
                    }
                    break;
                case VALIDATE_RULES.LOGIN:
                    if (!value.match(/^(?!^\d+$)[a-z,A-Z\d\-_]{3,20}$/)) {
                        err = true;
                        errorMessage =
                            "From 3 to 20 characters, Latin, can contain numbers, but not consist of them, no spaces, no special characters (hyphens and underscores are allowed)";
                    }
                    break;
                case VALIDATE_RULES.PASSWORD:
                    if (
                        !value.match(
                            /^(?=.*[A-Z]+)(?=.*\d+)[a-z,A-Z\d\-_]{8,40}$/
                        )
                    ) {
                        err = true;
                        errorMessage =
                            "From 8 to 40 characters, at least one uppercase letter and number required";
                    }
                    break;
                case VALIDATE_RULES.NAME:
                    if (!value.match(/^[A-ZА-Я][a-z\-а-я]*$/)) {
                        err = true;
                        errorMessage =
                            "Latin or Cyrillic, the first letter must be capital, no spaces and no numbers, no special characters (only a hyphen is allowed).";
                    }
                    break;
                case VALIDATE_RULES.EMAIL:
                    if (
                        !value
                            .toLowerCase()
                            .match(
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            )
                    ) {
                        err = true;
                        errorMessage = "Enter valid email";
                    }
                    break;
                case VALIDATE_RULES.PHONE:
                    if (!value.match(/^\+?\d{10,15}$/)) {
                        err = true;
                        errorMessage =
                            "From 10 to 15 characters, consists of numbers, may start with a plus sign.";
                    }
                    break;
                default:
                    throw new Error("Event does not exist");
            }
            if (preventErrorMessage) {
                return err;
            }
            if (err && errorMessage) {
                this.setProps({ error: errorMessage, value });
            } else {
                this.setProps({ error: "", value });
            }
            return err;
        }, false);
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
