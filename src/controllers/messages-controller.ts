import store from "../core/store.ts";
import WsTransport, { WsTransportEvents } from "../core/ws-transport.ts";
import { ChatMessage } from "../core/types.ts";

class MessagesController {
    private ws: WsTransport | null = null;

    async connect(userId: number, id: number, token: string) {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.ws = new WsTransport(
            `wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`
        );

        await this.ws.connect();

        this.subscribe();
        this.getOldMessages();
    }

    send(message: string) {
        this.ws?.send({
            type: "message",
            content: message,
        });
    }

    getOldMessages() {
        this.ws?.send({ type: "get old", content: "0" });
    }

    private onMessage(messages: ChatMessage | ChatMessage[]) {
        if (Array.isArray(messages)) {
            store.set({ messages });
        } else {
            const newMessages = store.getState().messages;
            newMessages.unshift(messages);
            store.set({ messages: newMessages });
        }
    }

    private subscribe() {
        this.ws?.on(
            WsTransportEvents.MESSAGE,
            (message: ChatMessage | ChatMessage[]) => this.onMessage(message)
        );
    }
}

const messagesController = new MessagesController();

export default messagesController;
