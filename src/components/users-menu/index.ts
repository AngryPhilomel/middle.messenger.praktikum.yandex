import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "./users-menu.tmpl.ts";
import Button from "../ui/button/index.ts";
import Input from "../ui/input/index.ts";
import chatsController from "../../controllers/chats-controller.ts";
import store from "../../core/store.ts";

export default class UsersMenu extends Block {
    constructor() {
        super({}, "button");
    }

    init() {
        this.children.input = new Input({
            placeholder: "User ID",
            type: "number",
        });
        this.children.addButton = new Button({
            type: "button",
            text: "+",
            events: {
                click: () =>
                    chatsController.addUser(
                        parseInt((this.children.input as Input).getValue(), 10),
                        store.getState().selectedChatId!,
                    ),
            },
        });
        this.children.deleteButton = new Button({
            type: "button",
            text: "-",
            negative: true,
            events: {
                click: () =>
                    chatsController.deleteUser(
                        parseInt((this.children.input as Input).getValue(), 10),
                        store.getState().selectedChatId!,
                    ),
            },
        });
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
