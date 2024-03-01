import {ApiSerial, OneSerial} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchOne, fetchSerials} from './serialThunks';
import {RootState} from '../app/store';

interface SerialsState {
  items: ApiSerial[];
  item: OneSerial | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
}

const initialState: SerialsState = {
  items: [],
  item: null,
  fetchLoading: false,
  fetchOneLoading: false,
};

export const serialsSlice = createSlice({
  name: 'serials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSerials.pending, (state) => {
      state.fetchLoading = true;
    }).addCase(fetchSerials.fulfilled, (state, {payload: serials}) => {
      state.fetchLoading = false;
      state.items = serials;
    }).addCase(fetchSerials.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(fetchOne.pending, (state) => {
      state.fetchOneLoading = true;
    }).addCase(fetchOne.fulfilled, (state, {payload: oneSerial}) => {
      state.fetchOneLoading = false;
      state.item = oneSerial;
    }).addCase(fetchOne.rejected, (state) => {
      state.fetchOneLoading = false;
    });
  }
});

export const serialsReducer = serialsSlice.reducer;
export const selectSerials = (state: RootState) => state.serials.items;
export const selectOneSerial = (state: RootState) => state.serials.item;
export const selectFetchSerialsLoading = (state: RootState) => state.serials.fetchLoading;
export const selectFetchOneLoading = (state: RootState) => state.serials.fetchOneLoading;
