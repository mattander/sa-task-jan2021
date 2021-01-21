import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSort, getTrackedCurrencies } from './trackerSlice';
import { TrackedCurrency } from './TrackedCurrency';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

export function TrackedCurrencies() {
    const dispatch = useDispatch();
    const trackedCurrencies = useSelector(getTrackedCurrencies);
    const currentSort = useSelector(getSort);

    const rows = Object.entries(trackedCurrencies).map(([id, currency]) => (
        <TrackedCurrency
            key={`tracked-currency-${currency.id}`}
            currency={currency}
            disabled={Object.keys(trackedCurrencies).length < 2}
        />
    ));

    const handleHeaderClick = (e) => {
        if (e.target.innerText.trim() === currentSort.type) {
            dispatch({
                type: 'tracker/changeSort',
                sort: {
                    type: currentSort.type.trim(),
                    asc: !currentSort.asc,
                },
            });
        } else {
            dispatch({
                type: 'tracker/changeSort',
                sort: {
                    type: e.target.innerText.trim(),
                    asc: true,
                },
            });
        }
    };

    return (
        <div className="tracker-table-container">
            <div>Click a heading to sort</div>
            <table className="tracker-table table table-striped table-borderless">
                <thead>
                    <tr>
                        <th></th>
                        <th
                            className="sortable-heading"
                            onClick={handleHeaderClick}
                        >
                            Name
                            {currentSort.type === 'Name' ? (
                                <FontAwesomeIcon
                                    size="xs"
                                    className="ml-2"
                                    icon={
                                        currentSort.asc
                                            ? faArrowDown
                                            : faArrowUp
                                    }
                                />
                            ) : null}
                        </th>
                        <th
                            className="sortable-heading"
                            onClick={handleHeaderClick}
                        >
                            Symbol
                            {currentSort.type === 'Symbol' ? (
                                <FontAwesomeIcon
                                    size="xs"
                                    className="ml-2"
                                    icon={
                                        currentSort.asc
                                            ? faArrowDown
                                            : faArrowUp
                                    }
                                />
                            ) : null}
                        </th>
                        <th
                            className="sortable-heading"
                            onClick={handleHeaderClick}
                        >
                            CMC Rank
                            {currentSort.type === 'CMC Rank' ? (
                                <FontAwesomeIcon
                                    size="xs"
                                    className="ml-2"
                                    icon={
                                        currentSort.asc
                                            ? faArrowDown
                                            : faArrowUp
                                    }
                                />
                            ) : null}
                        </th>
                        <th
                            className="sortable-heading"
                            onClick={handleHeaderClick}
                        >
                            Price (USD){' '}
                            {currentSort.type === 'Price (USD)' ? (
                                <FontAwesomeIcon
                                    size="xs"
                                    className="ml-2"
                                    icon={
                                        currentSort.asc
                                            ? faArrowDown
                                            : faArrowUp
                                    }
                                />
                            ) : null}
                        </th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
            {Object.keys(trackedCurrencies).length < 2 ? (
                <div className="text-danger mb-2">
                    You can't track less than one currency at a time.
                </div>
            ) : null}
        </div>
    );
}
