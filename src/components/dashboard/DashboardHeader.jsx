import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Features/auth/authSlice";

const DashboardHeader = ({ onOpenCategory }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        
        {/* Left Side */}
        <div>
          <h1 className="text-3xl font-bold text-stone-800">
            ExpenseFlow
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Welcome, {user?.displayName || user?.email}
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          
          <button
            onClick={onOpenCategory}
            className="bg-amber-500 text-white px-5 py-2 rounded-xl shadow hover:bg-amber-600 transition duration-200 font-medium"
          >
            + Category
          </button>

          <button
            onClick={() => dispatch(logoutUser())}
            className="bg-stone-200 text-stone-700 px-5 py-2 rounded-xl hover:bg-stone-300 transition duration-200 font-medium"
          >
            Logout
          </button>

        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
