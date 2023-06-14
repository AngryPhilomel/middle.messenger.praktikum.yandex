// language=hbs
export default `
    {{#> formLayout}}
        {{#*inline "inputs"}}
            {{#each inputs}}
                {{>input name=name label=label type=type}}
            {{/each}}
        {{/inline}}
        {{#*inline "buttons"}}
            {{{ SubmitButton }}}
            {{>link text=altButton.text href=altButton.href}}
        {{/inline}}
    {{/formLayout}}
`;

// {{>button text=formButton.text type='submit'}}
