import { assert } from "chai";
import Router, { BlockConstructable } from "./router.ts";

const MockPage = class {
    getContent = () => document.createElement("div");
} as unknown as BlockConstructable;
describe("Router", () => {
    it("exist", () => {
        const router = Router.use("/", MockPage, false);
        assert(router);
    });
});
