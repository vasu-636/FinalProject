import { createSlice } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setCategories: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { startLoading, setCategories, setError } =
  categorySlice.actions;

export const subscribeToCategories = (uid) => (dispatch) => {
  dispatch(startLoading());

  const q = query(
    collection(db, "categories"),
    where("uid", "==", uid)
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setCategories(data));
    },
    (error) => {
      dispatch(setError(error.message));
    }
  );

  return unsubscribe;
};

export const addCategory = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await addDoc(collection(db, "categories"), data);
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export default categorySlice.reducer;
