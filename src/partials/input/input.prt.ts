import styles from './input.module.css'
//language=hbs
export default `
    <div class="${styles.input}">
    <label class="${styles.input__label}">{{label}}
    <input class="${styles.input__input}" name="{{name}}" type="{{type}}" autocomplete="off" "/>
    </label>
        <span class="${styles.input__error}">
            {{#if error}}
                {{error}}
            {{/if}}
        </span>
    </div>
`