import {
  useTransactionContext
} from "../context/TransactionContext";

const NetworkSwitcher = () => {
  const { switchNetwork, verifyContractDeployment } = useTransactionContext();

  const hideGifs = () => {
    // Pauses ALL GIFs on the page
    document.querySelectorAll('img, video').forEach(el => {
      if (el.src?.endsWith('.gif') || el.tagName === 'VIDEO') {
        el.src = ''; // Kills GIFs
        el.remove(); // Remove them from DOM
      }
    });
  }

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

          hideGifs();
        }}
      >
        Verify Contracts
      </button>
    </div>
  );
};

export default NetworkSwitcher;
