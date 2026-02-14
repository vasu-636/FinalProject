import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  subscribeToTransactions,
  addTransaction,
  deleteTransaction,
} from "../Features/transactions/transactionSlice";
import {
  subscribeToCategories,
  addCategory,
} from "../Features/categories/categorySlice";
import { logoutUser } from "../Features/auth/authSlice";
import LoadingSpinner from "./LoadingSpinner";

export default function Dashboard() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const { items: transactions, loading, error } = useSelector(
    (state) => state.transactions
  );
  const { items: categories } = useSelector(
    (state) => state.categories
  );

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [showCategoryModal, setShowCategoryModal] =
    useState(false);
  const [newCategory, setNewCategory] = useState("");

  /* ================= REAL-TIME ================= */

  useEffect(() => {
    if (!user) return;

    const unsub1 = dispatch(
      subscribeToTransactions(user.uid)
    );
    const unsub2 = dispatch(
      subscribeToCategories(user.uid)
    );

    return () => {
      if (unsub1) unsub1();
      if (unsub2) unsub2();
    };
  }, [user, dispatch]);

  /* ================= CALCULATIONS ================= */

  const totalIncome = useMemo(() => {
    return transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactions]);

  const balance = totalIncome - totalExpense;

  /* ================= ADD TRANSACTION ================= */

  const handleAddTransaction = () => {
    if (!description || !amount || !category) return;

    dispatch(
      addTransaction({
        description,
        amount: Number(amount),
        type,
        category,
        date,
        uid: user.uid,
      })
    );

    setDescription("");
    setAmount("");
    setCategory("");
  };

  /* ================= ADD CATEGORY ================= */

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;

    dispatch(
      addCategory({
        name: newCategory.trim(),
        uid: user.uid,
      })
    );

    setNewCategory("");
    setShowCategoryModal(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/40 to-orange-50/40">

      {/* ================= HEADER ================= */}
      <div className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-stone-800">
              ExpenseFlow
            </h1>
            <p className="text-sm text-stone-500">
              Welcome back, {user?.email}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowCategoryModal(true)}
              className="bg-amber-500 text-white px-5 py-2 rounded-xl shadow hover:bg-amber-600 transition"
            >
              + Category
            </button>

            <button
              onClick={() => dispatch(logoutUser())}
              className="bg-stone-200 text-stone-700 px-5 py-2 rounded-xl hover:bg-stone-300 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* ERROR */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl">
            {error}
          </div>
        )}

        {/* ================= SUMMARY ================= */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <SummaryCard
            title="Total Income"
            value={totalIncome}
            color="green"
          />
          <SummaryCard
            title="Total Expense"
            value={totalExpense}
            color="red"
          />
          <SummaryCard
            title="Net Balance"
            value={balance}
            color="amber"
          />
        </div>

        {/* ================= ADD TRANSACTION ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-stone-100 mb-10">
          <h2 className="text-xl font-semibold mb-6">
            Add Transaction
          </h2>

          <div className="grid md:grid-cols-6 gap-4">

            <input
              type="text"
              placeholder="Description"
              className="md:col-span-2 input-style"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              placeholder="Amount"
              className="input-style"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <input
              type="date"
              className="input-style"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="input-style"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-style"
            >
              <option value="">Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddTransaction}
              className="bg-amber-500 text-white rounded-xl px-6 py-3 hover:bg-amber-600 transition shadow"
            >
              Add
            </button>
          </div>
        </div>

        {/* ================= TRANSACTIONS ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-stone-100">
          <h2 className="text-xl font-semibold mb-6">
            Recent Transactions
          </h2>

          {transactions.length === 0 ? (
            <p className="text-center text-stone-500 py-10">
              No transactions yet.
            </p>
          ) : (
            <div className="space-y-4">
              {transactions
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.date) - new Date(a.date)
                )
                .map((t) => (
                  <div
                    key={t.id}
                    className="flex justify-between items-center border-b pb-4 hover:bg-stone-50 transition px-3 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-stone-800">
                        {t.description}
                      </p>
                      <p className="text-sm text-stone-500">
                        {t.category} •{" "}
                        {new Date(t.date).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <span
                        className={`font-bold text-lg ${
                          t.type === "expense"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {t.type === "expense" ? "-" : "+"}
                        ₹{t.amount}
                      </span>

                      <button
                        onClick={() =>
                          dispatch(
                            deleteTransaction(t.id)
                          )
                        }
                        className="text-sm text-red-500 hover:text-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>

      {/* ================= CATEGORY MODAL ================= */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-96">
            <h2 className="text-xl font-bold mb-4">
              Add New Category
            </h2>

            <input
              type="text"
              placeholder="Category name"
              className="w-full border-2 border-stone-200 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:border-amber-500"
              value={newCategory}
              onChange={(e) =>
                setNewCategory(e.target.value)
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() =>
                  setShowCategoryModal(false)
                }
                className="px-4 py-2 bg-stone-200 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tailwind reusable style */}
      <style>{`
        .input-style {
          border: 2px solid #e7e5e4;
          border-radius: 12px;
          padding: 12px 16px;
          outline: none;
          transition: 0.2s;
        }
        .input-style:focus {
          border-color: #f59e0b;
        }
      `}</style>
    </div>
  );
}

/* ================= SUMMARY CARD COMPONENT ================= */

function SummaryCard({ title, value, color }) {
  const colorMap = {
    green: "text-green-600",
    red: "text-red-600",
    amber: "text-amber-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-stone-100">
      <p className="text-stone-500 text-sm">{title}</p>
      <h2
        className={`text-3xl font-bold mt-2 ${colorMap[color]}`}
      >
        ₹{value.toLocaleString()}
      </h2>
    </div>
  );
}
