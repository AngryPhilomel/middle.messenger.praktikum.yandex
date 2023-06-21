import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import tmpl from "./chats-list.layout.ts";
import { ChatItem } from "../../../core/types.ts";
import Chat from "../../chat";
import store from "../../../core/store.ts";
import ChatsController from "../../../controllers/chats-controller.ts";

interface ChatsListProps extends Record<string, unknown> {
    chats: ChatItem[];
}
export default class ChatsList extends Block<ChatsListProps> {
    constructor(props: ChatsListProps) {
        super(props);
    }

    createChats() {
        return this.props.chats.map(
            (chat) =>
                new Chat({
                    chat,
                    isSelected: chat.id === store.getState().selectedChatId,
                    events: {
                        click: () => {
                            ChatsController.selectChat(chat.id);
                        },
                    },
                })
        );
    }

    componentDidUpdate(
        oldProps: ChatsListProps,
        newProps: ChatsListProps
    ): boolean {
        this.children.chats = this.createChats();
        return true;
    }

    init() {
        this.children.chats = this.createChats();
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
