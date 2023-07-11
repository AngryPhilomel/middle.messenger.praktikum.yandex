import Handlebars from "handlebars";
import Block from "../../core/block.ts";
import tmpl from "../change-password/change-password.tmpl.ts";
import CenteredLayout from "../../components/layouts/centered-layout";
import ProfileLayout, {
    ProfileFormTypes,
} from "../../components/layouts/profile";
import { Routes } from "../../index.ts";
import store from "../../core/store.ts";

export default class ChangeAvatar extends Block {
    constructor() {
        super({});
    }

    protected init() {
        this.children.root = new CenteredLayout({
            child: new ProfileLayout({
                backLink: Routes.Profile,
                user: store.getState().user!,
                withAvatar: true,
                profileFormType: ProfileFormTypes.CHANGE_AVATAR,
            }),
        });
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }
}
