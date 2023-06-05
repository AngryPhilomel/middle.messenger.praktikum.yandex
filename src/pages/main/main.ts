import Handlebars from "handlebars";
import main from './main.tmpl.ts'
document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app')
    const template = Handlebars.compile(main)

    root!.innerHTML = template({
        chats: [
            {
                "id": 123,
                "title": "my-chat",
                "avatar": "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
                "unread_count": 15,
                "last_message": {
                    "user": {
                        "first_name": "Petya",
                        "second_name": "Pupkin",
                        "avatar": "/path/to/avatar.jpg",
                        "email": "my@email.com",
                        "login": "userLogin",
                        "phone": "8(911)-222-33-22"
                    },
                    "time": "2023-06-05T14:22:22.000Z",
                    "content": "this is message content this is message content this is message content"
                }
            },
            {
                "id": 123,
                "title": "my-chat",
                "avatar": "https://images.unsplash.com/photo-1485875437342-9b39470b3d95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
                "unread_count": 15,
                "last_message": {
                    "user": {
                        "first_name": "Petya",
                        "second_name": "Pupkin",
                        "avatar": "/path/to/avatar.jpg",
                        "email": "my@email.com",
                        "login": "userLogin",
                        "phone": "8(911)-222-33-22"
                    },
                    "time": "2020-01-02T14:22:22.000Z",
                    "content": "this is message content"
                }
            },
            {
                "id": 123,
                "title": "my-chat",
                "avatar": "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
                "unread_count": 15,
                "last_message": {
                    "user": {
                        "first_name": "Petya",
                        "second_name": "Pupkin",
                        "avatar": "/path/to/avatar.jpg",
                        "email": "my@email.com",
                        "login": "userLogin",
                        "phone": "8(911)-222-33-22"
                    },
                    "time": "2023-06-05T14:22:22.000Z",
                    "content": "this is message content this is message content this is message content"
                }
            },
            {
                "id": 123,
                "title": "my-chat",
                "avatar": "https://images.unsplash.com/photo-1485875437342-9b39470b3d95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
                "unread_count": 15,
                "last_message": {
                    "user": {
                        "first_name": "Petya",
                        "second_name": "Pupkin",
                        "avatar": "/path/to/avatar.jpg",
                        "email": "my@email.com",
                        "login": "userLogin",
                        "phone": "8(911)-222-33-22"
                    },
                    "time": "2020-01-02T14:22:22.000Z",
                    "content": "this is message content"
                }
            },
        ]
    })
})