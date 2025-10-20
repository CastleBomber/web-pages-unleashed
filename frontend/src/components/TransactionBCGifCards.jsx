import React, { useContext } from "react";
import useFetch from "../hooks/useFetch";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress, shortenDateFormat } from "../utils/shortenAddress";
import { SiEthereum } from "react-icons/si";
import { networkNames } from "../utils/networks";

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
  const { gifsHidden, userMap } = useContext(TransactionContext);

  const displayAddress = (address) => {
    const normalizedAddress = address.toLowerCase();
    return userMap[normalizedAddress] || shortenAddress(address);
  };

  return (
    <div>
      <div className="transaction-card">
        {!gifsHidden && (
          <img src={gifURL || url}
            alt="nature"
            className="image" />
        )}
        <p className="home-amount">
          <SiEthereum />
          {amount}
        </p>
        {message && (
          <>
            <p className="message">{message}</p>
          </>
        )}

        <div className="address-box">
          <p className="address-labels">
            <span className="address-from-label">From</span>
            <span className="address-to-label">To</span>
          </p>

          <p className="addresses">
            {displayAddress(addressFrom)} → {displayAddress(addressTo)}
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
  const { 
    transactions, 
    currentAccount, 
    currentChainId 
  } = useContext(TransactionContext); // React re-renders when this changes

  // Get the 6 newest transactions
  const getNewestTransactions = (transactions, limit = 6) => {
    return transactions.slice(-limit).reverse();
  };

  return (
    <div>
      <h2>
        Latest{" "}
        {networkNames[currentChainId] || "Unknown Network"}
        {" "}Transactions</h2>
      <h3>From All Users</h3>
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
