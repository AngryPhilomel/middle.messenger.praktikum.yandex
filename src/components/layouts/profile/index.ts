import Handlebars from "handlebars";
import Block from "../../../core/block.ts";
import tmpl from "./profile.tayout.ts";
import Link from "../../ui/link";
import { Routes } from "../../../index.ts";
import Avatar from "../../ui/avatar";
import { UserResponse } from "../../../core/types.ts";
import Input from "../../ui/input";
import FormLayout from "../form";
import store from "../../../core/store.ts";
import Button from "../../ui/button";
import userController from "../../../controllers/user-controller.ts";
import {
    UpdatePasswordData,
    UpdateProfileData,
} from "../../../api/user-api.ts";

export enum ProfileFormTypes {
    PROFILE,
    SETTING,
    CHANGE_PASSWORD,
    CHANGE_AVATAR,
}
interface ProfileLayoutProps extends Record<string, unknown> {
    backLink: Routes;
    user: UserResponse;
    withAvatar: boolean;
    profileFormType: ProfileFormTypes;
}
export default class ProfileLayout extends Block<ProfileLayoutProps> {
    constructor(props: ProfileLayoutProps) {
        super(props);
    }

    protected init() {
        this.children.backButton = new Link({
            text: "❮ Back",
            href: this.props.backLink,
        });

        this.children.avatar = this.props.withAvatar
            ? new Avatar({
                  src: this.props.user?.avatar,
                  changeable:
                      this.props.profileFormType === ProfileFormTypes.PROFILE,
                  changeLink: new Link({
                      text: "change avatar",
                      href: Routes.ChangeAvatar,
                  }),
              })
            : [];

        this.children.form = new FormLayout({
            onSubmit: this.getSubmitAction(this.props.profileFormType),
            inputs: this.getInputsFabric(this.props.profileFormType)(
                store.getState().user!
            ).map((input) => new Input({ ...input }, input.rules)),
            buttons: this.getButtons(this.props.profileFormType),
        });
    }

    render() {
        const template = Handlebars.compile(tmpl());
        return this.compile(template, this.props);
    }

    private getSubmitAction(type: ProfileFormTypes) {
        switch (type) {
            case ProfileFormTypes.SETTING:
                return (data: unknown) => {
                    userController.updateProfile(data as UpdateProfileData);
                };
            case ProfileFormTypes.CHANGE_AVATAR:
                return (data: unknown) => {
                    userController.updateAvatar(data as FormData);
                };
            case ProfileFormTypes.CHANGE_PASSWORD:
                return (data: unknown) => {
                    userController.updatePassword(data as UpdatePasswordData);
                };
            default:
                return (data: unknown) => {
                    console.log(data);
                };
        }
    }

    private getButtons(type: ProfileFormTypes) {
        switch (type) {
            case ProfileFormTypes.PROFILE:
                return [
                    new Link({
                        text: "Change profile data",
                        href: Routes.ChangeProfile,
                    }),
                    new Link({
                        text: "Change password",
                        href: Routes.ChangePassword,
                    }),
                    new Link({
                        text: "Logout",
                        href: Routes.Logout,
                        negative: true,
                    }),
                ];
            case ProfileFormTypes.SETTING:
            case ProfileFormTypes.CHANGE_PASSWORD:
            case ProfileFormTypes.CHANGE_AVATAR:
                return new Button({
                    text: "Save",
                    type: "submit",
                });
            default:
                throw new Error("Wrong form type");
        }
    }

    private getInputsFabric(type: ProfileFormTypes) {
        switch (type) {
            case ProfileFormTypes.PROFILE:
                return (user: UserResponse) =>
                    this.getProfileInputsArray(user, true);
            case ProfileFormTypes.SETTING:
                return (user: UserResponse) =>
                    this.getProfileInputsArray(user, false);
            case ProfileFormTypes.CHANGE_PASSWORD:
                return (_user: UserResponse) => this.getPasswordInputsArray();
            case ProfileFormTypes.CHANGE_AVATAR:
                return (_user: UserResponse) => this.getAvatarInputsArray();
            default:
                throw new Error("Wrong form type");
        }
    }

    getAvatarInputsArray() {
        return [
            {
                id: "avatarUpload",
                name: "avatar",
                label: "Avatar",
                type: "file",
                accept: "image/*",
                events: {
                    change: this.showAvatar.bind(this),
                },
                rules: [],
            },
        ];
    }

    private showAvatar(
        e: Event & { target: HTMLInputElement & { files: FileList } }
    ) {
        const img = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            if (this.children.avatar) {
                (this.children.avatar as Avatar).setProps({
                    src: e.target?.result as string,
                });
            }
        };
        reader.readAsDataURL(img);
    }

    private getPasswordInputsArray() {
        return [
            {
                name: "oldPassword",
                label: "Old password",
                type: "password",
                rules: [
                    Input.VALIDATE_RULES.REQUIRED,
                    Input.VALIDATE_RULES.PASSWORD,
                ],
            },
            {
                name: "newPassword",
                label: "New password",
                type: "password",
                rules: [
                    Input.VALIDATE_RULES.REQUIRED,
                    Input.VALIDATE_RULES.PASSWORD,
                ],
            },
            {
                name: "newPasswordRepeat",
                label: "New password repeat",
                type: "password",
                rules: [
                    Input.VALIDATE_RULES.REQUIRED,
                    Input.VALIDATE_RULES.PASSWORD,
                ],
            },
        ];
    }

    private getProfileInputsArray(user: UserResponse, disabled: boolean) {
        return [
            {
                name: "email",
                value: user.email,
                label: "Email",
                type: "email",
                disabled,
                rules: [
                    Input.VALIDATE_RULES.REQUIRED,
                    Input.VALIDATE_RULES.EMAIL,
                ],
            },
            {
                name: "login",
                value: user.login,
                label: "Login",
                type: "text",
                disabled,
                rules: [
                    Input.VALIDATE_RULES.REQUIRED,
                    Input.VALIDATE_RULES.LOGIN,
                ],
            },
            {
                name: "first_name",
                value: user.first_name,
                label: "First name",
                type: "text",
                disabled,
                rules: [
                    Input.VALIDATE_RULES.REQUIRED,
                    Input.VALIDATE_RULES.NAME,
                ],
            },
            {
                name: "second_name",
                value: user.second_name,
                label: "Second name",
                type: "text",
                disabled,
                rules: [
                    Input.VALIDATE_RULES.REQUIRED,
                    Input.VALIDATE_RULES.NAME,
                ],
            },
            {
                name: "display_name",
                value: user.display_name,
                label: "Display name",
                type: "text",
                disabled,
            },
            {
                name: "phone",
                value: user.phone,
                label: "Phone",
                type: "number",
                disabled,
                rules: [
                    Input.VALIDATE_RULES.REQUIRED,
                    Input.VALIDATE_RULES.PHONE,
                ],
            },
        ];
    }
}
