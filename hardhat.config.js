require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require ("./tasks/block-number");
require('hardhat-gas-reporter');

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;

module.exports = {
    solidity: "0.8.18",
    // defaultNetwork: "",
    networks: {
        goerli_testnet: {
            url: process.env.GOERLI_RPC_URL,
            accounts: [process.env.PRIVATE_KEY],
            chainId: 5,
            gas: 72000,
            gasPrice: 3000000000000 // 3000 gwei
        },

        sepolia_testnet: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
            gas: 7200,
            gasPrice: 30000 
        },
        hardhat_localhost: {
            url: process.env.HARDHAT_LOCALHOST_RPC_URL,
            chainId: 31337
            // gas: 1000000000,
            // gasPrice: 1000000000    
        },
        ganache_localhost: {
            url: process.env.GANACHE_LOCALHOST_RPC_URL,
            chainId: 1337,
            accounts: ["0xb4da86fe60e59ae527c76f1be8e5171c6d4b25f81dc3bded8f239ea6cf028ac4"],
        }
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        noColors: true,
        // currency: 'USD',
        // coinmarketcap: ,
    }
};
