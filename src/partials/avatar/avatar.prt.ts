import styles from "./avatar.module.css";
import none from "./assets/none.svg";
//language=hbs
export default `
    <div class="${styles["avatar"]}">
        <image class="${styles["avatar__image"]}
            {{#if small}}
                ${styles["avatar__image_small"]}
            {{/if}}
            {{#if medium}}
                ${styles["avatar__image_medium"]}
            {{/if}}
            "
            {{#if id}}
            id="{{id}}"
            {{/if}}
            {{#if src}}
                src={{src}}
            {{else}}
                src="${none}"
            {{/if}}
            ></image>
            {{#if changeable}}
                    <div class="${styles["avatar__menu"]}">
                            {{> link text='change avatar' href=href}}
                    </div>
            {{/if}}
    </div>
`;
