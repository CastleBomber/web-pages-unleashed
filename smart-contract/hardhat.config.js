require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: "../.env" });

// Alchemy private keys (video: @1:28:00) (better than Infura)
module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_URL,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
    },
    holesky: {
      url: "https://ethereum-holesky.publicnode.com",
      accounts: [process.env.HOLESKY_PRIVATE_KEY],
    },
  },
};
