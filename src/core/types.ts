export type Callback = (...args: unknown[]) => unknown;
export type CallbackList = Callback[];
export enum BLOCK_EVENTS {
    INIT = "init",
    FLOW_CDM = "flow:component-did-mount",
    FLOW_RENDER = "flow:render",
    FLOW_CDU = "flow:component-did-update",
}
export type Props = Record<string, unknown>;
export type BlockMeta = {
    // tagName: string;
    props: Props;
};

export type ChatItem = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: {
            first_name: string;
            second_name: string;
            avatar: string;
            email: string;
            login: string;
            phone: string;
        };
        time: string;
        content: string;
    };
};
