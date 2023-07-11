import EventBus from "./event-bus.ts";

export enum WsTransportEvents {
    CONNECTED = "connected",
    ERROR = "error",
    MESSAGE = "message",
    CLOSE = "close",
}

export enum WsMessagesType {
    PING = "ping",
}
export default class WsTransport extends EventBus {
    private socket: WebSocket | null = null;

    private interval: ReturnType<typeof setInterval> | null = null;

    constructor(private url: string) {
        super();
    }

    public connect(): Promise<void> {
        this.socket = new WebSocket(this.url);

        this.subscribe(this.socket);

        this.ping();

        return new Promise((resolve) => {
            this.on(WsTransportEvents.CONNECTED, () => {
                resolve();
            });
        });
    }

    public close() {
        this.socket?.close();
    }

    public send(data: unknown) {
        if (!this.socket) {
            throw new Error("WebSocket does not exist!");
        }

        this.socket.send(JSON.stringify(data));
    }

    private subscribe(socket: WebSocket) {
        socket.addEventListener("open", () => {
            this.emit(WsTransportEvents.CONNECTED);
        });

        socket.addEventListener("close", () => {
            this.emit(WsTransportEvents.CLOSE);
        });

        socket.addEventListener("error", (e) => {
            this.emit(WsTransportEvents.ERROR, e);
        });

        socket.addEventListener("message", (message) => {
            try {
                const data = JSON.parse(message.data);

                if (
                    data.type &&
                    (data.type === "pong" || data.type === "user connected")
                ) {
                    return;
                }

                this.emit(WsTransportEvents.MESSAGE, data);
            } catch (e) {
                console.log(e);
            }
        });
    }

    private ping() {
        this.interval = setInterval(() => {
            this.send({ type: WsMessagesType.PING });
        }, 5000);

        this.on(WsTransportEvents.CLOSE, () => {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        });
    }
}
