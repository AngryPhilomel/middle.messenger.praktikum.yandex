import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import tmpl from "./message.tmpl.ts";
import { ChatMessage, UserResponse } from "../../../core/types.ts";
import toLocalTime from "../../../utils/toLocalTime.ts";

interface MessageProps extends Record<string, unknown> {
    message: ChatMessage;
    isMyself: boolean;
    isFile: boolean;
    isImage: boolean;
    user: UserResponse;
}
export default class Message extends Block<MessageProps> {
    constructor(props: MessageProps) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(
            tmpl(toLocalTime(this.props.message.time)),
        );
        return this.compile(template, this.props);
    }
}
