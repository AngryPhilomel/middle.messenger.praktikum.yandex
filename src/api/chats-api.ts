import HttpTransport from "../core/http-transport.js";
import { ChatItem, UserResponse } from "../core/types.js";

export interface CreateChatData extends Record<string, string> {
    title: string;
}

export interface DeleteChatData extends Record<string, number> {
    chatId: number;
}

export interface DeletedChatResponse extends Record<string, unknown> {
    userId: number;
    result: {
        id: number;
        title: string;
        avatar: string;
    };
}

export interface ChangeUsersData extends Record<string, number | number[]> {
    users: number[];
    chatId: number;
}
export interface GetUsersData extends Record<string, number | number[]> {
    id: number;
}

export class ChatsApi {
    private http: HttpTransport = new HttpTransport("/chats");

    getChats(): Promise<ChatItem[]> {
        return this.http.get(``);
    }

    createChat(data: CreateChatData): Promise<{ id: number }> {
        return this.http.post(``, { data });
    }

    deleteChat(data: DeleteChatData): Promise<DeletedChatResponse> {
        return this.http.delete(``, { data });
    }

    addUsers(data: ChangeUsersData) {
        return this.http.put("/users", { data });
    }

    deleteUsers(data: ChangeUsersData) {
        return this.http.delete("/users", { data });
    }

    getUsers(data: GetUsersData): Promise<UserResponse[]> {
        return this.http.get(`/${data.id}/users`);
    }

    getUnreadCount(data: GetUsersData): Promise<{ unread_count: number }> {
        return this.http.get(`/new/${data.id}`);
    }

    getToken(id: number): Promise<{ token: string }> {
        return this.http.post(`/token/${id}`);
    }

    updateAvatar(data: FormData) {
        return this.http.put("/avatar", { data });
    }
}

export default new ChatsApi();
