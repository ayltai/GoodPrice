import { Currency, } from './Currency';
import { Unit, } from './Unit';

export type Product = {
    name?        : string,
    currency     : Currency,
    price?       : number,
    unitPrice?   : number,
    quantity?    : number,
    amount?      : number,
    totalAmount? : number,
    unit         : Unit,
    difference?  : number,
};
