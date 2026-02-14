import { createSlice } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTransactions: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setTransactions, setError } =
  transactionSlice.actions;

/* ================= REAL-TIME LISTENER ================= */

export const subscribeToTransactions = (uid) => (dispatch) => {
  dispatch(setLoading(true));

  const q = query(
    collection(db, "transactions"),
    where("uid", "==", uid)
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setTransactions(data));
    },
    (error) => {
      dispatch(setError(error.message));
    }
  );

  return unsubscribe;
};

/* ================= ADD ================= */

export const addTransaction = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await addDoc(collection(db, "transactions"), data);
  } catch (error) {
    dispatch(setError(error.message));
  }
};

/* ================= DELETE ================= */

export const deleteTransaction = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "transactions", id));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default transactionSlice.reducer;
