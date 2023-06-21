import store from "../core/store.ts";

class MessagesController {
    getMessages() {
        store.set({ messages: mockMessages });
    }
}

const messagesController = new MessagesController();

export default messagesController;

const mockMessages = [
    {
        id: 1,
        user_id: 1,
        chat_id: 1,
        time: "2020-01-02T14:22:22.000Z",
        type: "message",
        content: "Hello!",
    },
    {
        id: 2,
        user_id: 2,
        chat_id: 1,
        time: "2020-01-02T14:22:23.000Z",
        type: "message",
        content: "Hello there!",
    },
    {
        id: 3,
        user_id: 1,
        chat_id: 1,
        time: "2020-01-02T14:22:24.000Z",
        type: "message",
        content: "How’s it going?",
    },
    {
        id: 4,
        user_id: 2,
        chat_id: 1,
        time: "2020-01-02T14:22:25.000Z",
        type: "message",
        content: "Fine, tnx!",
    },
];
