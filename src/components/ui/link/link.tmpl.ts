import styles from "./link.module.css";
// language=hbs
const tmpl = () => `
    <a class="${styles["link"]}
    {{#if negative}}
        ${styles["link_negative"]}
    {{/if}}
    ">{{text}}</a>
`;
export default tmpl;
