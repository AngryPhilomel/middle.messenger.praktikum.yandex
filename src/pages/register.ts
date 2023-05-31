import Handlebars from "handlebars";
import form from "../templates/form/form.tmpl.ts";

document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app')
    const template = Handlebars.compile(form)

    root!.innerHTML = template({
        heading: 'Sign up',
        inputs: [
            {label: 'First Name', name: 'first_name', type:'text'},
            {label: 'Second Name', name: 'second_name', type:'text'},
            {label: 'Login', name: 'login', type:'text'},
            {label: 'Email', name: 'email', type:'email'},
            {label: 'Password', name: 'password', type:'password'},
            {label: 'Phone', name: 'phone', type:'text'},
        ],
        formButton: {text: 'Sign up'},
        altButton: {text: 'Sign in', href: '../index.html'}
    })
})