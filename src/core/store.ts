import EventBus from "./event-bus.ts";
import { ChatItem, STORE_EVENTS } from "./types.ts";

type State = {
    chats: ChatItem[] | [];
    selectedChatId: number | null;
};
export class Store extends EventBus {
    static STORE_EVENTS = STORE_EVENTS;

    private state: State = {
        chats: [],
        selectedChatId: null,
    };

    public set(newState: Partial<State>) {
        Object.assign(this.state, newState);
        this.emit(Store.STORE_EVENTS.UPDATE);
    }

    public getState() {
        return this.state;
    }
}

export default new Store();
