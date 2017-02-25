import Dispatch from '../src/dispatch'

describe("Given a dispatcher", () => {
    let dispatcher : Dispatch

    beforeAll(() => {
        dispatcher = new Dispatch();
    })

    describe("When a event is dispatched", () => {
        let promise : Promise<string>

        beforeAll(() => {
            promise = dispatcher.next("test");
            dispatcher.dispatch("test", "value")
        })

        test("Then promises should resolve", async () => {
            expect(await promise).toBe("value")
        })
    })
})