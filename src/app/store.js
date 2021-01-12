import { configureStore } from '@reduxjs/toolkit';
import { currenciesSlice } from '../features/currencies/currenciesSlice';

export default configureStore({
    reducer: {
        currencies: currenciesSlice.reducer,
    },
});
