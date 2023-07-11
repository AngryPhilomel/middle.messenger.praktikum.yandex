import styles from "./chat-menu.module.css";
// language=hbs
const tmpl = () => `
<div class="${styles["menu"]}">
    <button id="chat-menu" class="${styles["menu__button"]}"></button>
    <div class="${styles["menu__area"]}" data-visible="false">
        {{{usersMenu}}}
        <div class="${styles["menu__avatar-button"]}">
            {{{updateAvatarButton}}}
            {{{updateAvatar}}}
        </div>
        {{{deleteButton}}}
    </div>
</div>
`;

export default tmpl;
