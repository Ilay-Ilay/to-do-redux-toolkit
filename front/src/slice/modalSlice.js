import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    modalType: null,
    modalProps: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.modalProps = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
