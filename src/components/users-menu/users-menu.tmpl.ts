import styles from "./users-menu.module.css";
// language=hbs
const tmpl = () => `
<form class="${styles["users-menu"]}">
{{{input}}}
{{{addButton}}}
{{{deleteButton}}}
</form>
`;

export default tmpl;
