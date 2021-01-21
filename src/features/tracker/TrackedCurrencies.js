import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    debouncedAction,
    getTrackedCurrencies,
    getTrackedCurrencyQuotes,
} from './trackerSlice';
import { TrackedCurrency } from './TrackedCurrency';

export function TrackedCurrencies() {
    const dispatch = useDispatch();
    const trackedCurrencies = useSelector(getTrackedCurrencies);

    const rows = Object.entries(trackedCurrencies).map(([id, currency]) => (
        <TrackedCurrency
            key={`tracked-currency-${currency.id}`}
            currency={currency}
            disabled={Object.keys(trackedCurrencies).length < 2}
        />
    ));

    useEffect(() => {
        // We use the debounce action to make sure we don't spam the server
        dispatch(debouncedAction(getTrackedCurrencyQuotes()));
    }, [dispatch]);

    return (
        <div className="tracker-table-container">
            <table className="tracker-table table table-striped table-borderless">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>CMC Rank</th>
                        <th>Price (USD)</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
            {Object.keys(trackedCurrencies).length < 2 ? (
                <div className="text-danger mb-2">
                    You can't track less than one currency at a time.
                </div>
            ) : null}
        </div>
    );
}
