import Block from "./block.ts";
import render from "../utils/renderDOM.ts";
import { BlockConstructable } from "./router.ts";

export default class Route {
    private block: Block | null = null;

    constructor(
        private pathname: string,
        private BlockClass: BlockConstructable,
        public isProtected: boolean
    ) {}

    public leave() {
        this.block = null;
    }

    public render() {
        if (!this.block) {
            this.block = new this.BlockClass({});

            render(this.block);
        }
    }

    public match(pathname: string) {
        return this.pathname === pathname;
    }
}
