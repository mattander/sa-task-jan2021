import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import {
    getCurrenciesList,
    selectCurrencies,
} from './features/currencies/currenciesSlice';

function App() {
    const dispatch = useDispatch();
    const availableCurrencies = useSelector(selectCurrencies);
    const currencyList = availableCurrencies.data.map((currency) => {
        return <li key={currency.id}>Symbol: {currency.symbol}</li>;
    });

    useEffect(() => {
        // If we have no status, it means we haven't fetched data yet. We'll fetch the data.
        // This avoids a component update loop of constantly fetching data.
        // Later we will use this to also update the list from time to time
        if (availableCurrencies.status === null) {
            dispatch(getCurrenciesList());
        }
    });

    const trackedCurrencies = useSelector((state) => state.tracker);

    useEffect(() => {
        console.log('before', { trackedCurrencies });
        dispatch({
            type: 'tracker/addSymbols',
            currencies: availableCurrencies.data.slice(0, 5),
        });
        console.log('after', { trackedCurrencies });
    }, [dispatch, availableCurrencies, trackedCurrencies]);

    // const trackedCurrencyInfo = Object.keys.map()

    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Symbol</th>
                                <th>CMC Rank</th>
                                <th>Price (USD)</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <h1>Test</h1>
                        <div className="currencies-list">
                            <ul>{currencyList}</ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
