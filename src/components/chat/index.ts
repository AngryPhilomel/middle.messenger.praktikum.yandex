import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "./chat.tmpl.ts";
import { ChatItem } from "../../core/types.ts";
import Avatar from "../ui/avatar";

interface ChatProps extends Record<string, unknown> {
    chat: ChatItem;
}
export default class Chat extends Block<ChatProps> {
    constructor(props: ChatProps) {
        super(props);
    }

    init() {
        this.children.avatar = new Avatar({
            src: this.props.chat.avatar,
            medium: true,
        });
    }

    render() {
        const { chat } = this.props;
        const template = Handlebars.compile(tmpl(chat));
        return this.compile(template, this.props);
    }
}
