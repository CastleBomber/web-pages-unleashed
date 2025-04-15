import abi from "./Transactions.json";

export const contractABI = abi.abi;

// Solidity smart contract address, video: @1:32:33
// npx hardhat run scripts/deploy.js --network sepolia
// npx hardhat run scripts/deploy.js --network holesky
export const contractAddresses = {
    sepolia: "0x33f9e639F1BC9Ef5973C4694F871dB6E36CF7f84",
    holesky: "0x67059C99DEB33a7FE41cBD1c67C97D44aa329ACD",
};
