import styles from "./two-side.module.css";

//language=hbs
export default `
    <div class="${styles["two-side"]}">
        <aside class="${styles["two-side__aside"]}">
            <div class="${styles["two-side__aside__header"]}">
                {{> link text='Profile ❯' href='../../pages/profile/profile.html'}}
                {{> input placeholder='Search'}}
            </div>
            <ul class="${styles["two-side__aside__chats"]}">
                {{> side}}
            </ul>
        </aside>
        <main class="${styles["two-side__main"]}">
            {{> main}}
        </main>
    </div>
`;
