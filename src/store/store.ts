import { configureStore } from '@reduxjs/toolkit';

import app from './slice/app';

const store = configureStore({
  reducer: {
    app
  }
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export default store;
