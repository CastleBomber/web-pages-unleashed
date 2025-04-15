require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_SEPOLIA_FRONTEND_REACT_APP_API_KEY}`,
      accounts: [
        "0c807c88644d7ddf623611018ec39d7743b3283c11bb3a62fe7867e1ee82f26c",
      ],
    },
    holesky: {
      url: `https://ethereum-holesky.publicnode.com`,
      accounts: ["0c807c88644d7ddf623611018ec39d7743b3283c11bb3a62fe7867e1ee82f26c"],
    }
  },
};
