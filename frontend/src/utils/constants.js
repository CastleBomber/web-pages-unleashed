import abi from "./Transactions.json";

export const contractABI = abi.abi;

// Solidity smart contract address, video: @1:32:33
// npx hardhat run scripts/deploy.js --network sepolia
// npx hardhat run scripts/deploy.js --network holesky
export const contractAddresses = {
    sepolia: "0x63f0641AB382640Cde7De98e3b0759dd7D7Be448",
    holesky: "0x7993A870C11ECd0a4C7Aab8b63ee65DD6eb1df44",
};
