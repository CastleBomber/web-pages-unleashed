import React, { useState, useEffect, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress, shortenDateFormat } from "../utils/shortenAddress";

// Transactions pulled from blockchain log
const TransactionsHome = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  // Get the 6 newest transactions
  const getNewestTransactions = (transactions, limit = 6) => {
    return transactions.slice(-limit).reverse();
  };

  return (
    <div>
      <h2>Latest Blockchain Transactions from Users</h2>
      {currentAccount ? (
        transactions?.length > 0 ? (
          <div className="transactions-grid">
            {getNewestTransactions(transactions).map((txn, index) => (
              <li key={index} className="transaction-card">
                {/* Blockchain naming sctructure different from database usage */}
                <p className="from-address">
                  From: {shortenAddress(txn.addressFrom || "")}
                </p>
                <p className="to-address">
                  To: {shortenAddress(txn.addressTo || "")}
                </p>
                <p className="amount">Amount: {txn.amount}</p>
                <p className="date">Date: {shortenDateFormat(txn.timestamp)}</p>
              </li>
            ))}
          </div>
        ) : (
          <p style={{ color: "#fff", textAlign: "center" }}>
            No transactions found.
          </p>
        )
      ) : (
        <p className="error-message">
          Please connect your wallet to view contract transactions.
        </p>
      )}
    </div>
  );
};

export default TransactionsHome;
