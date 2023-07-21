import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "./chat-menu.tmpl.ts";
import Button from "../ui/button/index.ts";
import store from "../../core/store.ts";
import chatsController from "../../controllers/chats-controller.ts";
import UsersMenu from "../users-menu/index.ts";
import Input from "../ui/input";

export default class ChatMenu extends Block {
    constructor() {
        super({}, "button");
    }

    async updateChatAvatar(
        e: Event & { target: HTMLInputElement & { files: FileList } },
    ) {
        const img = e.target.files[0];
        if (img.type.match("image")) {
            const formData = new FormData();
            formData.set("avatar", img);
            formData.set("chatId", `${store.getState().selectedChatId!}`);
            await chatsController.updateAvatar(formData);
        }
    }

    init() {
        this.on("click", (e) => {
            const event = e as PointerEvent & {
                target: { parentNode: Element };
            };
            const menu = event.target?.parentNode?.querySelector("div");
            if (!menu) {
                return;
            }
            menu.setAttribute(
                "data-visible",
                menu.getAttribute("data-visible") === "false"
                    ? "true"
                    : "false",
            );
        });
        this.children.usersMenu = new UsersMenu();
        this.children.updateAvatar = new Input({
            type: "file",
            events: {
                change: this.updateChatAvatar.bind(this),
            },
        });
        this.children.updateAvatarButton = new Button({
            type: "button",
            text: "Update Avatar",
            events: {
                click: (
                    e: Event & { target: { parentNode: HTMLDivElement } },
                ) => {
                    const input = e.target.parentNode.querySelector("input");
                    if (!input) {
                        return;
                    }
                    input.click();
                },
            },
        });
        this.children.deleteButton = new Button({
            type: "button",
            text: "Delete chat",
            negative: true,
            events: {
                click: () =>
                    chatsController.deleteChat(
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
