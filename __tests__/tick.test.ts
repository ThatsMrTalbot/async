import tick from '../src/tick'

describe("Given an async function", () => {
    describe("When tick is called", () => {
        test("Then the function should wait for a tick", async () => {
            let ticked = false;
            let promise = (async () => {
                await tick();
                ticked = true;
            })()

            expect(ticked).toBe(false);
            await promise;
            expect(ticked).toBe(true);            
        })
    })
})