import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import tmpl from "./avatar.tmpl.ts";

interface AvatarProps extends Record<string, unknown> {
    small?: boolean;
    medium?: boolean;
    changeable?: boolean;
    id?: string;
    src?: string;
    href?: string;
}
export default class Avatar extends Block<AvatarProps> {
    constructor(public props: AvatarProps) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
