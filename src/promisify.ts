
export type Callback<T> = (error : any, data? : T) => void

export function promisify<Result, Param1, Param2, Param3, Param4, Param5, Param6>(
    fn : (param1 : Param1, param2 : Param2, param3 : Param3, param4 : Param4, param5 : Param5, param6 : Param6, cb : Callback<Result>) => void
) : (param1 : Param1, param2 : Param2, param3 : Param3, param4 : Param4, param5 : Param5, param6 : Param6) => Promise<Result>;

export function promisify<Result, Param1, Param2, Param3, Param4, Param5>(
    fn : (param1 : Param1, param2 : Param2, param3 : Param3, param4 : Param4, param5 : Param5, cb : Callback<Result>) => void
) : (param1 : Param1, param2 : Param2, param3 : Param3, param4 : Param4, param5 : Param5) => Promise<Result>;

export function promisify<Result, Param1, Param2, Param3, Param4>(
    fn : (param1 : Param1, param2 : Param2, param3 : Param3, param4 : Param4, cb : Callback<Result>) => void
) : (param1 : Param1, param2 : Param2, param3 : Param3, param4 : Param4) => Promise<Result>;

export function promisify<Result, Param1, Param2, Param3>(
    fn : (param1 : Param1, param2 : Param2, param3 : Param3, cb : Callback<Result>) => void
) : (param1 : Param1, param2 : Param2, param3 : Param3) => Promise<Result>;

export function promisify<Result, Param1, Param2>(
    fn : (param1 : Param1, param2 : Param1, cb : Callback<Result>) => void
) : (param1 : Param1, param2 : Param2) => Promise<Result>;

export function promisify<Result, Param1>(
    fn : (param1 : Param1, cb : Callback<Result>) => void
) : (param1 : Param1) => Promise<Result>;

export function promisify<Result>(
    fn : (cb : Callback<Result>) => void
) : () => Promise<Result>;

export function promisify(fn : Function) : Function {
    return (args : any[]) => new Promise((res, rej) => {
        fn(...[].concat(args, [(err, data) => {
            if (err) rej(err);
            else res(data);
        }]))
    })
}

export function promisifyAll(ob : Object) : Object {
    for (let key in ob) {
        if (typeof ob[key] === 'function') {
            ob[`keyAsync`] = promisify(ob[key]);
        }
    }

    return ob;
}

export default promisify;