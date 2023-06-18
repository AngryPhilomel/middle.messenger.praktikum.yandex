import { nanoid } from "nanoid";
import { BLOCK_EVENTS, Props } from "./types.ts";
import EventBus from "./event-bus.ts";

export default abstract class Block<T extends Record<string, unknown> = any> {
    static EVENTS = BLOCK_EVENTS;

    public id = nanoid(6);

    private element: HTMLElement | null = null;

    public children: Record<string, Block | Block[]>;

    protected props: T;

    private eventBus: () => EventBus;

    constructor(propsWithChildred: T) {
        const eventBus = new EventBus();
        const { props: parsedProps, children } =
            this.getChildrenAndProps(propsWithChildred);
        this.children = children;
        this.props = this.makeProxyProps(parsedProps);
        this.eventBus = () => eventBus;
        this.registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private getChildrenAndProps(childrenAndProps: T): {
        props: T;
        children: Record<string, Block | Block[]>;
    } {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block | Block[]> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (
                Array.isArray(value) &&
                value.length > 0 &&
                value.every((v) => v instanceof Block)
            ) {
                children[key] = value;
            } else if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { props: props as T, children };
    }

    private registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _init() {
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() {}

    private _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    public componentDidMount() {}

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidUpdate(oldProps: Props, newProps: Props) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    public componentDidUpdate(oldProps: Props, newProps: Props) {
        return oldProps !== newProps;
    }

    private _render() {
        console.log(this.element?.firstElementChild?.firstElementChild);
        const block = this.render();
        const newElement = block.firstElementChild as HTMLElement;
        if (this.element && newElement) {
            this.element.replaceWith(newElement);
        }
        this.element = newElement;
        this._addEvents();
    }

    public render(): DocumentFragment {
        return document.createElement("template").content;
    }

    protected compile(
        template: (context: Record<string, unknown>) => string,
        context: Record<string, unknown>
    ) {
        const contextAndStubs = { ...context };

        Object.entries(this.children).forEach(([name, component]) => {
            if (Array.isArray(component)) {
                contextAndStubs[name] = component.map(
                    (c) => `<div data-id=${c.id}></div>`
                );
                // .join("");
            } else {
                contextAndStubs[name] = `<div data-id=${component.id}></div>`;
            }
        });

        const html = template(contextAndStubs);
        const temp = document.createElement("template");
        temp.innerHTML = html;

        const replaceStub = (component: Block) => {
            const stub = temp.content.querySelector(
                `[data-id="${component.id}"]`
            );
            if (!stub) {
                return;
            }
            component.getContent()?.append(...Array.from(stub.childNodes));
            stub.replaceWith(component.getContent());
        };

        Object.entries(this.children).forEach(([_, component]) => {
            if (Array.isArray(component)) {
                component.forEach(replaceStub);
            } else {
                replaceStub(component);
            }
        });

        return temp.content;
    }

    private _addEvents() {
        const { events } = this.props as T & {
            events: Record<string, () => void>;
        };
        if (!events) {
            return;
        }

        Object.keys(events).forEach((eventName) => {
            console.log(eventName);
            this.element?.addEventListener(eventName, events[eventName]);
        });
    }

    public setProps(nextProps: Props) {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    }

    getContent() {
        if (!this.element) {
            throw new Error("No element found");
        }
        return this.element;
    }

    private makeProxyProps(props: T) {
        const self = this;
        return new Proxy(props, {
            set(target, prop: string, value) {
                const oldTarget = { ...target };
                target[prop as keyof T] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
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
