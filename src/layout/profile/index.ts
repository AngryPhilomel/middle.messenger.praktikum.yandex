import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "./profile.tayout.ts";

interface ProfileProps extends Record<string, unknown> {
    backButton: Block;
    avatar?: Block;
    inputs: Block | Block[];
    buttons: Block | Block[];
}
export default class ProfileLayout extends Block<ProfileProps> {
    constructor(public props: ProfileProps) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
