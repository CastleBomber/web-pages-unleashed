const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Transactions", () => {
  it("Should deploy and add a transaction", async () => {
    const [owner, recipient] = await ethers.getSigners();
    const Transactions = await ethers.getContractFactory("Transactions");
    const transactions = await Transactions.deploy();

    const amount = ethers.parseEther("1.0"); // 1 ETH in wei

    await transactions.addToBlockChain(
      recipient.address, 
      amount, 
      "Hello", 
      "test",
      { value: amount } // send ETH with the transaction
    );

    expect(await transactions.getTransactionCount()).to.equal(1);
  });
});