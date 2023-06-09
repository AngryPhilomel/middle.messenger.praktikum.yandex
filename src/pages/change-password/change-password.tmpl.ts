//language=hbs
export default `
    {{#> profileLayout}}
        {{#*inline "avatar"}}
        {{/inline}}
        {{#*inline "inputs"}}
            {{> input name='oldPassword' label='Old password' type='password'}}
            {{> input name='newPassword' label='New password' type='password'}}
            {{> input name='newPasswordRepeat' label='New password repeat' type='password'}}
        {{/inline}}
        {{#*inline "buttons"}}
            {{> button text='Save' type='submit'}}
        {{/inline}}
    {{/profileLayout}}
`;
