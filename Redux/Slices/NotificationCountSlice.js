import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationCount: 0,
};

const notificationCountSlice = createSlice({
  name: 'notificationCount',
  initialState,
  reducers: {
    increaseNotificationCount: (state) => {
      state.notificationCount += 1;
    },
    decreaseNotificationCount: (state) => {
      state.notificationCount -= 1;
    },
  },
});

export const { increaseNotificationCount, decreaseNotificationCount } = notificationCountSlice.actions;

export default notificationCountSlice.reducer;
