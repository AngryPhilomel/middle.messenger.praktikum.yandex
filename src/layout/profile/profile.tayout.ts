import styles from './profile.module.css'
export default `
{{#> centeredFullscreen}}
    {{#*inline "content"}}
        <main class="${styles['profile-layout']}">
            <div class="${styles['profile-layout__avatar']}">
                {{> avatar}}
            </div>
            <form>
                {{> content}}
                <div class="${styles['profile-layout__buttons']}">
                    {{> buttons}}
                </div>
            </form>
        </main>
    {{/inline}}
{{/centeredFullscreen}}
`