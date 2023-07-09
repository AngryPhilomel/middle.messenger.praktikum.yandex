import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "./selected-chat.tmpl.ts";
import Avatar from "../ui/avatar";
import { ChatItem } from "../../core/types.ts";
import Input from "../ui/input";
import Message from "../ui/message";
import store from "../../core/store.ts";
import ChatMenu from "../chat-menu/index.ts";

interface SelectedChatProps extends Record<string, unknown> {
    chat: ChatItem | null;
}
export default class SelectedChat extends Block<SelectedChatProps> {
    constructor(props: SelectedChatProps) {
        super(props, "form");
    }

    componentDidUpdate(
        oldProps: SelectedChatProps,
        newProps: SelectedChatProps
    ): boolean {
        if (JSON.stringify(oldProps) !== JSON.stringify(newProps)) {
            (this.children.avatar as Avatar).setProps({
                src: newProps.chat?.avatar,
            });
            this.children.messageFeed = this.createMessageFeed();
            if (this.props.chat?.created_by === store.getState().user?.id) {
                this.children.chatMenu = new ChatMenu()
            } else {
                this.children.chatMenu = []
            }
            return true;
        }
        return false;
    }

    private createMessageFeed() {
        return store.getState().messages.map(
            (message) =>
                new Message({
                    message,
                    isMyself: message.user_id === store.getState().user?.id,
                })
        );
    }

    init() {
        this.on("submit", (event) => {
            const e = event as SubmitEvent & { target: HTMLFormElement };
            e.preventDefault();
            const data = new FormData(e.target);
            const formDataObj: Record<string, unknown> = {};
            data.forEach((value, key) => {
                formDataObj[key] = value;
            });
            const message = this.children.message as Input;
            if (!message.validate(message.getValue(), true)) {
                console.log(formDataObj);
            }
        });
        this.children.avatar = new Avatar({
            src: this.props.chat?.avatar || undefined,
            small: true,
        });
        this.children.messageFeed = this.createMessageFeed();
        this.children.message = new Input(
            {
                name: "message",
                placeholder: "Message",
            },
            [Input.VALIDATE_RULES.REQUIRED]
        );
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
