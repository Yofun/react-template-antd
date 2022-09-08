import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  token?: string;
}

const initialState: State = {};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<State['token']>) => {
      state.token = action.payload;
    }
  }
});
export const { setToken } = app.actions;
export default app.reducer;
