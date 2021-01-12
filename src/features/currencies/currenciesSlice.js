import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCurrenciesList = createAsyncThunk(
    'currencies/getList',
    async () => {
        const { data, status } = await axios.get(
            'https://www.stackadapt.com/coinmarketcap/map'
        );
        return { data, status };
    }
);

export const currenciesSlice = createSlice({
    name: 'currencies',
    initialState: {
        loading: 'idle',
        data: [],
        status: null,
    },
    reducers: {},
    extraReducers: {
        [getCurrenciesList.fulfilled]: (state, { payload }) => {
            state.data = [...payload.data.data];
            state.status = payload.data.status;
        },
    },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCurrencies = (state) => state.currencies;
