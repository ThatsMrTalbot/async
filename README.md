# Async
_Async utilities for typescript_

This is a bunch or utils for working with async functions in typescript. 
All functions can be imported from the package or from their subpackage.

For example:
```typescript
import or from '@thatsmrtalbot/async/or';
// Is equal to
import {or} from '@thatsmrtalbot/async';
```

This is usefull when the result is bundled for the web as it reduces unused code.


## Utils

### all

This is equivilent to Promise.all(). It follows the same syntax as the rest of these utils.

For example:
```typescript
await all(
    () => repository.deleteUser(username),
    () => repository.deleteProfile(username),
    () => repository.deletePosts(username),
)
```

### or

Or allows you to perform one or more actions until a non null value is returned.

For example:
```typescript
let user = await or(
    () => repository.getUser(username),
    () => repository.createUser(username),
)
```

You can also use it to throw errors on null values:
```typescript
let user = await or(
    () => repository.getUser(username),
    () => { throw new Error("User does not exist") },
)
```

### promisify/promisifyAll

These are the similar to bluebird.promisify and bluebird.promisifyAll, without the additional promise implimentation.

```typescript
let read = promisify(fs.read)
let fsAsync = promisifyAll(fs)
//read == fsAsync.readAsync
```

### resolver

Resolver is a promise with external methods to resolve and reject.

```typescript
let resolver = new Resolver<string>()
resolver.resolve("value")
```

### tick

Tick uses setTimeout to defer the execution of a function for a tick.

```typescript
await tick()
```

### time

Time times the execution of a promise:

```typescript
let user = await time(
    () => repository.getUser(uid),
    (err, time) => console.log(`Execution took ${time}`)
)
```

### timeout

Timeout allows you to set a time limit for promises to resolve

```typescript
await timeout(
    () => repository.getUser(uid),
    500,
)
```

### wait

Tick uses setTimeout to wait a specified amount of time:

```typescript
await wait(500)
```

### retry

Retry function with optional wait time

```typescript
// Three attempts with 1 second wait
await retry(async () => {
    await doTheThing();
}, 3, 1000)
```