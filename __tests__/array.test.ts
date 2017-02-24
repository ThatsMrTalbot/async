import {array, AsyncArray} from '../src/array'

describe("Given an async array", () => {
    let arr : AsyncArray<string>

    beforeAll(() => {
        arr = array(["a", "b", "c"])
    })

    describe("When async map is called", () => {
        let results : AsyncArray<string>

        beforeAll(async () => {
            results = await arr.mapAsync((val, i) => Promise.resolve(`${val}_${i}`))
        })

        test("Then the result should be mapped", () => {
            expect(results).toEqual(["a_0", "b_1", "c_2"])
        })
    })

    describe("When async filter is called", () => {
        let results : AsyncArray<string>

        beforeAll(async () => {
            results = await arr.filterAsync((val, i) => Promise.resolve(val != "c"))
        })

        test("Then the result should be filtered", () => {
            expect(results).toEqual(["a", "b"])
        })
    })

    describe("When async foreach is called", () => {
        let fn : jest.Mock<{}>

        beforeAll(async () => {
            fn = jest.fn().mockReturnValue(Promise.resolve());
            await arr.forEachAsync(fn);
        })

        test("Then the result should be filtered", () => {
            expect(fn).toBeCalledWith("a", 0, arr);
            expect(fn).toBeCalledWith("b", 1, arr);
            expect(fn).toBeCalledWith("c", 2, arr);
        })
    })
})