import styles from "./error.module.css";
// language=hbs

export const tmpl = () => `
    <main class="${styles["error"]}">
        <h1 class="${styles["error--title"]}">{{errorCode}}</h1>
        <span class="${styles["error--text"]}">{{errorText}}</span>
        {{{backButton}}}
    </main>
`;

export default tmpl;
