import retry from '../src/retry'

describe("Given an async function", () => {
    let fn : jest.Mock<void>

    beforeAll(() => {
        fn = jest.fn<void>();

        fn.mockImplementationOnce(() => Promise.reject("Error1"))
        fn.mockImplementationOnce(() => Promise.reject("Error2"))
        fn.mockImplementationOnce(() => Promise.resolve("Success"))
    })

    describe("When the function is called", () => {
        let result : Promise<string>

        beforeAll(() => {
            result = retry(fn, 3)
        })

        test("Then the function should retry on failure", async () => {
            expect(await result).toBe("Success");
            expect(fn).toHaveBeenCalledTimes(3)
        })
    })
})

describe("Given an async function", () => {

    describe("When the function is called", () => {

        test("It should be passed the zero-indexed attempt count", async () => {
            let attempts: number[] = [];

            await retry(async (attempt) => {
                attempts.push(attempt);
                if (attempt < 5) {
                    return Promise.reject("error")
                }
                return Promise.resolve("success")
            }, 10);

            expect(attempts).toEqual([0, 1, 2, 3, 4, 5])
        })
    })
})

describe("Given an async function", () => {
    let fn : jest.Mock<void>

    beforeAll(() => {
        fn = jest.fn<void>();

        fn.mockImplementationOnce(() => Promise.reject("Error1"))
        fn.mockImplementationOnce(() => Promise.reject("Error2"))
        fn.mockImplementationOnce(() => Promise.reject("Error3"))
        fn.mockImplementationOnce(() => Promise.resolve("Success")) // Not called!
    })

    describe("When the function is called", () => {
        let result : Promise<string>

        beforeAll(() => {
            result = retry(fn, 3)
        })

        test("Then the function should retry on failure up to the maximum of 3 times", async () => {
            try {
                await result
            } catch (err) {
                expect(err).toBe("Error3")
            }
            expect(fn).toHaveBeenCalledTimes(3)
        })
    })
})
