import chatsApi from "../api/chats-api.ts";
import store from "../core/store.ts";
import MessagesController from "./messages-controller.ts";

class ChatsController {
    selectChat(id: number | null) {
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

    async deleteChat(chatId: number) {
        await chatsApi.deleteChat({ chatId })
        this.selectChat(null)
        this.getChats()
    }

    async addUser(userId: number, chatId: number) {
        await chatsApi.addUsers({
            users: [userId],
            chatId
        })
    }

    async deleteUser(userId: number, chatId: number) {
        await chatsApi.deleteUsers({
            users: [userId],
            chatId
        })
    }
}

const chatsController = new ChatsController();

export default chatsController;
