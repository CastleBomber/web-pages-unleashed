import React, { useContext } from "react";
import useFetch from "../hooks/useFetch";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress, shortenDateFormat } from "../utils/shortenAddress";
import { SiEthereum } from "react-icons/si";

// [Home] Transactions pulled from the blockchain's smart contract
const TransactionBCGifCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
}) => {
  const gifURL = useFetch({ keyword });

  return (
    <div>
      <div className="transaction-card">
        <img src={gifURL || url} alt="nature" className="image" />
        <p className="home-amount">
          <SiEthereum />
          {amount} ETH
        </p>
        {message && (
          <>
            <p className="message">{message}</p>
          </>
        )}

        <div>
          <p className="address-labels">
            <span className="address-from-label">From</span>
            <span className="address-to-label">To</span>
          </p>

          <p className="addresses">
            {shortenAddress(addressFrom)} → {shortenAddress(addressTo)}
          </p>
        </div>

        <div>
          <p className="date">{shortenDateFormat(timestamp)}</p>
        </div>
      </div>
    </div>
  );
};

const TransactionBCGifCards = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  // Get the 6 newest transactions
  const getNewestTransactions = (transactions, limit = 6) => {
    return transactions.slice(-limit).reverse();
  };

  return (
    <div>
      <h2>Latest Transactions</h2>
      {currentAccount ? (
        transactions?.length > 0 ? (
          <div className="transactions-grid">
            {getNewestTransactions(transactions).map((txn, i) => (
              <TransactionBCGifCard key={i} {...txn} />
            ))}
          </div>
        ) : (
          <p className="error-message">No transactions found.</p>
        )
      ) : (
        <p className="error-message">
          Connect your account to see the latest transactions
        </p>
      )}
    </div>
  );
};

export default TransactionBCGifCards;
