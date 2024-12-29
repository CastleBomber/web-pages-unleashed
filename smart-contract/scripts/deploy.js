const hre = require("hardhat");

const main = async () => {
  const transactionsFactory = await hre.ethers.deployContract("Transactions");

  await transactionsFactory.waitForDeployment();

  const address = await transactionsFactory.getAddress();
  console.log(`Contract Address: ${address}`);
  console.log("Hello World!");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
