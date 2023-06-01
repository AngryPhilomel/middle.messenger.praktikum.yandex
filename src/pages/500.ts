import Handlebars from "handlebars";
import error from "../templates/error/error.tmpl.ts";

document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app')
    const template = Handlebars.compile(error)

    root!.innerHTML = template({
        errorCode: '500',
        errorText: 'We\'re already fixing it',
        backButton: {text: 'Back to app', href: '../../index.html'}
    })
})