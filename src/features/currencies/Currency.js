import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

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

	const listItemClasses = [];
	if (tracked.hasOwnProperty(currency.id)) listItemClasses.push('d-none');

	const buttonClasses = ['tracker-button', 'text-success'];
	if (disabled) buttonClasses.push('disabled');

	return (
		<li className={listItemClasses.join(' ')}>
			<button
				title={`Add ${currency.name} to tracking list`}
				disabled={disabled}
				className={buttonClasses.join(' ')}
				onClick={handleClick}
			>
				<FontAwesomeIcon icon={faPlusCircle} />
			</button>
			{currency.name} ({currency.symbol})
		</li>
	);
}
