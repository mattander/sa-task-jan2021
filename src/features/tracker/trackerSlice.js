import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTrackedCurrencyQuotes = createAsyncThunk(
	'tracker/updateQuotes',
	async (args, { getState }) => {
		const state = getState();
		const { data, status } = await axios
			.get(
				`https://www.stackadapt.com/coinmarketcap/quotes?id=${Object.keys(
					state.tracker.tracked
				).join(',')}`
			)
			.then((resp) => {
				return resp;
			})
			.catch((err) => {
				console.error('Error while fetching available currencies');
			});
		return { data, status };
	}
);

export const trackerSlice = createSlice({
	name: 'tracker',
	initialState: {
		loading: 'idle',
		tracked: {},
		quotes: {},
		status: null,
	},
	reducers: {
		add: (state, { currencies }) => {
			currencies.forEach(({ id, index }) => {
				state.tracked[id] = {
					metaIndex: index,
					quotes: [],
				};
			});
		},
		remove: (state, { currencies }) => {
			currencies.forEach(({ id, index }) => {
				delete state.tracked[id];
				delete state.quotes[id];
			});
		},
	},
	extraReducers: {
		[getTrackedCurrencyQuotes.pending]: (state) => {
			state.loading = 'pending';
		},
		[getTrackedCurrencyQuotes.fulfilled]: (state, { payload }) => {
			// Update the tracked quotes
			Object.entries(payload.data.data).forEach(([id, quote]) => {
				state.quotes[id] = quote;
			});

			// Store the status in case we need it
			state.status = payload.data.status;

			// Update loading
			state.loading = 'idle';
		},
	},
});

export const getTrackedCurrencies = (state) => state.tracker.tracked;
export const getQuotes = (state) => state.tracker.quotes;
