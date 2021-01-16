import React from 'react';
import { useSelector } from 'react-redux';
import { getTrackedCurrencies } from '../tracker/trackerSlice';
import { Currency } from './Currency';

export function CurrencyList({ currencies }) {
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

	return <ul>{listItems}</ul>;
}
