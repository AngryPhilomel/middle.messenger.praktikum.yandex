import { assert } from "chai";
import sinon from "sinon";
import Router, { BlockConstructable } from "./router.ts";

const getContentFake = sinon.fake.returns(document.createElement("div"));
const getContentGo = sinon.fake.returns(document.createElement("div"));
const getContentProtected = sinon.fake.returns(document.createElement("div"));

const MockPage = class {
    getContent = getContentFake;
} as unknown as BlockConstructable;
const MockGo = class {
    getContent = getContentGo;
} as unknown as BlockConstructable;
const MockProtected = class {
    getContent = getContentProtected;
} as unknown as BlockConstructable;

describe("Router", () => {
    it("use method return Router instance", () => {
        const router = Router.use("/", MockPage, false);
        assert.equal(router, Router);
    });

    it("render page on start", () => {
        Router.use("/", MockPage, false).start();
        assert.equal(getContentFake.callCount, 1);
    });
    it("render page on go", () => {
        Router.use("/", MockPage, false).use("/route", MockGo, false).start();
        Router.go("/route");
        assert.equal(getContentGo.callCount, 1);
    });
    it("don`t render protected page", () => {
        sinon.mock("authController");
        Router.use("/", MockPage, false)
            .use("/protected", MockProtected, true)
            .start();
        Router.go("/protected");
        assert.equal(getContentProtected.callCount, 0);
    });
});
