//language=hbs
export default `
    {{#> formLayout}}
        {{#*inline "inputs"}}
            {{#each inputs}}
                {{>input name=name label=label type=type}}
            {{/each}}
        {{/inline}}
        {{#*inline "buttons"}}
            {{>button text=formButton.text type='submit'}}
            {{>link text=altButton.text href=altButton.href}}
        {{/inline}}
    {{/formLayout}}
`;
