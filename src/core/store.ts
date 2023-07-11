import EventBus from "./event-bus.ts";
import { ChatItem, ChatMessage, STORE_EVENTS, UserResponse } from "./types.ts";

type State = {
    user: UserResponse | null;
    chats: ChatItem[] | [];
    chatUsers: UserResponse[];
    chatsFilter: string;
    selectedChatId: number | null;
    messages: ChatMessage[];
};
export class Store extends EventBus {
    static STORE_EVENTS = STORE_EVENTS;

    private state: State = {
        user: null,
        chats: [],
        chatUsers: [],
        chatsFilter: "",
        selectedChatId: null,
        messages: [],
    };

    public set(newState: Partial<State>) {
        Object.assign(this.state, newState);
        this.emit(Store.STORE_EVENTS.UPDATE);
    }

    public setUser(newUser: UserResponse) {
        this.state.user = newUser;
    }

    public setChatUsers(users: UserResponse[]) {
        this.state.chatUsers = users;
    }

    public getState() {
        return this.state;
    }
}

export default new Store();
