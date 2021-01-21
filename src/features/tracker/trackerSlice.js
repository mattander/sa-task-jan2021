import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { debounce } from 'lodash';

export const getTrackedCurrencyQuotes = createAsyncThunk(
    'tracker/updateQuotes',
    async (args, { getState }) => {
        console.log('quotes xhr');
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

// I think it may be useful to be able to debounce other actions
// I might move this to a more generic place like the global level of the store
// I'd need to do more research on this
export const debouncedAction = createAsyncThunk(
    'debouncedAction',
    debounce(async (action, { dispatch }) => {
        dispatch(action);
    }, 500)
);

export const trackerSlice = createSlice({
    name: 'tracker',
    initialState: {
        loading: 'idle',
        tracked: {},
        status: null,
        sort: {
            type: 'CMC Rank',
            asc: true,
        },
    },
    reducers: {
        add: (state, { currencies }) => {
            currencies.forEach((currency) => {
                state.tracked[currency.id] = currency;
            });
        },
        remove: (state, { currencies }) => {
            currencies.forEach(({ id }) => {
                delete state.tracked[id];
            });
        },
        changeSort: (state, { sort }) => {
            state.sort = sort;
        },
    },
    extraReducers: {
        [getTrackedCurrencyQuotes.pending]: (state) => {
            state.loading = 'pending';
        },
        [getTrackedCurrencyQuotes.fulfilled]: (state, { payload }) => {
            // Update the tracked quotes
            Object.entries(payload.data.data).forEach(([id, { quote }]) => {
                state.tracked[id].quote = quote;
            });

            // Store the status in case we need it
            state.status = payload.data.status;

            // Update loading
            state.loading = 'idle';
        },
        [getTrackedCurrencyQuotes.rejected]: (state) => {
            state.status = 'failed';
        },
    },
});

export const getTrackedCurrencies = (state) => {
    return Object.values(state.tracker.tracked).sort((a, b) => {
        switch (state.tracker.sort.type) {
            case 'Name': {
                if (a.name < b.name) {
                    return state.tracker.sort.asc ? -1 : 1;
                }
                if (a.name > b.name) {
                    return state.tracker.sort.asc ? 1 : -1;
                }

                return 0;
            }
            case 'Symbol': {
                if (a.symbol < b.symbol) {
                    return state.tracker.sort.asc ? -1 : 1;
                }
                if (a.symbol > b.symbol) {
                    return state.tracker.sort.asc ? 1 : -1;
                }

                return 0;
            }
            case 'Price (USD)': {
                return state.tracker.sort.asc
                    ? a.quote.USD.price - b.quote.USD.price
                    : b.quote.USD.price - a.quote.USD.price;
            }
            default: {
                // Rank
                return state.tracker.sort.asc
                    ? a.rank - b.rank
                    : b.rank - a.rank;
            }
        }
    });
};
export const getSort = (state) => state.tracker.sort;
