import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  token?: string;
  roles?: string[];
}

const initialState: State = {};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<State['token']>) => {
      state.token = action.payload;
    },
    setRoles: (state, action: PayloadAction<State['roles']>) => {
      state.roles = action.payload;
    }
  }
});
export const { setToken, setRoles } = app.actions;
export default app.reducer;
