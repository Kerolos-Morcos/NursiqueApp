import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationArr: [],
};

const notificationArrSlice = createSlice({
  name: 'notificationArr',
  initialState,
  reducers: {
    increaseNotification: (state, action) => {
      state.notificationArr.push(action.payload);
    },
    decreaseNotification: (state) => {
      state.notificationArr.pop();
    },
  },
});

export const { increaseNotification, decreaseNotification } = notificationArrSlice.actions;

export default notificationArrSlice.reducer;
