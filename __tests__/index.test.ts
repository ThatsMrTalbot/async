import * as async from '../src'
import all from '../src/all'
import or from '../src/or'
import {promisify, promisifyAll} from '../src/promisify'
import Resolver from '../src/resolver'
import tick from '../src/tick'
import time from '../src/time'
import wait from '../src/wait'
import retry from '../src/retry'
import timeout from '../src/timeout'

describe("Given the index", () => {
    describe("When imported", () => {
        test("Then it should contain all the methods", () => {
            expect(async.all).toBe(all)
            expect(async.or).toBe(or)
            expect(async.promisify).toBe(promisify)
            expect(async.promisifyAll).toBe(promisifyAll)
            expect(async.Resolver).toBe(Resolver)
            expect(async.tick).toBe(tick)
            expect(async.time).toBe(time)
            expect(async.timeout).toBe(timeout)
            expect(async.retry).toBe(retry)
        })
    })
})
