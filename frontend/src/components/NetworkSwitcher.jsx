import {
  useTransactionContext
} from "../context/TransactionContext";
import { toast } from "react-toastify";

const NetworkSwitcher = () => {
  const { switchNetwork, verifyContractDeployment } = useTransactionContext();

  return (
    <div>
      <button onClick={() => switchNetwork(11155111)}>Switch to Sepolia</button>
      <button onClick={() => switchNetwork(17000)}>Switch to Holesky</button>
      <button
        onClick={async () => {
          const sepoliaOK = await verifyContractDeployment(11155111);
          const holeskyOK = await verifyContractDeployment(17000);
          toast.info(
            `Contracts: ${sepoliaOK ? "Sepolia OK" : "Sepolia MISSING"} | ${holeskyOK ? "Holesky OK" : "Holesky MISSING"}`
          );
        }}
      >
        Verify Contracts
      </button>
    </div>
  );
};

export default NetworkSwitcher;
