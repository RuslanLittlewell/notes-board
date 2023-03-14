import { configureStore } from "@reduxjs/toolkit";

import { notesModel } from "entities/notes";

export const store = configureStore({
  reducer: {
    notes: notesModel.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
