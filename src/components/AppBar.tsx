import { Row, } from 'native-base';
import React, { useEffect, useMemo, useState, } from 'react';
import { useTranslation, } from 'react-i18next';

import { useGetRatesQuery, } from '../apis';
import { API_UPDATE_INTERVAL, } from '../constants';
import { useAppDispatch, useAppSelector, } from '../hooks';
import { Rate, Rates, Units, } from '../models';
import { setCurrency, setUnitType, } from '../redux';
import { handleError, } from '../utils';

import { ChooserAction, } from './ChooserAction';

export const AppBar = () => {
    const dispatch = useAppDispatch();

    const { currency, unitType, } = useAppSelector(state => state.settings);

    const [ rates, setRates, ] = useState<Rate[]>(Rates);

    const { data, error, } = useGetRatesQuery(undefined, {
        pollingInterval : API_UPDATE_INTERVAL,
    });

    const { t, } = useTranslation();

    const unitTypes : string[] = t('unit_types', {
        returnObjects : true,
    });

    const units = [ ...new Set(Units.map(unit => unit.type)), ];

    const handleUnitTypeChange = (newUnitType : string) => dispatch(setUnitType(units[unitTypes.indexOf(newUnitType)]));

    const handleCurrencyChange = (newCurrency : string) => dispatch(setCurrency({
        code : newCurrency,
    }));

    const unitTypeIconName = useMemo(() => unitType === 'area' ? 'square-rounded' : unitType === 'length' ? 'ruler' : unitType === 'time' ? 'clock' : unitType === 'volume' ? 'cup' : unitType === 'weight' ? 'weight' : 'null', [ unitType, ]);

    useEffect(() => data && setRates(data), [ data, ]);

    useEffect(() => error && handleError(error), [ error, ]);

    return (
        <Row
            width='full'
            padding={2}
            space={2}
            shadow={2}>
            <ChooserAction
                title={t('label_unit_type')}
                iconName={unitTypeIconName}
                data={unitTypes}
                value={unitTypes[units.indexOf(unitType)]}
                onChange={handleUnitTypeChange} />
            <ChooserAction
                title={t('label_currency')}
                iconName='cash-multiple'
                data={rates.map(rate => rate.code)}
                value={currency.code}
                onChange={handleCurrencyChange} />
        </Row>
    );
};
