import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import tmpl from "./two-side.layout.ts";
import Link from "../../ui/link";
import Input from "../../ui/input";
import SelectedChat from "../../selected-chat";
import NotSelectedChat from "../../not-selected-chat";
import ChatsController from "../../../controllers/chats-controller.ts";
import store, { Store } from "../../../core/store.ts";
import ChatsList from "../chats-list";
import { Routes } from "../../../index.ts";

interface TwoSideLayoutProps extends Record<string, unknown> {}

export default class TwoSideLayout extends Block<TwoSideLayoutProps> {
    constructor(props: TwoSideLayoutProps) {
        super({ ...props, selectedChat: store.getState().selectedChatId });
        store.on(Store.STORE_EVENTS.UPDATE, this.update.bind(this));
        ChatsController.getChats();
    }

    public update() {
        this.setProps({
            selectedChat: store.getState().selectedChatId,
        });
        this.updateChatsList();
        this.updateMessenger();
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
            href: Routes.Profile,
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
