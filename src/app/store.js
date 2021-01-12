import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { cryptoListSlice } from '../features/cryptoList/cryptoListSlice';

export default configureStore({
	reducer: {
		counter: counterReducer,
		cryptoList: cryptoListSlice.reducer,
	},
});
