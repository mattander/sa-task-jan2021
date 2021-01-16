import React from 'react';
import { useSelector } from 'react-redux';
import {
	getCurrencyMeta,
	selectCurrencies,
} from '../currencies/currenciesSlice';
import { TrackedCurrency } from './TrackedCurrency';

export function TrackedCurrenciesTable() {
	const metaData = useSelector(getCurrencyMeta);
	const currencies = useSelector(selectCurrencies);

	const rows = Object.entries(currencies.tracked)
		.sort(
			([aId, aIndex], [bId, bIndex]) =>
				metaData[aIndex].rank - metaData[bIndex].rank
		)
		.map(([id, index]) => (
			<TrackedCurrency
				key={`tracked-currency-${metaData[index].id}`}
				currency={metaData[index]}
				index={index}
				disabled={false}
			/>
		));

	return (
		<table>
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
	);
}
