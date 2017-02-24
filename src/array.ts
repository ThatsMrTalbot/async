export class AsyncArray<T> extends Array<T> {
    async mapAsync<R>(cb : (val : T, index : number, arr : T[]) => Promise<R> ) : Promise<AsyncArray<R>> {
        return array( await Promise.all(this.map(cb)) );
    }

    async forEachAsync<R>(cb : (val : T, index : number, arr : T[]) => Promise<any> ) : Promise<void> {
        await this.mapAsync(cb)
    }

    async filterAsync(cb : (val : T, index : number, arr : T[]) => Promise<boolean> ) : Promise<AsyncArray<T>> {
        let bools = await Promise.all(this.map(cb));
        return array( this.filter((val, i) => bools[i]) )
    }
}

export function array<T>(arr : T[]) : AsyncArray<T> {
    return new AsyncArray(...arr);
}

export default array;