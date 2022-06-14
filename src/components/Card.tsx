import { MaterialCommunityIcons, } from '@expo/vector-icons';
import { Box, Column, Heading, Icon, Row, useColorMode, } from 'native-base';
import React from 'react';
import { useColorScheme, } from 'react-native';
import { useTranslation, } from 'react-i18next';

import { useAppSelector, } from '../hooks';
import { Currency, Unit, } from '../models';

import { BasicInput, } from './BasicInput';
import { CompoundInput, } from './CompoundInput';
import { EditText, } from './EditText';
import { Rating, } from './Rating';

export const Card = ({
    name,
    difference,
    currency,
    currencies,
    price,
    quantity = 1,
    amount,
    unit,
    units,
    onNameChange,
    onCurrencyChange,
    onPriceChange,
    onQuantityChange,
    onAmountChange,
    onUnitChange,
} : {
    name?             : string,
    difference?       : number,
    currency          : Currency,
    currencies        : Currency[],
    price?            : number,
    quantity?         : number,
    amount?           : number,
    unit?             : Unit,
    units             : Unit[],
    onNameChange?     : (newName? : string) => void,
    onCurrencyChange? : (newCurrency? : string) => void,
    onPriceChange?    : (newPrice? : number) => void,
    onQuantityChange? : (newQuantity? : number) => void,
    onAmountChange?   : (newAmount? : number) => void,
    onUnitChange?     : () => void,
}) => {
    const { unitType, } = useAppSelector(state => state.settings);

    const colorMode = useColorScheme() || 'light';

    const { t, } = useTranslation();

    return (
        <Box
            padding={4}
            backgroundColor={colorMode === 'light' ? 'light.50' : 'dark.50'}
            shadow={2}>
            <Column space={2}>
                <Row
                    space={2}
                    alignItems='center'
                    justifyContent='center'>
                    <EditText
                        flexGrow={1}
                        title={t('label_product_name')}
                        value={name}
                        onChange={onNameChange} />
                    {difference !== undefined && difference > 1 && <Heading color='error.500'>{`+${Math.round(difference)}%`}</Heading>}
                    {difference !== undefined && difference <= 1 && (
                        <Icon
                            size='lg'
                            color='success.500'
                            as={MaterialCommunityIcons}
                            name='thumb-up' />
                    )}
                </Row>
                <Row space={2}>
                    <CompoundInput
                        width='50%'
                        paddingRight={1}
                        title={t('label_price')}
                        error={t('error_price')}
                        value={price}
                        chooserTitle={t('label_currency')}
                        chooserData={currencies.map(value => value.code)}
                        chooserValue={currency.code}
                        onValueChange={onPriceChange}
                        onChooserSelected={onCurrencyChange} />
                    <CompoundInput
                        width='50%'
                        paddingX={1}
                        title={t('label_amount')}
                        error={t('error_amount')}
                        value={amount}
                        chooserTitle={t('label_unit')}
                        chooserData={units.filter(value => value.type === unitType).map(value => value.code)}
                        chooserValue={unit?.code}
                        onValueChange={onAmountChange}
                        onChooserSelected={onUnitChange} />
                </Row>
                <Row space={2}>
                    <BasicInput
                        width='50%'
                        paddingRight={1}
                        title={t('label_quantity')}
                        error={t('error_quantity')}
                        value={String(quantity)}
                        onChange={onQuantityChange} />
                    <Rating
                        width='50%'
                        paddingX={1}
                        paddingTop={8}
                        value={difference === undefined ? undefined : Math.round(difference / 10)} />
                </Row>
            </Column>
        </Box>
    );
};
