import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuotes } from './trackerSlice';

export function TrackedCurrency({ currency, index, disabled }) {
	const dispatch = useDispatch();
	const quotes = useSelector(getQuotes);

	const handleClick = () => {
		dispatch({
			type: 'tracker/remove',
			currencies: [
				{
					id: currency.id,
					index,
				},
			],
		});
	};

	return (
		<tr>
			<td>
				<button
					title={`Remove ${currency.name} from tracking list`}
					disabled={disabled}
					onClick={handleClick}
				>
					Remove
				</button>
			</td>
			<td>{currency.name}</td>
			<td>{currency.symbol}</td>
			<td>{currency.cmc_rank ?? currency.rank ?? 'Loading...'}</td>
			<td>
				{quotes[currency.id] && quotes[currency.id].quote['USD']
					? `$${quotes[currency.id].quote['USD'].price.toFixed(
							2
					  )} (USD)`
					: 'Loading...'}
			</td>
		</tr>
	);
}
