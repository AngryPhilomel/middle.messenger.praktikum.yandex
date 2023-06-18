import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import tmpl from "./two-side.layout.ts";
import Link from "../../ui/link";
import Input from "../../ui/input";
import { ChatItem } from "../../../core/types.ts";
import Chat from "../../chat";
import SelectedChat from "../../selected-chat";
import NotSelectedChat from "../../not-selected-chat";

interface TwoSideLayoutProps extends Record<string, unknown> {
    // selectedChat: number | null;
    chats: ChatItem[];
    // side: Block | Block[];
    // messenger: Block;
    // empty: Block;
}

export default class TwoSideLayout extends Block<TwoSideLayoutProps> {
    constructor(props: TwoSideLayoutProps) {
        super({ ...props, selectedChat: 0 });
    }

    public updateSelectedChat(id: number) {
        this.setProps({
            selectedChat: id,
        });
    }

    init() {
        this.children.toProfile = new Link({
            text: "Profile ❯",
            href: "../../pages/profile/profile.html",
        });
        this.children.search = new Input({
            placeholder: "Search",
        });
        this.children.side = this.props.chats.map(
            (chat) =>
                new Chat({
                    chat,
                    isSelected: chat.id === this.props.selectedChat,
                    events: {
                        click: () => {
                            this.updateSelectedChat(chat.id);
                            console.log(chat.id, this.props.selectedChat);
                        },
                    },
                })
        );
        this.children.messenger = new SelectedChat({
            chat: this.props.chats[this.props.selectedChat!],
        });
        this.children.empty = new NotSelectedChat({});
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
