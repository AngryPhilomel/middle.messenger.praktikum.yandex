import API, { ChatsApi } from "../api/chats-api.ts";
import store from "../core/store.ts";
import MessagesController from "./messages-controller.ts";

class ChatsController {
    private api: ChatsApi = API;

    async selectChat(id: number | null) {
        if (id) {
            const tokenResponse = await this.api.getToken(id);
            const userId = store.getState().user?.id || 0;
            await MessagesController.connect(userId, id, tokenResponse.token);
            await this.getUsers(id);
        }
        store.set({ selectedChatId: id });
    }

    async getChats() {
        const chats = await this.api.getChats();
        store.set({ chats });
    }

    async searchChat(q: string) {
        store.set({ chatsFilter: q });
    }

    async createNewChat(title: string) {
        await this.api.createChat({ title });
        await this.getChats();
    }

    async deleteChat(chatId: number) {
        await this.api.deleteChat({ chatId });
        await this.selectChat(null);
        await this.getChats();
    }

    async addUser(userId: number, chatId: number) {
        await this.api.addUsers({
            users: [userId],
            chatId,
        });
    }

    async deleteUser(userId: number, chatId: number) {
        await this.api.deleteUsers({
            users: [userId],
            chatId,
        });
    }

    async getUsers(chatId: number) {
        const users = await this.api.getUsers({ id: chatId });
        store.setChatUsers(users);
    }

    async updateAvatar(data: FormData) {
        try {
            await this.api.updateAvatar(data);
            await this.getChats();
        } catch (e) {
            console.log(e);
        }
    }
}

const chatsController = new ChatsController();

export default chatsController;
