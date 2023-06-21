import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import tmpl from "./two-side.layout.ts";
import Link from "../../ui/link";
import Input from "../../ui/input";
import Chat from "../../chat";
import SelectedChat from "../../selected-chat";
import NotSelectedChat from "../../not-selected-chat";
import ChatsController from "../../../controllers/chats-controller.ts";
import store, { Store } from "../../../core/store.ts";
import ChatsList from "../chats-list";

interface TwoSideLayoutProps extends Record<string, unknown> {}

export default class TwoSideLayout extends Block<TwoSideLayoutProps> {
    constructor(props: TwoSideLayoutProps) {
        super({ ...props, selectedChat: store.getState().selectedChatId });
        store.on(Store.STORE_EVENTS.UPDATE, this.update.bind(this));
        ChatsController.getChats();
        console.log(store.getState());
    }

    public update() {
        this.setProps({
            selectedChat: store.getState().selectedChatId,
        });
        this.updateChatsList();
        this.updateMessenger();
    }

    public updateSelectedChat() {
        this.setProps({
            selectedChat: store.getState().selectedChatId,
        });
        (this.children.side as Chat[]).forEach((chat) =>
            chat.setProps({
                isSelected:
                    chat.getChatId() === store.getState().selectedChatId,
            })
        );
        (this.children.messenger as SelectedChat).setChat(
            store
                .getState()
                .chats.find((c) => c.id === store.getState().selectedChatId) ||
                null
        );
    }

    private updateChatsList() {
        (this.children.chatsList as ChatsList).setProps({
            chats: store.getState().chats,
        });
    }

    private updateMessenger() {
        (this.children.messenger as SelectedChat).setProps({
            chat: store
                .getState()
                .chats.find((c) => c.id === store.getState().selectedChatId),
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
        this.children.chatsList = new ChatsList({
            chats: store.getState().chats,
        });
        this.children.messenger = new SelectedChat({
            chat:
                store
                    .getState()
                    .chats.find(
                        (c) => c.id === store.getState().selectedChatId
                    ) || null,
        });
        this.children.empty = new NotSelectedChat({});
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
