//language=hbs
export default `
    {{#> twoSide}}
        {{#* inline "side"}}
            {{#each chats as |c|}}
                {{> chat c}}
            {{/each}}
        {{/inline}}
        {{#* inline "main"}}
            {{> emptyChat }}
        {{/inline}}
    {{/twoSide}}
`;
