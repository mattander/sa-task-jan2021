import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';

test('it opens the currencies list when you click the toggle', () => {
	const { getByText } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	userEvent.click(getByText('Add currencies'));

	expect(getByText(/Available currencies/i)).toBeInTheDocument();
});

test('it shows the tracking table', () => {
	const { getByText } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	expect(getByText('CMC Rank')).toBeInTheDocument();
});
