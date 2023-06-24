import styles from "./message.module.css";
// language=hbs
const tmpl = (localTime: string) => `
    <div class="${styles["message"]}
{{#if isMyself}}
        ${styles["message_myself"]}
{{/if}}
">
        <p>
        {{message.content}}
        </p>
        <span>${localTime}</span>
    </div>
`;

export default tmpl;
