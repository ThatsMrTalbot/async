export async function all<T>(...fns : Array<() => Promise<T> | T>) : Promise<T[]> {
    return Promise.all( fns.map(fn => fn()) );
}

export default all;