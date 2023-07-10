import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "./selected-chat.tmpl.ts";
import Avatar from "../ui/avatar";
import { ChatItem } from "../../core/types.ts";
import Message from "../ui/message";
import store, { Store } from "../../core/store.ts";
import ChatMenu from "../chat-menu/index.ts";
import MessageForm from "../message-form";

interface SelectedChatProps extends Record<string, unknown> {
    chat: ChatItem | null;
}
export default class SelectedChat extends Block<SelectedChatProps> {
    constructor(props: SelectedChatProps) {
        super(props, "form");
        store.on(Store.STORE_EVENTS.UPDATE, this.update.bind(this));
    }

    private async update() {
        this.children.messageFeed = this.createMessageFeed();
    }

    componentDidUpdate(
        oldProps: SelectedChatProps,
        newProps: SelectedChatProps
    ): boolean {
        if (JSON.stringify(oldProps) !== JSON.stringify(newProps)) {
            (this.children.avatar as Avatar).setProps({
                src: newProps.chat?.avatar,
            });
            if (this.props.chat?.created_by === store.getState().user?.id) {
                this.children.chatMenu = new ChatMenu();
            } else {
                this.children.chatMenu = [];
            }
        }
        return true;
    }

    private createMessageFeed() {
        return store.getState().messages.map(
            (message) =>
                new Message({
                    message,
                    isMyself: message.user_id === store.getState().user?.id,
                    isFile: message.type === "file",
                    isImage: !!message.file?.content_type.match("image"),
                    user: store
                        .getState()
                        .chatUsers.find((user) => user.id === message.user_id)!,
                })
        );
    }

    init() {
        this.children.avatar = new Avatar({
            src: this.props.chat?.avatar || undefined,
            small: true,
        });
        this.children.message = new MessageForm({});
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
