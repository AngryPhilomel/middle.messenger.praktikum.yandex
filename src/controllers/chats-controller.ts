import chatsApi from "../api/chats-api.ts";
import store from "../core/store.ts";
import MessagesController from "./messages-controller.ts";

class ChatsController {
    async selectChat(id: number | null) {
        if (id) {
            const tokenResponse = await chatsApi.getToken(id);
            const userId = store.getState().user?.id || 0;
            await MessagesController.connect(userId, id, tokenResponse.token);
            await this.getUsers(id);
        }
        store.set({ selectedChatId: id });
    }

    async getChats() {
        const chats = await chatsApi.getChats();
        store.set({ chats });
    }

    async searchChat(q: string) {
        store.set({ chatsFilter: q });
    }

    async createNewChat(title: string) {
        await chatsApi.createChat({ title });
        await this.getChats();
    }

    async deleteChat(chatId: number) {
        await chatsApi.deleteChat({ chatId });
        await this.selectChat(null);
        await this.getChats();
    }

    async addUser(userId: number, chatId: number) {
        await chatsApi.addUsers({
            users: [userId],
            chatId,
        });
    }

    async deleteUser(userId: number, chatId: number) {
        await chatsApi.deleteUsers({
            users: [userId],
            chatId,
        });
    }

    async getUsers(chatId: number) {
        const users = await chatsApi.getUsers({ id: chatId });
        store.setChatUsers(users);
    }
}

const chatsController = new ChatsController();

export default chatsController;
