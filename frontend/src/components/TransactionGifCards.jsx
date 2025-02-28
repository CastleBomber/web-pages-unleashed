// Working to re-implement
import React, { useContext } from "react";
import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionGifCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
}) => {
  // const keyword = "ethereum";
  const gifURL = useFetch({ keyword });

  return (
    <div>
      <div className="transaction-card">
        <img
          src={gifURL || url}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />

        <p className="amount">Amount: {amount} ETH</p>
        {message && (
          <>
            <br />
            <p>Message: {message}</p>
          </>
        )}

        <div className="display-flex justify-start w-full mb-6 p-2">
          <p className="from-address">
            From: {shortenAddress(addressFrom)}
          </p>
          <p className="to-address">
              To: {shortenAddress(addressTo)}
            </p>
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

  return (
    <div>
      <h2>Latest Blockchain Transactions with GIFs</h2>
      {currentAccount ? (
        <div className="transactions-grid">
          <div>
            {/* {[...dummyData, ...transactions].reverse().map((transaction, i) => ( */}
            {transactions.reverse().map((transaction, i) => (
              <TransactionGifCard key={i} {...transaction} />
            ))}
          </div>
        </div>
      ) : (
        <p className="error-message">
          Connect your account to see the latest transactions
        </p>
      )}
    </div>
  );
};

export default TransactionGifCards;
