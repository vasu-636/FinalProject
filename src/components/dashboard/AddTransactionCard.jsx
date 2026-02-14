import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../../Features/transactions/transactionSlice";
import { toast } from "react-toastify";

const AddTransactionCard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const categories = useSelector((state) => state.categories.items);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleAdd = () => {
    if (!description || !amount || !category) {
      toast.error("Please fill all fields");
      return;
    }

    if (!user) {
      toast.error("User not authenticated");
      return;
    }

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

    toast.success("Transaction added successfully");

    // Reset
    setDescription("");
    setAmount("");
    setCategory("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-stone-100 p-6 mb-10">

      <h2 className="text-xl font-semibold text-stone-800 mb-6">
        Add Transaction
      </h2>

      <div className="grid md:grid-cols-6 gap-4">

        {/* Description */}
        <input
          type="text"
          placeholder="Description"
          className="input-style md:col-span-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          className="input-style"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Date */}
        <input
          type="date"
          className="input-style"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Type */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input-style"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-style"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Button */}
        <button
          onClick={handleAdd}
          className="bg-amber-500 text-white rounded-xl px-6 py-3 shadow hover:bg-amber-600 transition duration-200 font-medium"
        >
          Add
        </button>
      </div>

      {/* Local Styling */}
      <style>{`
        .input-style {
          border: 2px solid #e7e5e4;
          border-radius: 12px;
          padding: 12px 16px;
          outline: none;
          transition: 0.2s ease;
        }

        .input-style:focus {
          border-color: #f59e0b;
        }
      `}</style>
    </div>
  );
};

export default AddTransactionCard;
