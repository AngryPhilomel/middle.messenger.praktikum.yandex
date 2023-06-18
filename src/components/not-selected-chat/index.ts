import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "./not-selected-chat.tmpl.ts";

interface NotSelectedChatProps extends Record<string, unknown> {}
export default class NotSelectedChat extends Block<NotSelectedChatProps> {
    constructor(props: NotSelectedChatProps) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
