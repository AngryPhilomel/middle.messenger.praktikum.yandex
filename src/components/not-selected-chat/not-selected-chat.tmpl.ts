import styles from "./not-selected-chat.module.css";
// language=hbs
const tmpl = () => `
    <div class="${styles["empty-chat"]}">
        <p>Select chat to write message</p>
    </div>
`;

export default tmpl;
