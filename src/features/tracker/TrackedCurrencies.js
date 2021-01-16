import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencyMeta } from '../currencies/currenciesSlice';
import {
	debouncedAction,
	getTrackedCurrencies,
	getTrackedCurrencyQuotes,
} from './trackerSlice';
import { TrackedCurrency } from './TrackedCurrency';

export function TrackedCurrencies({ currencies }) {
	const dispatch = useDispatch();
	const metaData = useSelector(getCurrencyMeta);
	const trackedCurrencies = useSelector(getTrackedCurrencies);
	const rows = Object.entries(trackedCurrencies)
		.sort(
			([aId, aData], [bId, bData]) =>
				metaData[aData.metaIndex].rank - metaData[bData.metaIndex].rank
		)
		.map(([id, { metaIndex }]) => (
			<TrackedCurrency
				key={`tracked-currency-${metaData[metaIndex].id}`}
				currency={metaData[metaIndex]}
				index={metaIndex}
				disabled={Object.keys(trackedCurrencies).length < 2}
			/>
		));

	useEffect(() => {
		if (Object.keys(trackedCurrencies).length > 0) {
			// We use the debounce action to make sure we don't spam the server
			dispatch(debouncedAction(getTrackedCurrencyQuotes()));
		}
	}, [dispatch, trackedCurrencies]);
	return (
		<div className='row'>
			<div className='col-12 col-md-8'>
				<div className='tracked-currencies'>
					<h2>Tracked currencies</h2>
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
				</div>
			</div>
		</div>
	);
}
