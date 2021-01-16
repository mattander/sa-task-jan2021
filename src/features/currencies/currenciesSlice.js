import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCurrenciesList = createAsyncThunk(
	'currencies/getList',
	async () => {
		const { data, status } = await axios
			.get('https://www.stackadapt.com/coinmarketcap/map?sort=cmc_rank')
			.catch((err) => {
				console.error(
					'Error while fetching available currencies' + err
				);
			});
		return { data, status };
	}
);

export const currenciesSlice = createSlice({
	name: 'currencies',
	initialState: {
		loading: 'idle',
		data: [],
		tracked: {},
		status: null,
	},
	reducers: {},
	extraReducers: {
		[getCurrenciesList.pending]: (state) => {
			state.loading = 'pending';
		},
		[getCurrenciesList.fulfilled]: (state, { payload }) => {
			// Grab the raw data
			state.data = [...payload.data.data];

			// Store the status in case we need it
			state.status = payload.data.status;

			// Update loading
			state.loading = 'idle';
		},
	},
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCurrencies = (state) => state.currencies;
export const getCurrencyMeta = (state) => state.currencies.data;
