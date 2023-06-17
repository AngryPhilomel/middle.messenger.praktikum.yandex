import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "./chat.tmpl.ts";
import { ChatItem } from "../../core/types.ts";

interface ChatProps extends Record<string, unknown> {
    chat: ChatItem;
    avatar: Block;
}
export default class Chat extends Block<ChatProps> {
    constructor(public props: ChatProps) {
        super(props);
    }

    render() {
        const { chat } = this.props;
        const template = Handlebars.compile(tmpl(chat));
        return this.compile(template, this.props);
    }
}
