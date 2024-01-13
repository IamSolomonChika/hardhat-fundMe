require("@nomicfoundation/hardhat-toolbox")
require("solidity-coverage")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("hardhat-gas-reporter")
require("dotenv").config()

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
    },
    defaultNetwork: "hardhat",
    networks: {
        // Setting up the networks we want to deploy to
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [WALLET_PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmations: 2,
        },
        // Using the bash cmd "yarn hardhat node" to activate a virtual blockchain locally
        // Then we set up this localhost config to access it and deploy to it
        // Note: that if we don't specify an account, it will use the default account.
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    etherscan: {
        // Your API key for Etherscan
        apiKey: ETHERSCAN_API_KEY,
    },
    // Testing for Gas fees
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "BNB",
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
}
