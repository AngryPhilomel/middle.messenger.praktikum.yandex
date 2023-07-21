import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "./message-form.tmpl.ts";
import Input from "../ui/input/index.ts";
import messagesController from "../../controllers/messages-controller.ts";
import resourcesController from "../../controllers/resources-controller.ts";

export default class MessageForm extends Block {
    async uploadFile(
        e: Event & { target: HTMLInputElement & { files: FileList } },
    ) {
        const img = e.target.files[0];
        const formData = new FormData();
        formData.set("resource", img);
        const file = await resourcesController.uploadFile(formData);
        if (!file) {
            return;
        }
        messagesController.sendFile(file.id);
    }

    init() {
        this.children.attachField = new Input({
            name: "attach",
            type: "file",
            events: {
                change: this.uploadFile.bind(this),
            },
        });
        this.children.messageField = new Input(
            {
                placeholder: "Message",
                name: "message",
                type: "text",
            },
            [Input.VALIDATE_RULES.REQUIRED],
        );

        this.on("submit", (e) => {
            const event = e as SubmitEvent & { target: HTMLFormElement };
            event.preventDefault();
            const message = this.children.messageField as Input;
            if (!message.validate(message.getValue(), true)) {
                messagesController.send(message.getValue());
                event.target.reset();
                setTimeout(() => {
                    (
                        event.target.querySelector(
                            "input[name='message']",
                        ) as HTMLInputElement
                    )?.focus();
                }, 100);
            }
        });
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
