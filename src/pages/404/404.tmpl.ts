//language=hbs
export default`
    {{#> errorLayout}}
        {{#*inline "errorCode"}}
            404
        {{/inline}}
        {{#*inline "errorText"}}
            Not found
        {{/inline}}
    {{/errorLayout}}
`
