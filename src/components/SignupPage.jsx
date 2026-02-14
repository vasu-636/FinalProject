import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, googleLogin } from "../Features/auth/authSlice";

export default function SignupPage({ onSwitch }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-stone-200">

        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">₹</span>
          </div>
          <h2 className="text-3xl font-bold mt-4 text-stone-800">
            Create Account
          </h2>
          <p className="text-stone-500 text-sm">
            Start managing your finances today
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email address"
            className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200"></div>
          </div>
          <div className="relative text-center text-sm">
            <span className="px-3 bg-white text-stone-400">
              OR
            </span>
          </div>
        </div>

        {/* GOOGLE BUTTON */}
        <button
          onClick={() => dispatch(googleLogin())}
          className="w-full border-2 border-stone-200 rounded-xl py-3 font-medium hover:bg-stone-50 transition-all"
        >
          Continue with Google
        </button>

        {/* SWITCH */}
        <p className="text-center text-sm text-stone-500 mt-6">
          Already have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-amber-600 font-semibold hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
