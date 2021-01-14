import { createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const trackCurrencies = createAsyncThunk(
//     'currencies/getList',
//     async () => {
//         const { data, status } = await axios
//             .get('https://www.stackadapt.com/coinmarketcap/map')
//             .catch((err) => {
//                 console.error('Error while fetching available currencies');
//             });
//         return { data, status };
//     }
// );

export const trackerSlice = createSlice({
    name: 'tracker',
    initialState: {
        loading: 'idle',
        trackedIds: {},
    },
    reducers: {
        addSymbols(state, action) {
            for (const currency of action.currencies) {
                if (!state.trackedIds.hasOwnProperty(currency.id)) {
                    state.trackedIds[currency.id] = {
                        status: 'pending',
                    };
                }
            }
        },
    },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectTracker = (state) => state.tracker;
