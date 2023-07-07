import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import tmpl from "./avatar.tmpl.ts";

interface AvatarProps extends Record<string, unknown> {
    small?: boolean;
    medium?: boolean;
    changeable?: boolean;
    changeLink?: Block;
    id?: string;
    src?: string;
}
const base = "https://ya-praktikum.tech/api/v2/resources";

export default class Avatar extends Block<AvatarProps> {
    constructor(props: AvatarProps) {
        super(props);
    }

    protected init() {
        if (!this.props.src?.startsWith("image")) {
            this.setProps({
                src: base + this.props.src,
            });
        }
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
