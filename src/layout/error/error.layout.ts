import styles from "./error.module.css";
//language=hbs
export default `
    {{#> centeredFullscreen}}
        {{#*inline "content"}}
            <main class="${styles["error"]}">
                <h1 class="${styles["error--title"]}">{{> errorCode}}</h1>
                <span class="${styles["error--text"]}">{{> errorText}}</span>
                {{>link text='Back to app' href='../index.html'}}
            </main>
        {{/inline}}
    {{/centeredFullscreen}}
`;
