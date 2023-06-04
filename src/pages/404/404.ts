import Handlebars from "handlebars";
import error from "./404.tmpl.ts";

document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app')
    const template = Handlebars.compile(error)

    root!.innerHTML = template({})
})