import Route from "./route.ts";
import Block from "./block.ts";
import authController from "../controllers/auth-controller.ts";
import { Routes } from "../index.ts";

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

    public use(
        pathname: string,
        block: BlockConstructable,
        isProtected: boolean,
    ) {
        const route = new Route(pathname, block, isProtected);
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

    private async _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            this.go("/404");
            return;
        }

        if (route.isProtected) {
            try {
                await authController.getUser();
            } catch (e) {
                this.go(Routes.Login);
                return;
            }
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
