//language=hbs
export default `
    {{#> errorLayout}}
        {{#*inline "errorCode"}}
            500
        {{/inline}}
        {{#*inline "errorText"}}
            We're already fixing it
        {{/inline}}
    {{/errorLayout}}
`;
