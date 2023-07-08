import chatsApi from "../api/chats-api.ts";
import store from "../core/store.ts";
import MessagesController from "./messages-controller.ts";

class ChatsController {
    selectChat(id: number) {
        MessagesController.getMessages();
        store.set({ selectedChatId: id });
    }

    async getChats() {
        const chats = await chatsApi.getChats()
        console.log(chats)
        store.set({ chats: chats });
    }

    async createNewChat(title: string) {
        await chatsApi.createChat({ title })
        this.getChats()
    }
}

const chatsController = new ChatsController();

export default chatsController;
