import styles from "./selected-chat.module.css";
// language=hbs
const tmpl = () => `
    <div class="${styles["selected"]}">
        <div class="${styles["selected__header"]}">
            {{{avatar}}}
            <span class="${styles["selected__header__chat-name"]}">{{chat.title}}</span>
            <button id="chat-menu" class="${styles["selected__header__menu"]}"></button>
        </div>
        <div class="${styles["selected-messages"]}">{{chat.id}}</div>
        <form>
            <div class="${styles["selected__footer"]}">
                <ul id="attach-menu" class="${styles["selected__footer__attach-menu"]}" data-visible="false">
                    <li>Photo or Video</li>
                    <li>File</li>
                    <li>Location</li>
                </ul>
                <button id="message-attach" class="${styles["selected__footer__button"]} ${styles["selected__footer__button_attach"]}"></button>
                <div class="${styles["selected__footer__input"]}">{{{message}}}</div>
                <button class="${styles["selected__footer__button"]} ${styles["selected__footer__button_send"]}" type="submit"></button>
            </div>
        </form>
    </div>
`;

export default tmpl;
