''//language=hbs
export default`
    {{#> profileLayout}}
        {{#*inline "avatar"}}
        {{/inline}}
        {{#*inline "inputs"}}
                {{> input name='email' value=user.email label='Email' type='email'}}
                {{> input name='login' value=user.login label='Login' type='text'}}
                {{> input name='first_name' value=user.first_name label='First name' type='text'}}
                {{> input name='second_name' value=user.second_name label='Second name' type='text'}}
                {{> input name='display_name' value=user.display_name label='Display name' type='text'}}
                {{> input name='phone' value=user.phone label='Phone' type='number'}}
        {{/inline}}
        {{#*inline "buttons"}}
            {{> button text='Save' type='submit'}}
        {{/inline}}
    {{/profileLayout}}
`