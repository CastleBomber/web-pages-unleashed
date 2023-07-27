require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/KRf5tKaENkFXeUu9pgqw9678uDwe4l7E",
      accounts: [
        "0c807c88644d7ddf623611018ec39d7743b3283c11bb3a62fe7867e1ee82f26c",
      ],
    },
  },
};
