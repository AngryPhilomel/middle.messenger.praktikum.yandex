import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "./message-form.tmpl.ts";
import Input from "../ui/input/index.ts";
import messagesController from "../../controllers/messages-controller.ts";

export default class MessageForm extends Block {
    init() {
        this.children.messageField = new Input(
            {
                placeholder: "Message",
                name: "message",
            },
            [Input.VALIDATE_RULES.REQUIRED]
        );

        this.on("submit", (e) => {
            const event = e as SubmitEvent & { target: HTMLFormElement };
            event.preventDefault();
            const message = this.children.messageField as Input;
            if (!message.validate(message.getValue(), true)) {
                messagesController.send(message.getValue());
                event.target.reset();
            }
        });
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
