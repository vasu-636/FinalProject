import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

// ADD EXPENSE
export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async ({ title, amount, categoryId, uid }) => {
    const docRef = await addDoc(collection(db, "expenses"), {
      title,
      amount,
      categoryId,
      uid,
      createdAt: new Date()
    });

    return {
      id: docRef.id,
      title,
      amount,
      categoryId,
      uid
    };
  }
);

// FETCH USER EXPENSES
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (uid) => {
    const q = query(
      collection(db, "expenses"),
      where("uid", "==", uid)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
);

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    items: []
  },
  extraReducers: (builder) => {
    builder
      .addCase(addExpense.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  }
});

export default expenseSlice.reducer;
