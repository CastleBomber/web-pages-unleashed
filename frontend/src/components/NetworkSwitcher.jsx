import {
  useTransactionContext
} from "../context/TransactionContext";

const NetworkSwitcher = () => {
  const { switchNetwork, verifyContractDeployment, toggleGifs } = useTransactionContext();

  return (
    <div>
      <button onClick={() => switchNetwork(11155111)}>Switch to Sepolia</button>
      <button onClick={() => switchNetwork(17000)}>Switch to Holesky</button>
      <button
        onClick={async () => {
          const sepoliaON = await verifyContractDeployment(11155111);
          const holeskyON = await verifyContractDeployment(17000);
          console.log(
            `Contracts: ${sepoliaON ? "Sepolia ON" : "Sepolia OFF"} | ${holeskyON ? "Holesky ON" : "Holesky OFF"}`
          );

          toggleGifs();
        }}
      >
        Toggle Gifs
      </button>
    </div>
  );
};

export default NetworkSwitcher;
