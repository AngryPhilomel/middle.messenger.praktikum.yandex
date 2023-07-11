import Handlebars from "handlebars";
import tmpl from "./profile.tmpl.ts";
import Block from "../../core/block.ts";
import CenteredLayout from "../../components/layouts/centered-layout";
import ProfileLayout, {
    ProfileFormTypes,
} from "../../components/layouts/profile";
import { Routes } from "../../index.ts";
import store from "../../core/store.ts";

export default class Profile extends Block {
    constructor() {
        super({});
    }

    protected init() {
        super.init();
        this.children.root = new CenteredLayout({
            child: new ProfileLayout({
                backLink: Routes.Messenger,
                user: store.getState().user!,
                withAvatar: true,
                profileFormType: ProfileFormTypes.PROFILE,
            }),
        });
    }

    componentDidMount() {}

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
