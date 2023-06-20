import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "./selected-chat.tmpl.ts";
import Avatar from "../ui/avatar";
import { ChatItem, ChatMessage } from "../../core/types.ts";
import Input from "../ui/input";
import Message from "../ui/message";

const messages: ChatMessage[] = [
    {
        id: 1,
        user_id: 1,
        chat_id: 1,
        time: "2020-01-02T14:22:22.000Z",
        type: "message",
        content: "Hello!",
    },
    {
        id: 2,
        user_id: 2,
        chat_id: 1,
        time: "2020-01-02T14:22:23.000Z",
        type: "message",
        content: "Hello there!",
    },
    {
        id: 3,
        user_id: 1,
        chat_id: 1,
        time: "2020-01-02T14:22:24.000Z",
        type: "message",
        content: "How’s it going?",
    },
    {
        id: 4,
        user_id: 2,
        chat_id: 1,
        time: "2020-01-02T14:22:25.000Z",
        type: "message",
        content: "Fine, tnx!",
    },
];

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
        this.children.avatar = new Avatar({
            src: this.props.chat?.avatar || undefined,
            small: true,
        });
        this.children.messageFeed = messages.map(
            (message) =>
                new Message({
                    message,
                    isMyself: message.user_id === 1,
                })
        );
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
