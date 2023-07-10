import styles from "./message-form.module.css";
// language=hbs
const tmpl = () => `
<form>
    <div class="${styles["message-form"]}">
        <label type="button" class="${styles["message-form__button"]} ${styles["message-form__button_attach"]}">
            {{{attachField}}}
        </label>
        <div class="${styles["message-form__input"]}">{{{messageField}}}</div>
        <button class="${styles["message-form__button"]} ${styles["message-form__button_send"]}" type="submit"></button>
    </div>
</form>
`;

export default tmpl;
