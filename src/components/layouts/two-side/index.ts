import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import tmpl from "./two-side.layout.ts";
import Link from "../../ui/link";
import Input from "../../ui/input";

interface TwoSideLayoutProps extends Record<string, unknown> {
    side: Block | Block[];
    main: Block;
}

export default class TwoSideLayout extends Block<TwoSideLayoutProps> {
    constructor(props: TwoSideLayoutProps) {
        super(props);
    }

    init() {
        this.children.toProfile = new Link({
            text: "Profile ❯",
            href: "../../pages/profile/profile.html",
        });

        const search = new Input({
            placeholder: "Search",
            events: {
                click: () => console.log("CHANGE"),
            },
        });
        setInterval(() => {
            search.setProps({
                placeholder: +new Date(),
            });
        }, 1000);
        this.children.search = search;
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
