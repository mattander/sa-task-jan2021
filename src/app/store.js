import { configureStore } from '@reduxjs/toolkit';
import { currenciesSlice } from '../features/currencies/currenciesSlice';
import { trackerSlice } from '../features/tracker/trackerSlice';

export default configureStore({
    reducer: {
        currencies: currenciesSlice.reducer,
        tracker: trackerSlice.reducer,
    },
});
