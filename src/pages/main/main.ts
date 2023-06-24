import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "./main.tmpl.ts";
import TwoSideLayout from "../../components/layouts/two-side";
import ChatsController from "../../controllers/chats-controller.ts";

interface MessengerProps extends Record<string, unknown> {
    root: Block;
}
class Messenger extends Block<MessengerProps> {
    constructor(props: MessengerProps) {
        super(props);
        ChatsController.getChats();
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}

const page = new Messenger({
    root: new TwoSideLayout({}),
});

document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");
    root!.append(page.getContent());
});
