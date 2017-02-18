export async function time<T>(fn : () => Promise<T>, handle : (err : any, time : number) => void) : Promise<T> {
    let start = Date.now();
    try {
        let result = await fn();
        handle(null, Date.now())
        return result;
    } catch(e) {
        handle(e, Date.now())
        throw e;
    }
}

export default time