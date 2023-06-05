//language=hbs

export default`
    {{#> profileLayout}}
        {{#*inline "avatar"}}
            {{> avatar src=user.avatar id='avatar'}}
        {{/inline}}
        {{#*inline "inputs"}}
                {{> input id='avatarUpload' name='avatar' label='Avatar' type='file' accept='image/*' }}
        {{/inline}}
        {{#*inline "buttons"}}
            {{> button text='Save' type='submit'}}
        {{/inline}}
    {{/profileLayout}}
`