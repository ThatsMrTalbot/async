import promisify from '../src/promisify'

describe("Given a node function", () => {
    let cb : Function
    let val : number

    let fn = (v : number, c : Function) => {
        val = v;
        cb = c;
    }

    describe("When the function is promisfied", () => {

        let p = promisify<void, number>(fn)

        test("Then promise function should function", async () => {
            let promise = p(1);

            cb(null, "value")
            expect(val).toBe(1); 
            expect(await promise).toBe("value"); 
        })
    })
})