import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "./selected-chat.tmpl.ts";
import Avatar from "../ui/avatar";
import { ChatItem } from "../../core/types.ts";
import Input from "../ui/input";

interface SelectedChatProps extends Record<string, unknown> {
    chat: ChatItem | null;
}
export default class SelectedChat extends Block<SelectedChatProps> {
    constructor(props: SelectedChatProps) {
        super(props);
    }

    public setChat(chat: ChatItem | null) {
        if (!chat) {
            return;
        }
        this.setProps({ chat });
        (this.children.avatar as Avatar).setProps({
            src: chat.avatar,
        });
    }

    init() {
        // if (!this.props.chat) return;
        this.children.avatar = new Avatar({
            src: this.props.chat?.avatar || undefined,
            small: true,
        });
        this.children.message = new Input({
            name: "message",
            placeholder: "Message",
        });
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
