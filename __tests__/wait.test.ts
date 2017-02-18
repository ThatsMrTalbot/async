import wait from '../src/wait'

describe("Given an async function", () => {
    describe("When wait is called", () => {
        test("Then the function should wait", async () => {
            let start = Date.now()
            await wait(200);
            let end = Date.now()            
            expect(end - start).toBeGreaterThanOrEqual(200);
        })
    })
})