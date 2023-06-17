// language=hbs

const tmpl = () => `{{{root}}}`;

export default tmpl;

//         {{#* inline "main"}}
//             {{#if selectedChat}}
//                 {{> selectedChat chat=selectedChat }}
//             {{else}}
//                 {{> emptyChat }}
//             {{/if}}
//         {{/inline}}
