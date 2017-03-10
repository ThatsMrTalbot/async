import Resolver from './resolver'

export class Dispatch {
    private lookup : {[index : string] : Resolver<any>}

    constructor() {
        this.lookup = {};
    }

    dispatch<T>(name : string, payload : T) {
        if (this.lookup[name]) {
            this.lookup[name].resolve(payload);
        }
    }

    throw<T>(name : string, payload : T) {
        if (this.lookup[name]) {
            this.lookup[name].reject(payload);
        }
    }

    async next<T>(name : string) : Promise<T> {
        if (!this.lookup[name]) {
            this.lookup[name] = new Resolver<T>();
        }

        let value = await this.lookup[name] as T;
        delete this.lookup[name];

        return value;
    }
}

export default Dispatch;