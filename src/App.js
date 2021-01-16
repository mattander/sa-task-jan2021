import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import {
	getCurrenciesList,
	selectCurrencies,
} from './features/currencies/currenciesSlice';
import { CurrencyList } from './features/currencies/CurrencyList';
import { TrackedCurrencies } from './features/tracker/TrackedCurrencies';

function App() {
	const dispatch = useDispatch();
	const currencies = useSelector(selectCurrencies);
	const currenciesList = currencies.data;

	useEffect(() => {
		// If we have no status, it means we haven't fetched data yet. We'll fetch the data.
		// This avoids a component update loop of constantly fetching data.
		// Later we will use this to also update the list from time to time by checking last update time

		if (currenciesList.length === 0) {
			dispatch(getCurrenciesList());
		}
	}, [dispatch, currenciesList]);

	useEffect(() => {
		if (currencies.data.length > 0) {
			// If there are currencies, we update the tracker list once
			dispatch({
				type: 'tracker/add',
				currencies: currencies.data.slice(0, 5).map((item, index) => {
					return {
						id: item.id,
						index,
					};
				}),
			});
		}
	}, [dispatch, currencies]);

	return (
		<div className='App'>
			<div className='container'>
				<TrackedCurrencies currencies={currencies} />
				<h2>Untracked currencies</h2>
				<CurrencyList currencies={currencies} />
			</div>
		</div>
	);
}

export default App;
