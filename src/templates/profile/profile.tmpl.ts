import styles from './profile.module.css'
//language=hbs
export default`
    {{#> centeredFullscreen}}
        {{#*inline "content"}}
            <div class="${styles['profile']}">
                <div class="${styles['profile__avatar']}">
                    {{> avatar src=user.avatar changeable=true}}
                </div>
                {{> input name=email value=user.email label='Email' type='email' disabled=true }}
                {{> input name=login value=user.login label='Login' type='text' disabled=true }}
                {{> input name=first_name value=user.first_name label='First name' type='text' disabled=true }}
                {{> input name=second_name value=user.second_name label='Second name' type='text' disabled=true }}
                {{> input name=display_name value=user.display_name label='Display name' type='text' disabled=true }}
                {{> input name=phone value=user.phone label='Phone' type='number' disabled=true }}
                <div class="${styles['profile__buttons']}">
                    {{> link text='Change profile data' href='./change-profile.html'}}
                    {{> link text='Change password' href='./change-password.html'}}
                    {{> link text='Logout' href='./logout' negative=true}}
                </div>
            </div>
        {{/inline}}
    {{/centeredFullscreen}}
`