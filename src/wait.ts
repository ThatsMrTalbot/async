export function wait(time : number) : Promise<void> {
    return new Promise<void>((res) => {
        setTimeout(res, time);
    })
}

export default wait;