import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase.config";
import { logoutUser } from "./Features/auth/authSlice";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Dashboard from "./components/Dashboard";
import LoadingSpinner from "./components/LoadingSpinner";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [view, setView] = useState("login");
  const [checkingAuth, setCheckingAuth] = useState(true);

  // 🔥 Persistent Login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Manually dispatch user into Redux
        dispatch({
          type: "auth/login/fulfilled",
          payload: currentUser,
        });
      } else {
        dispatch(logoutUser());
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  // ⏳ While checking session
  if (checkingAuth) {
    return <LoadingSpinner />;
  }

  // 🔐 If logged in
  if (user) {
    return <Dashboard />;
  }

  // 🔄 Switch between login/signup
  return view === "login" ? (
    <LoginPage onSwitch={() => setView("signup")} />
  ) : (
    <SignupPage onSwitch={() => setView("login")} />
  );
}
