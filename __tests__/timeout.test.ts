import timeout from '../src/timeout'
import wait from '../src/wait'

describe("Given a quick promise function", () => {
    describe("When timeout is called", () => {
        test("Then the timeout should not error", async () => {
            await timeout(
                () => Promise.resolve("value"),
                100,
            )
        })
    })
})

describe("Given a long running promise function", () => {
    describe("When timeout is called", () => {
        test("Then the timeout should error", async () => {
            try {
                await timeout(
                    () => wait(110),
                    100,
                )
                fail("Promise should fail")
            } catch (e) {
                expect(e.message).toBe("Promise timed out")
            }
        })
    })
})