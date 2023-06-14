import { BLOCK_EVENTS, BlockMeta, Props } from "./types.ts";
import EventBus from "./event-bus.ts";

export default abstract class Block {
    static EVENTS = BLOCK_EVENTS;

    private element: HTMLElement | null = null;

    private meta: BlockMeta;

    public props;

    private eventBus: () => EventBus;

    constructor(tagName = "div", props = {}) {
        const eventBus = new EventBus();
        this.meta = { tagName, props };
        this.props = this.makeProxyProps(props);
        this.eventBus = () => eventBus;
        this.registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(
            Block.EVENTS.FLOW_CDM,
            this.dispatchComponentDidMount.bind(this)
        );
        eventBus.on(
            Block.EVENTS.FLOW_CDU,
            this.dispatchComponentDidUpdate.bind(this)
        );
        eventBus.on(Block.EVENTS.FLOW_RENDER, this.dispatchRender.bind(this));
    }

    private init() {
        this.createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private createResources() {
        const { tagName } = this.meta;
        this.element = Block.createDocumentElement(tagName);
    }

    private dispatchComponentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    public componentDidMount() {}

    private dispatchComponentDidUpdate(oldProps: Props, newProps: Props) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    public componentDidUpdate(oldProps: Props, newProps: Props) {
        return oldProps !== newProps;
    }

    public dispatchRender() {
        const block = this.render();
        if (!this.element) {
            throw new Error("No element found");
        }
        this.element.innerHTML = block;
    }

    public render() {
        return `<div>Hello World<div>`;
    }

    public setProps(nextProps: Props) {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    }

    getContent() {
        if (!this.element) {
            throw new Error("No element found");
        }
        return this.element;
    }

    private makeProxyProps(props: Props) {
        const self = this;
        return new Proxy(props, {
            set(target, prop: string, value) {
                target[prop] = value;
                self.eventBus().emit(
                    Block.EVENTS.FLOW_CDU,
                    { ...target },
                    target
                );
                return true;
            },
            deleteProperty(..._) {
                throw new Error("нет доступа");
            },
        });
    }

    static createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    public show() {
        this.getContent().style.display = "block";
    }

    public hide() {
        this.getContent().style.display = "none";
    }
}
