import Block from "./block.ts";
import { assert } from "chai";
import sinon, { SinonSandbox } from "sinon";
import * as EventBus from "./event-bus.ts";

const onFake = sinon.fake();
const emitFake = sinon.fake();

const eventBusMock = {
    on: onFake,
    emit: emitFake,
};
describe("Block", () => {
    let sandbox: SinonSandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("subscribe to events when create", () => {
        sandbox.stub(EventBus, "default").callsFake(() => eventBusMock);
        class MockBlock extends Block {}
        new MockBlock({});
        assert.equal(onFake.callCount, 4);
    });
    it("emit 'init' when create", () => {
        sandbox.stub(EventBus, "default").callsFake(() => eventBusMock);
        class MockBlock extends Block {}
        new MockBlock({});
        assert.equal(onFake.calledWith("init"), true);
    });
    it("emit 'CDU' when update props", () => {
        sandbox.stub(EventBus, "default").callsFake(() => eventBusMock);
        class MockBlock extends Block {}
        const block = new MockBlock({});
        block.setProps({ prop: "value" });
        assert.equal(onFake.calledWith("flow:component-did-update"), true);
    });
});
