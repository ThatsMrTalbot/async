export class Resolver<T> extends Promise<T> {

    public resolve : (value?: T | PromiseLike<T>) => void
    
    public reject : (reason: any) => void

    constructor() {
        let resolve : (value?: T | PromiseLike<T>) => void
        let reject : (reason: any) => void

        super((res, rej) => {
            resolve = res;
            reject = rej;
        });

        this.resolve = resolve;
        this.reject = reject;
    }
}

export default Resolver;