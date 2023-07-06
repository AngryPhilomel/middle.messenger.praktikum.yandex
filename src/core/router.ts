import Route from "./route.ts";
import Block from "./block.ts";

export interface BlockConstructable<P extends Record<string, unknown> = any> {
    new (props: P): Block<P>;
}

class Router {
    private static __instance: Router | null = null;

    private routes: Route[] = [];

    private history = window.history;

    private currentRoute: Route | null = null;

    constructor() {
        if (Router.__instance) {
            // eslint-disable-next-line no-constructor-return
            return Router.__instance;
        }

        Router.__instance = this;
    }

    public use(pathname: string, block: BlockConstructable) {
        const route = new Route(pathname, block);
        this.routes.push(route);
        return this;
    }

    public start() {
        window.onpopstate = (event: PopStateEvent) => {
            this._onRoute((event.currentTarget as Window).location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    public go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            this.go("/404");
            return;
        }

        if (this.currentRoute) {
            this.currentRoute.leave();
        }
        this.currentRoute = route;

        route.render();
    }

    private getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }
}

export default new Router();
