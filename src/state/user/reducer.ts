import { createSlice } from '@reduxjs/toolkit';
import { ConnectionType } from '@/connections';

export interface UserState {
  selectedWallet?: ConnectionType;
  walletAddressBtcTaproot?: string;
  walletAddress?: string;
}

export const initialState: UserState = {
  selectedWallet: undefined,
  walletAddressBtcTaproot: undefined,
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
      state.walletAddressBtcTaproot = payload;
    },
    resetUser(state) {
      state.selectedWallet = undefined;
      state.walletAddress = undefined;
      state.walletAddressBtcTaproot = undefined;
    },
  },
});

export const { updateSelectedWallet, resetUser, updateTaprootWallet, updateEVMWallet } = userSlice.actions;
export default userSlice.reducer;
