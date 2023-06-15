import styles from "./input.module.css";
// language=hbs
const tmpl = () => `
    <div class="${styles["input"]}">
        <label class="${styles["input__label"]}">{{label}}
            <input class="${styles["input__input"]}" name="{{name}}" type="{{type}}" autocomplete="off" 
                {{#if disabled}}
                disabled={{disabled}}
                {{/if}}
                {{#if placeholder}}
                placeholder={{placeholder}}
                {{/if}}
                {{#if value}}
                value={{value}}
                {{/if}}
                {{#if accept}}
                accept={{accept}}
                {{/if}}
                {{#if id}}
                id={{id}}
                {{/if}}
                />
        </label>
        <span class="${styles["input__error"]}">
            {{#if error}}
                {{error}}
            {{/if}}
        </span>
    </div>
`;

export default tmpl;
