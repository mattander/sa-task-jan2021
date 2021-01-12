import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import store from './app/store';
import './App.scss';
import {
    getCurrenciesList,
    selectCurrencies,
} from './features/currencies/currenciesSlice';

function App() {
    const availableCurrencies = useSelector(selectCurrencies);
    const currencyList = availableCurrencies.data.map((currency) => {
        return <li>Symbol: {currency.symbol}</li>;
    });

    useEffect(() => {
        // If we have no status, it means we haven't fetched data yet. We'll fetch the data.
        // This avoids a component update loop of constantly fetching data.
        // Later we will use this to also update the list from time to time
        if (availableCurrencies.status === null) {
            store.dispatch(getCurrenciesList());
        }
    });

    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <h1>Test</h1>
                        <div className="currencies-list">
                            <ul>{currencyList}</ul>
                        </div>
                        <p>Test</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
