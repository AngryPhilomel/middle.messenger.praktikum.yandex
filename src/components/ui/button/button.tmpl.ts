import styles from "./button.module.css";
// language=hbs

const buttonTmpl = () => `
    <button class="${styles["button"]}
    {{#if negative}}
        ${styles["button_negative"]}
    {{/if}}
    " type="{{type}}">{{text}}</button>
`;

export default buttonTmpl;
