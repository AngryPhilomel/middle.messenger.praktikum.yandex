import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "./main.tmpl.ts";
import TwoSideLayout from "../../components/layouts/two-side";
import ChatsController from "../../controllers/chats-controller.ts";

class Messenger extends Block {
    constructor() {
        super({});
        ChatsController.getChats();
    }

    protected init() {
        this.children.root = new TwoSideLayout({});
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}

const page = new Messenger();

document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");
    root!.append(page.getContent());
});
