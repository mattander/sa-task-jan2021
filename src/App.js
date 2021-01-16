import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import {
	getCurrenciesList,
	selectCurrencies,
} from './features/currencies/currenciesSlice';
import { CurrencyList } from './features/currencies/CurrencyList';
import { TrackedCurrencies } from './features/tracker/TrackedCurrencies';
import Dropdown from 'react-bootstrap/Dropdown';

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

	const tryAgainClick = () => {
		dispatch(getCurrenciesList());
	};

	const mainView =
		currencies.status !== 'failed' ? (
			<div className='row'>
				<div className='col-12 col-md-8 col-lg-7'>
					<div className='d-flex justify-content-end my-2'>
						<Dropdown className='currencies-dropdown'>
							<Dropdown.Toggle
								variant='primary'
								id='currencyListDropdown'
							>
								Add currencies
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Header>
									Available currencies
								</Dropdown.Header>
								<CurrencyList />
							</Dropdown.Menu>
						</Dropdown>
					</div>
					<TrackedCurrencies />
				</div>
			</div>
		) : (
			<div className='row'>
				<div className='col'>
					<div className='alert alert-danger' role='alert'>
						<p>
							Uh oh. Something went wrong when fetching the list
							of trackable currencies.
						</p>
						<p>You can try again now or come back later.</p>
						<button
							className='btn btn-primary mt-2'
							onClick={tryAgainClick}
						>
							Try again
						</button>
					</div>
				</div>
			</div>
		);

	return (
		<div className='App'>
			<div className='container'>
				<h1>Cryptocurrency tracker</h1>
				{mainView}
			</div>
		</div>
	);
}

export default App;
