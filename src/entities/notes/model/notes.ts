import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export interface Note {
  id: string;
  title: string;
  content: any;
  createDate: string;
  edit?: boolean;
}

interface NotesState {
  notes: Note[];
  filteredNotes: Note[];
  selectedNoteId: string | null;
}

const initialState: NotesState = {
  notes: [],
  filteredNotes: [],
  selectedNoteId: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    editNote: (state, action: PayloadAction<Note>) => {
      const { id, title, content } = action.payload;
      const existingNote = state.notes.find((note) => note.id === id);
      if (existingNote) {
        existingNote.title = title;
        existingNote.content = content;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      if (state.selectedNoteId === action.payload) {
        state.selectedNoteId = null;
      }
    },
    selectNote: (state, action: PayloadAction<string | null>) => {
      state.selectedNoteId = action.payload;
    },
    cloneCurrentNotes: (state) => {
      state.filteredNotes = state.notes;
    },
    resetSearchValues: (state) => {
      state.filteredNotes = [];
    },
    searchNotes: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredNotes = state.notes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm)
      );
    },
  },
});

export const {
  addNote,
  editNote,
  deleteNote,
  selectNote,
  searchNotes,
  cloneCurrentNotes,
  resetSearchValues,
} = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes.notes;
export const selectFilteredNotes = (state: RootState) =>
  state.notes.filteredNotes;
export const getActiveNoteId = (state: RootState) => state.notes.selectedNoteId;
export const selectSelectedNote = (state: RootState) => {
  const selectedNoteId = state.notes.selectedNoteId;
  return selectedNoteId
    ? state.notes.notes.find((note: Note) => note.id === selectedNoteId)
    : null;
};

export const reducer = notesSlice.reducer;
