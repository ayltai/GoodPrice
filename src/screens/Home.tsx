import { MaterialCommunityIcons, } from '@expo/vector-icons';
import { NavigationProp, } from '@react-navigation/native';
import { convert, } from 'convert';
import { Box, Center, Fab, Icon, Pressable, useColorMode, View, } from 'native-base';
import React, { useEffect, useRef, useState, } from 'react';
import { useTranslation, } from 'react-i18next';
import { SwipeListView, } from 'react-native-swipe-list-view';

import { useGetRatesQuery, } from '../apis';
import { API_UPDATE_INTERVAL, } from '../constants';
import { Action, AppBar, Card, } from '../components';
import { Product, Rate, Rates, Units, } from '../models';
import { useAppSelector, } from '../hooks';
import { generateRandomName, handleError, } from '../utils';

const ICON_SIZE = 108;

export const Home = ({
    navigation,
} : {
    navigation? : NavigationProp<string>,
}) => {
    const [ rates, setRates, ] = useState<Rate[]>(Rates);

    const { currency, unitType, } = useAppSelector(state => state.settings);

    const { data, error, } = useGetRatesQuery(undefined, {
        pollingInterval : API_UPDATE_INTERVAL,
    });

    const { colorMode, } = useColorMode();

    const { t, } = useTranslation();

    const createProduct = () => ({
        currency,
        name     : t('product_id', {
            name : generateRandomName(),
        }),
        quantity : 1,
        unit     : Units.filter(unit => unit.type === unitType)[0],
    });

    const createProducts = (count : number) => {
        const newProducts : Product[] = [];

        for (let i = 0; i < count; i++) newProducts.push(createProduct());

        return newProducts;
    };

    const [ products, setProducts, ] = useState<Product[]>(createProducts(2));

    const ref = useRef<SwipeListView<Product>>(null);

    const handleCompare = () => {
        if (rates && products.every(product => product.quantity !== undefined && product.quantity > 0) && products.every(product => product.price !== undefined && product.price > 0) && products.every(product => product.amount !== undefined && product.amount > 0)) {
            const baseUnit = Units.filter(unit => unit.type === unitType)[0].code;

            const newProducts = products.slice()
                .map(product => ({
                    ...product,
                    // @ts-ignore
                    totalAmount : unitType === undefined ? product.quantity! * product.amount! : convert(product.quantity! * product.amount!, product.unit.code).to(baseUnit),
                }) as Product)
                .map(product => ({
                    ...product,
                    unitPrice : product.totalAmount! / (product.price! / rates.find(rate => rate.code === product.currency.code)!.rate),
                }) as Product);

            const bestUnitPrice = Math.max(...newProducts.map(product => product.unitPrice!));

            setProducts(newProducts.map(product => ({
                ...product,
                difference : (1 - product.unitPrice! / bestUnitPrice) * 100,
            }) as Product));
        }
    };

    const handleAddProduct = () => {
        setProducts([
            ...products,
            createProduct(),
        ]);

        // @ts-ignore
        ref.current?._listView.scrollToEnd({
            animated : true,
        });
    };

    const renderItem = ({
        item,
        index,
    } : {
        item  : Product,
        index : number,
    }) => {
        const handleNameChange = (newName? : string) => setProducts(products.slice().map((product, i) => i === index ? {
            ...product,
            name : newName,
        } : product));

        const handleCurrencyChange = (newCurrency? : string) => {
            setProducts(products.slice().map((product, i) => i === index ? {
                ...product,
                currency : rates.find(rate => rate.code === newCurrency) || currency,
            } : product));
        };

        const handlePriceChange = (newPrice? : number) => setProducts(products.slice().map((product, i) => i === index ? {
            ...product,
            price : newPrice,
        } : product));

        const handleQuantityChange = (newQuantity? : number) => setProducts(products.slice().map((product, i) => i === index ? {
            ...product,
            quantity : newQuantity,
        } : product));

        const handleAmountChange = (newAmount? : number) => setProducts(products.slice().map((product, i) => i === index ? {
            ...product,
            amount : newAmount,
        } : product));

        const handleUnitChange = (newUnit? : string) => setProducts(products.slice().map((product, i) => i === index ? {
            ...product,
            unit : Units.find(unit => unit.code === newUnit) || Units[0],
        } : product));

        return (
            <Card
                name={item.name}
                difference={item.difference}
                currency={item.currency}
                currencies={rates.map(rate => ({
                    code : rate.code,
                })) || []}
                price={item.price}
                quantity={item.quantity}
                amount={item.amount}
                unit={item.unit}
                units={Units}
                onNameChange={handleNameChange}
                onCurrencyChange={handleCurrencyChange}
                onPriceChange={handlePriceChange}
                onQuantityChange={handleQuantityChange}
                onAmountChange={handleAmountChange}
                onUnitChange={handleUnitChange} />
        );
    };

    const renderHiddenItem = ({
        index,
    } : {
        index : number,
    }) => {
        const handlePress = () => {
            const newProducts = products.slice();
            newProducts.splice(index, 1);

            setProducts(newProducts);
        };

        return (
            <Box
                borderColor={colorMode === 'light' ? 'light.500' : 'dark.500'}
                flex={1}>
                <Pressable
                    width={ICON_SIZE}
                    height='full'
                    marginLeft='auto'
                    backgroundColor='error.500'
                    _pressed={{
                        backgroundColor : 'error.700',
                    }}
                    onPress={handlePress}>
                    <Center height='full'>
                        <Icon
                            size='xl'
                            as={MaterialCommunityIcons}
                            name='delete'
                            color='lightText' />
                    </Center>
                </Pressable>
            </Box>
        );
    };

    useEffect(() => setProducts(products.slice().map(product => ({
        ...product,
        currency,
    }))), [ currency, ]);

    useEffect(() => setProducts(products.slice().map(product => ({
        ...product,
        unit : Units.filter(unit => unit.type === unitType)[0],
    }))), [ unitType, ]);

    useEffect(() => data && setRates(data), [ data, ]);

    useEffect(() => error && handleError(error), [ error, ]);

    useEffect(() => navigation && navigation.setOptions({
        headerRight : () => (
            <Action
                icon='brightness-percent'
                onPress={handleCompare} />
        ),
    }), [ currency, navigation, products, unitType, ]);

    return (
        <>
            <SwipeListView
                ref={ref}
                useFlatList
                rightOpenValue={-ICON_SIZE}
                data={products}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                ListFooterComponent={<View height={24} />} />
            <Fab
                size='md'
                accessibilityLabel='fab'
                shadow={2}
                icon={
                    <Icon
                        size='lg'
                        as={MaterialCommunityIcons}
                        name='plus' />
                }
                onPress={handleAddProduct} />
            <AppBar />
        </>
    );
};
