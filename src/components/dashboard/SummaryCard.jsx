import React from "react";

const SummaryCard = ({ income, expense }) => {
  const balance = income - expense;

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-10">
      <StatCard
        title="Total Income"
        amount={income}
        color="green"
        gradient="from-green-500 to-emerald-600"
      />

      <StatCard
        title="Total Expense"
        amount={expense}
        color="red"
        gradient="from-red-500 to-rose-600"
      />

      <StatCard
        title="Net Balance"
        amount={balance}
        color="amber"
        gradient="from-amber-500 to-orange-600"
      />
    </div>
  );
};

export default SummaryCard;


/* ================= STAT CARD ================= */

const StatCard = ({ title, amount, color, gradient }) => {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 shadow-lg text-white hover:scale-105 transition duration-200`}>
      <p className="text-sm opacity-90">{title}</p>
      <h2 className="text-3xl font-bold mt-2">
        ₹{amount.toLocaleString()}
      </h2>
    </div>
  );
};
