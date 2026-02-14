import React from "react";

const TransactionItem = ({ transaction, onDelete }) => {
  const isExpense = transaction.type === "expense";

  return (
    <div className="flex justify-between items-center bg-white rounded-xl p-4 border border-stone-100 hover:shadow-md transition duration-200">

      {/* Left Side */}
      <div>
        <p className="font-semibold text-stone-800">
          {transaction.description}
        </p>

        <p className="text-sm text-stone-500 mt-1">
          {transaction.category} •{" "}
          {new Date(transaction.date).toLocaleDateString(
            "en-IN",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            }
          )}
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        
        {/* Amount */}
        <span
          className={`text-lg font-bold ${
            isExpense ? "text-red-600" : "text-green-600"
          }`}
        >
          {isExpense ? "-" : "+"}₹
          {Number(transaction.amount).toLocaleString()}
        </span>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(transaction.id)}
          className="text-red-500 hover:text-red-700 text-sm font-medium transition"
        >
          Delete
        </button>

      </div>
    </div>
  );
};

export default TransactionItem;
