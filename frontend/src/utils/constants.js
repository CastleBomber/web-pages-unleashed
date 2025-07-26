import abi from "./Transactions.json";

export const contractABI = abi.abi;

// Solidity smart contract address, video: @1:32:33
// npx hardhat run scripts/deploy.js --network sepolia
// npx hardhat run scripts/deploy.js --network holesky
export const contractAddresses = {
    sepolia: "0xf75b92C0c7Ac153d2359C9C45af9a21e0B25e27B",
    holesky: "0xA13B72F5457E97Dfd07FF365812257e36e7c9ffa",
};
