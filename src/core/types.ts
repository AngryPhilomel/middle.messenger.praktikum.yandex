export type Callback = (...args: unknown[]) => unknown;
// export type Callback = <T extends readonly unknown[]>(...args: T) => unknown;
// export type Callback = (...args: T[]) => void;
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
