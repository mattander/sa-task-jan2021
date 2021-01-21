import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

export function TrackedCurrency({ currency, disabled }) {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch({
            type: 'tracker/remove',
            currencies: [
                {
                    id: currency.id,
                },
            ],
        });
    };

    const buttonClasses = ['tracker-button'];
    if (disabled) {
        buttonClasses.push('disabled');
        buttonClasses.push('text-muted');
    } else {
        buttonClasses.push('text-danger');
    }

    return (
        <tr>
            <td>
                <button
                    title={`Remove ${currency.name} from tracking list`}
                    className={buttonClasses.join(' ')}
                    disabled={disabled}
                    onClick={handleClick}
                >
                    <FontAwesomeIcon icon={faMinusCircle} />
                </button>
            </td>
            <td>{currency.name}</td>
            <td>{currency.symbol}</td>
            <td>{currency.cmc_rank ?? currency.rank ?? 'Loading...'}</td>
            <td>
                {currency.quote && currency.quote.USD
                    ? `$${currency.quote.USD.price.toFixed(2)} (USD)`
                    : 'Loading...'}
            </td>
        </tr>
    );
}
