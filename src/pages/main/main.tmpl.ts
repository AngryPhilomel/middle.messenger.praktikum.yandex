//language=hbs
export default `
    {{#> twoSide}}
        {{#* inline "side"}}
            {{#each chats as |c|}}
                {{> chat c}}
            {{/each}}
        {{/inline}}
        {{#* inline "main"}}
            {{#if selectedChat}}
                {{> selectedChat chat=selectedChat }}
            {{else}}
                {{> emptyChat }}
            {{/if}}
        {{/inline}}
    {{/twoSide}}
`;


