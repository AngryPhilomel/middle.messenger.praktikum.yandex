import styles from "./centered-fullscreen.module.css";
//language=hbs
export default `
    <div class="${styles["centered"]}">
        <div class="${styles["centered__content"]}">
        {{> content}}
        </div>
    </div>
`;
