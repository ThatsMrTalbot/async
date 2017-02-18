import or from '../src/or'

describe("Given multiple promises", () => {
    let resolvers : Array<(val : string) => void>;
    let rejectors : Array<(val : any) => void>;
    let promise : Promise<string>;

    beforeEach(async () => {
        let fns : Array<() => Promise<string>> = []

        resolvers = [];
        rejectors = [];

        for (let i = 0; i < 10; i++) {
            let promise = new Promise((res, rej) => {
                resolvers.push(res);
                rejectors.push(rej);
            })

            fns.push(() => promise);
        }

        promise = or(...fns)
    })

    describe("When the first promise returns null", () => {

        beforeEach(() => {
            resolvers.shift()(null);
            resolvers.shift()("value");
        });
        

        test("Then the second promise should be called", async () => {
            let result = await promise;
            expect(result).toBe("value");
        })
    })
})