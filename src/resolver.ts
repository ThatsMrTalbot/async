// Taken from http://stackoverflow.com/a/40356701
export class Resolver<T> implements PromiseLike<T> {
    private promise: Promise<T>;
    private resolveFunction: (value?: T | PromiseLike<T>) => void;
    private rejectFunction: (reason?: any) => void;

    constructor(promise?: Promise<T>) {
        if (!(this instanceof Resolver)){
            return new Resolver(promise);
        }

        this.resolveFunction = null;
        this.rejectFunction = null;
        this.promise = promise || new Promise(this.promiseExecutor.bind(this));
    }

    public asPromise(): Promise<T> {
        return this.promise;
    }

    public then<TResult>(onfulfilled?: (value: T) => TResult | PromiseLike<TResult>, onrejected?: (reason: any) => TResult | PromiseLike<TResult>): Resolver<TResult>;
    public then<TResult>(onfulfilled?: (value: T) => TResult | PromiseLike<TResult>, onrejected?: (reason: any) => void): Resolver<TResult>;
    public then<TResult>(onfulfilled?: (value: T) => TResult | PromiseLike<TResult>, onrejected?: (reason: any) => any): Resolver<TResult> {
        return new Resolver(this.promise.then(onfulfilled, onrejected));
    }

    public catch(onrejected?: (reason: any) => T | PromiseLike<T>): Resolver<T>;
    public catch(onrejected?: (reason: any) => void): Resolver<T>;
    public catch(onrejected?: (reason: any) => any): Resolver<T> {
        return new Resolver(this.promise.catch(onrejected));
    }

    public resolve(value?: T | PromiseLike<T>) {
        this.resolveFunction(value);
    }

    public reject(reason?: any) {
        this.rejectFunction(reason);
    }

    private promiseExecutor(resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) {
        this.resolveFunction = resolve;
        this.rejectFunction = reject;
    }
}

export default Resolver;