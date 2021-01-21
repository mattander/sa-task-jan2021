import React from 'react';
import { useSelector } from 'react-redux';
import { getTrackedCurrencies } from '../tracker/trackerSlice';
import { selectCurrencies } from './currenciesSlice';
import { Currency } from './Currency';

export function CurrencyList() {
    const currencies = useSelector(selectCurrencies);
    const trackedCurrencies = useSelector(getTrackedCurrencies);

    const listItems = currencies.data.map((currency, index) => (
        <Currency
            key={`untracked-currency-${currency.id}`}
            currency={currency}
            index={index}
            tracked={trackedCurrencies}
            disabled={Object.entries(trackedCurrencies).length > 9}
        />
    ));

    return (
        <ul>
            {Object.keys(trackedCurrencies).length > 9 ? (
                <div className="text-danger mb-2">
                    You can't track more than 10 currencies at a time.
                </div>
            ) : null}
            {listItems}
        </ul>
    );
}
