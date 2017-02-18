import Resolver from '../src/resolver'

describe("Given a resolver", () => {
    let resolver : Resolver<string>;

    beforeEach(() => {
         resolver = new Resolver<string>();
    })
    
    describe("When resolver is resolved", () => {

        beforeEach(() => {
            resolver.resolve("value")
        })

        test("Then the resolved value should be returned", async () => {
            expect(await resolver).toBe("value");
        })
    })

    describe("When resolver is rejected", () => {

        beforeEach(() => {
            resolver.reject("error")
        })

        test("Then the rejection value should be returned", async () => {
            try {
                await resolver;
                fail("Promise should be rejected")
            } catch (e) {
                expect(e).toBe("error");
            }
        })
    })
})