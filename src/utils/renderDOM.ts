import Block from "../core/block.ts";

const render = (block: Block) => {
    const root = document.querySelector("#app");

    if (!root) {
        throw new Error("Root not found");
    }

    root.innerHTML = "";

    root.append(block.getContent());
};

export default render;
