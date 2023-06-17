import styles from "./centered-layout.module.css";
// language=hbs
export default `
    <div class="${styles["centered"]}">
        <div class="${styles["centered__content"]}">
        {{{child}}}
        </div>
    </div>
`;
