const HDWalletProvider = require('@truffle/hdwallet-provider');
const path = require('path');
require('dotenv').config()

module.exports = {
  contracts_build_directory:  path.join(__dirname, "frontend/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, process.env.MUMBAI_RPC),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      pollingInterval: 1800000,
      disableConfirmationListener: true
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(process.env.PRIVATE_KEY,process.env.ROPSTEN)
      },
      network_id: 3,
      gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version:  "^0.8.0"
    }
  }
}