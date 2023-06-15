import styles from "./link.module.css";
// language=hbs
const tmpl = () => `
    <a class="${styles["link"]}
    {{#if negative}}
        ${styles["link_negative"]}
    {{/if}}
    " href={{href}}>{{text}}</a>
`;
export default tmpl;
