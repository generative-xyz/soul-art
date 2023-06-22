import { createSlice } from '@reduxjs/toolkit';
import { ConnectionType } from '@/connections';

export interface UserState {
  selectedWallet?: ConnectionType;
  btcAddress?: string;
  walletAddress?: string;
}

export const initialState: UserState = {
  selectedWallet: undefined,
  btcAddress: undefined,
  walletAddress: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateSelectedWallet(state, { payload: { wallet } }) {
      state.selectedWallet = wallet;
    },
    updateEVMWallet(state, { payload }) {
      state.walletAddress = payload;
    },
    updateTaprootWallet(state, { payload }) {
      state.btcAddress = payload;
    },
    resetUser(state) {
      state.selectedWallet = undefined;
      state.walletAddress = undefined;
      state.btcAddress = undefined;
    },
  },
});

export const { updateSelectedWallet, resetUser, updateTaprootWallet, updateEVMWallet } = userSlice.actions;
export default userSlice.reducer;
