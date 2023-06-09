import styles from "./link.module.css";
//language=hbs
export default `
    <a class="${styles["link"]}
    {{#if negative}}
        ${styles["link_negative"]}
    {{/if}}
    " href={{href}}>{{text}}</a>
`;
