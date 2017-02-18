import all from '../src/all'

describe("Given multiple promises", () => {
    let resolvers : Array<(val : number) => void>;
    let rejectors : Array<(val : any) => void>;
    let promise : Promise<number[]>;

    beforeEach(() => {
        let range : number[] = [];
        resolvers = [];
        rejectors = [];

        for (let i = 0; i < 10; i++) {
            range.push(i);
        }

        promise = all(...range.map(_ => 
            () => new Promise((res, rej) => {
                resolvers.push(res);
                rejectors.push(rej);
            }))
        );
    })

    describe("When all promises resolve", () => {

        beforeEach(() => {
            resolvers.forEach(
                (r, i) => r(i),
            );
        });
        

        test("Then the method should resolve", async () => {
            await promise;
        })
    })

    describe("When a promise rejects", () => {
        beforeEach(() => {
            rejectors.pop()("error");
        });
        

        test("Then the method should resolve", async () => {
            try {
                await promise;
                fail("Promise should reject");
            } catch (e) {
                expect(e).toBe("error")
            }
        })
    })
})