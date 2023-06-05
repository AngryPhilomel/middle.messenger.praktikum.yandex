import Handlebars from "handlebars";
import changeProfile from "./change-profile.tmpl.ts";

document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");
    const template = Handlebars.compile(changeProfile);

    root!.innerHTML = template({
        backHref: "../profile/profile.html",
        user: {
            id: 123,
            first_name: "Petya",
            second_name: "Pupkin",
            display_name: "Petya Pupkin",
            login: "userLogin",
            email: "my@email.com",
            phone: "89223332211",
            avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        },
    });
});
