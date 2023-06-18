import styles from "./two-side.module.css";

// language=hbs
const tmpl = () => `
    <div class="${styles["two-side"]}">
        <aside class="${styles["two-side__aside"]}">
            <div class="${styles["two-side__aside__header"]}">
                {{{toProfile}}}
                {{{search}}}
            </div>
            <ul class="${styles["two-side__aside__chats"]}">
                {{{side}}}
            </ul>
        </aside>
        <main class="${styles["two-side__main"]}">
            {{{main}}}
        </main>
    </div>
`;

export default tmpl;