import styles from "./form.module.css";
//language=hbs
export default `
    {{#> centeredFullscreen}}
        {{#*inline "content"}}
            <main class="${styles["form"]}">
                <h1 class="${styles["form__title"]}">{{heading}}</h1>
                <form class="${styles["form__form"]}">
                    <div class="${styles["form__inputs"]}">
                        {{> inputs}}
                    </div>
                    <div class="${styles["form__buttons"]}">
                        {{> buttons}}
                    </div>
                </form>
            </main>
        {{/inline}}
    {{/centeredFullscreen}}
`;
