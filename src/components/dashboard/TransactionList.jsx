import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../Features/transactions/transactionSlice";
import { toast } from "react-toastify";
import TransactionItem from "./TransactionItem";

const TransactionList = () => {
  const dispatch = useDispatch();

  const { items: transactions } = useSelector(
    (state) => state.transactions
  );

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
    toast.info("Transaction deleted");
  };

  // Sort latest first
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-stone-100 p-6">

      <h2 className="text-xl font-semibold text-stone-800 mb-6">
        Recent Transactions
      </h2>

      {sortedTransactions.length === 0 ? (
        <div className="text-center py-10 text-stone-500">
          No transactions yet.
        </div>
      ) : (
        <div className="space-y-4">
          {sortedTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
