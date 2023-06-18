import styles from "./chat.module.css";
import { ChatItem } from "../../core/types.ts";
import toLocalTime from "../../utils/toLocalTime.ts";
// language=hbs
const tmpl = (chat: ChatItem, isSelected: boolean) => `
    <li role="button" class="${styles["chat"]} ${
    isSelected ? styles["chat__selected"] : ""
}">
        <div class="${styles["chat__avatar"]}">
            {{{avatar}}}
        </div>
        <span class="${styles["chat__name"]}">
            ${chat.last_message.user.login}
        </span>
        <p class="${styles["chat__message"]}">
            ${chat.last_message.content}
        </p>
        <span class="${styles["chat__time"]}">
            ${toLocalTime(chat.last_message.time)}
        </span>
        ${
            chat.unread_count > 0
                ? `<span class="${styles["chat__new"]}">
                    ${chat.unread_count}
                    </span>`
                : ""
        }
    </li>
`;

export default tmpl;
