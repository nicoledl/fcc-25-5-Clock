// Archivo store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Definir el estado inicial
const initialState = {
  interval: 5,
  timeSession: 25,
};

// Crear un slice (reducer + acciones) utilizando createSlice
const machineStatusSlice = createSlice({
  name: "clock",
  initialState,
  reducers: {
    setInterval: (state, action) => {
      state.interval = action.payload;
    },
    setTimeSession: (state, action) => {
      state.timeSession = action.payload;
    },
  },
});

// Obtener el reducer generado automáticamente por createSlice
const machineStatusReducer = machineStatusSlice.reducer;

// Obtener las acciones generadas automáticamente por createSlice
const { setInterval, setTimeSession } = machineStatusSlice.actions;

// Crear la store con configureStore
const store = configureStore({
  reducer: machineStatusReducer,
});

export { setInterval, setTimeSession, store };
