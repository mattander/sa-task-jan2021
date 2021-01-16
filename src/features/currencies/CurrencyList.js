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

	return (
		<div className='row'>
			<div className='col-12 col-md-8'>
				<div className='currencies-list'>
					<ul className='currency-list'>{listItems}</ul>
				</div>
			</div>
		</div>
	);
}
