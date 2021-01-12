import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDataList = createAsyncThunk(
	'cryptolist/getData',
	async () => {
		const { data, status } = await axios.get(
			'https://www.stackadapt.com/coinmarketcap/map'
		);
		return { data, status };
	}
);

export const cryptoListSlice = createSlice({
	name: 'cryptoList',
	initialState: {
		loading: 'idle',
		data: [],
		status: {},
	},
	reducers: {},
	extraReducers: {
		[fetchDataList.fulfilled]: (state, { payload }) => {
			state.data = [...payload.data.data];
			state.status = payload.data.status;
		},
	},
});
