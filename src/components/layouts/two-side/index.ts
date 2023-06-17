import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import tmpl from "./two-side.layout.ts";

interface TwoSideLayoutProps extends Record<string, unknown> {
    toProfile: Block;
    search: Block;
    side: Block | Block[];
    main: Block;
}
export default class TwoSideLayout extends Block<TwoSideLayoutProps> {
    constructor(public props: TwoSideLayoutProps) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
