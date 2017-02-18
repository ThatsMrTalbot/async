export function tick() : Promise<void> {
    return new Promise<void>((res) => {
        setTimeout(res, 0);
    })
}

export default tick;