import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "./users-menu.tmpl.ts";
import Button from "../ui/button/index.ts";
import Input from "../ui/input/index.ts";
import chatsController from "../../controllers/chats-controller.ts";
import store from "../../core/store.ts";

export default class UsersMenu extends Block {
    constructor() {
        super({}, 'button')
    }

    init() {
        // this.on('click', (e) => {
        //     const event = e as SubmitEvent & { target: HTMLFormElement }
        // })
        this.children.input = new Input({
            placeholder: 'User ID'
        })
        this.children.addButton = new Button({
            type: "submit",
            text: "+",
            events: {
                click: () => chatsController.addUser(parseInt((this.children.input as Input).getValue()), store.getState().selectedChatId!)
            }
        })
        this.children.deleteButton = new Button({
            type: "submit",
            text: "-",
            events: {
                click: () => chatsController.deleteUser(parseInt((this.children.input as Input).getValue()), store.getState().selectedChatId!)
            }
        })
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
