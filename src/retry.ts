import wait from './wait'

export async function retry<T>(fn : () => Promise<T>, retries = 3, delay = 0) : Promise<T> {
    try {
        return await fn();
    } catch(e) {
        if (retries > 0) {
            await wait(delay);
            return await retry(fn, retries - 1, delay);
        }else {
            throw e;
        }
    }
}

export default retry;