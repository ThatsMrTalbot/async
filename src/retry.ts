import wait from './wait'

export async function retry<T>(fn : (attempt? : number) => Promise<T>, retries = 3, delay = 0) : Promise<T> {
    return await _retry(fn, retries, delay);
}

async function _retry<T>(fn : (attempt? : number) => Promise<T>, retries: number, delay: number, attempt = 0) : Promise<T> {
    try {
        return await fn(attempt);
    } catch(e) {
        if (attempt < retries - 1) {
            await wait(delay);
            return await _retry(fn, retries, delay, attempt + 1);
        } else {
            throw e;
        }
    }
}

export default retry;
