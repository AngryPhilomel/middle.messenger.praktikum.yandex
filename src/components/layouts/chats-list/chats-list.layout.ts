import styles from "./chats-list.module.css";
// language=hbs

export const tmpl = () => `
    <ul class="${styles["chats-list"]}">
        {{{chats}}}
    </ul>
`;

export default tmpl;
