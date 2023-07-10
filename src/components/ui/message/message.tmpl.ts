import styles from "./message.module.css";
// language=hbs
const tmpl = (localTime: string) => `
    <div class="${styles["message"]}
{{#if isMyself}}
        ${styles["message_myself"]}
{{/if}}
">
        {{#if isFile}}
            {{#if isImage}}
                    <img class="${styles["message_image"]}" src="https://ya-praktikum.tech/api/v2/resources/{{message.file.path}}"/>
            {{else}}
                <a href="{{message.file.path}}">{{message.file.filename}}</a>
            {{/if}}
        {{else}}
            <p>
                {{message.content}}
            </p>
        {{/if}}
        <span>${localTime}</span>
    </div>
`;

export default tmpl;
