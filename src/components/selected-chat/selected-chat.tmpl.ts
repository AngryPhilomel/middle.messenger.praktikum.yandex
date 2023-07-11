import styles from "./selected-chat.module.css";
// language=hbs
const tmpl = () => `
    <div class="${styles["selected"]}">
        <div class="${styles["selected__header"]}">
            {{{avatar}}}
            <span class="${styles["selected__header__chat-name"]}">{{chat.title}}</span>
        <div class="${styles["selected__header__menu"]}">{{{chatMenu}}}</div>
        </div>
        <div class="${styles["selected-messages"]}">{{{messageFeed}}}</div>
        {{{message}}}
    </div>
`;

export default tmpl;
