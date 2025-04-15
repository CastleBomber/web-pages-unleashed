import { useTransactionContext } from "../context/TransactionContext";

const NetworkSwitcher = () => {
    const { switchNetwork } = useTransactionContext();

    return (
        <div>
            <button onClick={() => switchNetwork(11155111)}>Switch to Sepolia</button>
            <button onClick={() => switchNetwork(17000)}>Switch to Holesky</button>
        </div>
    );
};

export default NetworkSwitcher;