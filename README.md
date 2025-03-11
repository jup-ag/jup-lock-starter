# Jupiter Lock Starter

This is a starter app to demonstrate how to integrate jupiter lock within a react app (the steps will be identical for integrating with any js frontend web app)

TLDR:

1. generate the jup-lock idl
2. use codama to generate js client code to interact with the jup-lock program from the idl
3. copy`createLock.ts` and `queryLocks.ts` files from this repo to your app

## How to integrate jupiter lock into your web app (long form):

### Requirements:

1. web3js v2
2. @solana-program/token
3. @solana-program/system (create lock)
4. @solana/webcrypto-ed25519-polyfill (create lock)

### Generating the IDL

1. git clone https://github.com/jup-ag/jup-lock
2. install solana, anchor cli via this guide: https://solana.com/docs/intro/installation
3. run `anchor build`
4. copy the file `./target/idl/locker.json` to your web app

### Generate js client code to interact with jup-lock program

1. copy this folder into your project: https://github.com/jup-ag/jup-lock-starter/tree/cc8828106afa04b6ae907b344b444e3cf46981a2/idl
2. replace the `idl.json` with `./target/idl/locker.json` u generated previously and rename it `idl.json`
3. run the `generate-ts.ts` file
4. u should see a `src/lib` folder get generated with all the ts client code required for interacting with the lock program

### Integrate the js client code with your web app

1. create lock: https://github.com/jup-ag/jup-lock-starter/blob/cc8828106afa04b6ae907b344b444e3cf46981a2/src/lock/createLock.ts#L85
2. query lock by user: https://github.com/jup-ag/jup-lock-starter/blob/cc8828106afa04b6ae907b344b444e3cf46981a2/src/lock/queryLock.ts#L30

## Running locally

To run this application:

```bash
bun install
bun start
```

To build this application for production:

```bash
bun run build
```
