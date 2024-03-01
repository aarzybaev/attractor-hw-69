import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiSerial, OneSerial} from '../types';
import {AppDispatch} from '../app/store';
import axiosAPI from '../axiosAPI';

export const fetchSerials = createAsyncThunk<ApiSerial[], string, {dispatch: AppDispatch}>(
  'serials/fetchAll',
  async (arg) => {
    const {data: serials} = await axiosAPI.get<ApiSerial[] | null>('/search/shows?q=' + arg);
    return serials ?? [];
  }
);

export const fetchOne = createAsyncThunk<OneSerial, string, {dispatch: AppDispatch}>(
  'serials/fetchOne',
  async (id) => {
    const {data} = await axiosAPI.get<OneSerial | null>('/shows/' + id);
    if (data === null) {
      throw new Error('Not found');
    }
    return data;
  }
);