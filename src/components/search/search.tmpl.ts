import styles from "./search.module.css";
// language=hbs
const tmpl = () => `
<form class="${styles["search"]}">
    {{{searchField}}}
    {{{createButton}}}
</form>
`;

export default tmpl;
