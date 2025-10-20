import React from "react";
import { useTransactionContext } from "../context/TransactionContext";

export default function DebugContext() {
  const { dbRefreshFlag, triggerDBRefresh } = useTransactionContext();

  return (
    <div style={{ padding: 20 }}>
      <p>dbRefreshFlag = {dbRefreshFlag}</p>
      <button onClick={triggerDBRefresh}>Increment flag</button>
    </div>
  );
};

