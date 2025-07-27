import {
  useTransactionContext
} from "../context/TransactionContext";
import { toast } from "react-toastify";

const NetworkSwitcher = () => {
  const { switchNetwork, verifyContractDeployment } = useTransactionContext();

  const killAnnoyingGifs = () => {
    // Pauses ALL GIFs on the page
    document.querySelectorAll('img, video').forEach(el => {
      if (el.src?.endsWith('.gif') || el.tagName === 'VIDEO') {
        el.src = ''; // Kills GIFs
        el.remove(); // Optional: Remove them from DOM
      }
    });
  }

  return (
    <div>
      <button onClick={() => switchNetwork(11155111)}>Switch to Sepolia</button>
      <button onClick={() => switchNetwork(17000)}>Switch to Holesky</button>
      <button
        onClick={async () => {
          const sepoliaOK = await verifyContractDeployment(11155111);
          const holeskyOK = await verifyContractDeployment(17000);
          console.log(
            `Contracts: ${sepoliaOK ? "Sepolia OK" : "Sepolia MISSING"} | ${holeskyOK ? "Holesky OK" : "Holesky MISSING"}`
          );

          killAnnoyingGifs();
        }}
      >
        Verify Contracts
      </button>
    </div>
  );
};

export default NetworkSwitcher;
