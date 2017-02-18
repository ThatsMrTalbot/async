import wait from './wait'

export function timeout<T>(fn : () => Promise<T>, time : number) : Promise<T> {
    return new Promise<T>((res, rej) => {
        fn().then(res, rej)
        wait(time).then(
            () => rej(new Error("Promise timed out"))
        )
    })
}

export default timeout