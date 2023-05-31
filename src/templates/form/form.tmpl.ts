import styles from './form.module.css'
//language=hbs
export default`
    {{#> centeredFullscreen}}
        {{#*inline "content"}}
            <div class="${styles['form']}">
                <h1 class="${styles['form__title']}">{{heading}}</h1>
                <form class="${styles['form__form']}">
                    <div>
                    {{#each inputs}}
                        {{>input name=name label=label type=type}}
                    {{/each}}
                    </div>
                    <div class="${styles['form__buttons']}">
                        {{>button text=formButton.text type='submit'}}
                        {{>link text=altButton.text href=altButton.href}}
                    </div>
                </form>
            </div>
        {{/inline}}
    {{/centeredFullscreen}}
`
