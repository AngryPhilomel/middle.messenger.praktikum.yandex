import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "./chat-menu.tmpl.ts";
import Button from "../ui/button/index.ts";
import store from "../../core/store.ts";
import chatsController from "../../controllers/chats-controller.ts";
import UsersMenu from "../users-menu/index.ts";

export default class ChatMenu extends Block {
    constructor() {
        super({}, 'button')
    }

    init() {
        this.on('click', (e) => {
            const event = e as PointerEvent & { target: { parentNode: Element } }
            const menu = event.target?.parentNode?.querySelector('div')
            if (!menu) {
                return
            }
            menu.setAttribute('data-visible', menu.getAttribute('data-visible') === 'false' ? 'true' : 'false')
        })
        this.children.usersMenu = new UsersMenu({})
        this.children.deleteButton = new Button({
            type: "button",
            text: "Delete chat",
            events: {
                click: () => chatsController.deleteChat(store.getState().selectedChatId!)
            }
        })
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
