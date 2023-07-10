import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "./search.tmpl.ts";
import Input from "../ui/input/index.ts";
import Button from "../ui/button/index.ts";
import chatsController from "../../controllers/chats-controller.ts";

export default class Search extends Block {
    init() {
        this.children.searchField = new Input({
            placeholder: "Search or create",
            name: "title",
        });
        this.children.createButton = new Button({
            type: "submit",
            text: "Create",
        });

        this.on("submit", async (e) => {
            const event = e as SubmitEvent & { target: HTMLFormElement };
            event.preventDefault();
            const title = this.children.searchField as Input;
            await chatsController.createNewChat(title.getValue());
            event.target.reset();
        });
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
