import React, { useContext } from "react";
import useFetch from "../hooks/useFetch";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { SiEthereum } from "react-icons/si";

const TransactionGifCard = ({
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
        <p className="gif-amount">
          <SiEthereum />
          {amount} ETH
        </p>
        {message && (
          <>
            <br />
            <p>Message: {message}</p>
          </>
        )}

        <div>
          <p className="from-address">From: {shortenAddress(addressFrom)}</p>
          <p className="to-address">To: {shortenAddress(addressTo)}</p>
        </div>

        <div>
          <p className="date">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const TransactionGifCards = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  // Get the 6 newest transactions
  const getNewestTransactions = (transactions, limit = 6) => {
    return transactions.slice(-limit).reverse();
  };

  return (
    <div>
      <h2>Latest Blockchain Transactions with GIFs</h2>
      {currentAccount ? (
        transactions?.length > 0 ? (
          <div className="transactions-grid">
            {getNewestTransactions(transactions).map((txn, i) => (
              <TransactionGifCard key={i} {...txn} />
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

export default TransactionGifCards;
