export async function or<T>(...fns : Array<() => Promise<T> | T>) : Promise<T> {
    for (let fn of fns) {
        let result = await fn();
        if (result) return result;
    }
    return null;
}

export default or;