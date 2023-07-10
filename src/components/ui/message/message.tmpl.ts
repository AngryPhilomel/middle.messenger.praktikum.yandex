import styles from "./message.module.css";
// language=hbs
const tmpl = (localTime: string) => `
    <div class="${styles["message"]}
{{#if isMyself}}
        ${styles["message_myself"]}
{{/if}}
">
<span class="${styles["message__username"]}">
    {{#if user.display_name}}
        {{user.display_name}}
    {{else}}
        {{user.first_name}} {{user.second_name}}
    {{/if}}
</span>
        {{#if isFile}}
            {{#if isImage}}
                    <img class="${styles["message_image"]}" src="https://ya-praktikum.tech/api/v2/resources/{{message.file.path}}"/>
            {{else}}
                <a target="_blank" href="https://ya-praktikum.tech/api/v2/resources{{message.file.path}}">{{message.file.filename}}</a>
            {{/if}}
        {{else}}
            <p>
                {{message.content}}
            </p>
        {{/if}}
        <span class="${styles["message__timestamp"]}">${localTime}</span>
    </div>
`;

export default tmpl;
