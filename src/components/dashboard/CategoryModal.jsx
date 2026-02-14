import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../Features/categories/categorySlice";
import { toast } from "react-toastify";

const CategoryModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (!user) {
      toast.error("User not authenticated");
      return;
    }

    dispatch(
      addCategory({
        name: name.trim(),
        uid: user.uid,
      })
    );

    toast.success("Category added successfully");

    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-2xl w-96 p-8 animate-fade-in">

        <h2 className="text-xl font-bold text-stone-800 mb-6">
          Add New Category
        </h2>

        <input
          type="text"
          placeholder="Category name"
          className="input-style w-full mb-6"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 rounded-lg hover:bg-stone-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
          >
            Save
          </button>
        </div>

      </div>

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

        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CategoryModal;
