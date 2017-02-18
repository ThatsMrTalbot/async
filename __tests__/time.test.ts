import wait from '../src/wait'
import time from '../src/time'

describe("Given an async function", () => {
    describe("When the funtion is timed", () => {
        test("Then the function duration should be returned", async () => {
            await time(
                () => wait(200),
                (err, duration) => expect(duration).toBeGreaterThanOrEqual(200),
            )
        })
    })
})