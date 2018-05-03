# superdemo
Sagrix demo for [EDCON 2018](https://edcon.io) - https://www.sagrix.com

:construction_worker::construction: **WIP** :construction::construction_worker:

## Installation

1. Install dependencies.
    ```bash
    npm install
    ```

2. Start a local Ethereum test net. (Import the mnemonic into [MetaMask](https://metamask.io) as the seed phrase for your accounts.)
    ```bash
    ganache-cli
    ```

3. Compile and migrate the smart contracts.
    ```bash
    npm run truffle
    ```
    In development, you can use `npm run truffle-fresh` instead.

5. Run the webpack server for front-end hot reloading (outside the development console). Smart contract changes must be manually recompiled and migrated.
    ```bash
    // Serves the front-end on http://localhost:3000
    npm run start
    ```

## Tests

1. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
    ```bash
    // If inside the development console.
    test

    // If outside the development console..
    truffle test
    ```

2. Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.
    ```bash
    // Run Jest outside of the development console for front-end component tests.
    npm run test
    ```

## Buidl
1. To build the application for production, use the build command. A production build will be in the build_webpack folder.
    ```bash
    npm run build
    ```
