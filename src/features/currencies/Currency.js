import React from 'react';
import { useDispatch } from 'react-redux';

export function Currency({ currency, disabled, index, tracked }) {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch({
			type: 'tracker/add',
			currencies: [
				{
					id: currency.id,
					index,
				},
			],
		});
	};

	const classes = [];
	if (tracked.hasOwnProperty(currency.id)) classes.push('d-none');

	return (
		<li className={classes.join(' ')}>
			<button
				title={`Add ${currency.name} to tracking list`}
				disabled={disabled}
				className={disabled ? 'disabled' : null}
				onClick={handleClick}
			>
				Track
			</button>
			{currency.name} ({currency.symbol})
		</li>
	);
}
