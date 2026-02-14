import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import DashboardHeader from "./dashboard/DashboardHeader";
import SummaryCard from "./dashboard/SummaryCard";
import AddTransactionCard from "./dashboard/AddTransactionCard";
import TransactionList from "./dashboard/TransactionList";
import CategoryModal from "./dashboard/CategoryModal";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const transactions = useSelector(
    (state) => state.transactions.items
  );

  // Calculate totals
  const income = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((a, b) => a + Number(b.amount), 0),
    [transactions]
  );

  const expense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((a, b) => a + Number(b.amount), 0),
    [transactions]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/40 to-orange-50/40">

      <DashboardHeader
        onOpenCategory={() => setShowModal(true)}
      />

      <main className="max-w-6xl mx-auto px-6 py-10">

        <SummaryCard
          income={income}
          expense={expense}
        />

        <AddTransactionCard />

        <TransactionList />

      </main>

      <CategoryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Dashboard;
