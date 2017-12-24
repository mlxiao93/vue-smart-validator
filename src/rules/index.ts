import {isEmpty} from "../util/data";

export function required (value) {
    return !isEmpty(value);
}

export const url = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

export const email = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export function length (value = '', {val, max, min}) {
    if (val !== undefined) {
        if ((value + '').length !== val) return false;
    }
    if (max !== undefined) {
        if ((value + '').length > max) return false;
    }
    if (min !== undefined) {
        if ((value + '').length < min) return false;
    }
    return true;
}

export function number (value, {max, min, integer, float, positive, negative}) {
    if (!/^[+-]?\d+(\.\d+)?$/.test(value)) return false;
    if (max !== undefined) {
        if (+value > +max) return false;
    }
    if (min !== undefined) {
        if (+value < +min) return false;
    }
    if (integer !== undefined) {
        if (/\./.test(value)) return false;
    }
    if (float !== undefined) {
        if (!/\./.test(value)) return false;
    }
    if (positive !== undefined) {
        if (+value <= 0) return false;
    }
    if (negative !== undefined) {
        if (+value >= 0) return false;
    }
    return true;
}

export function equal (value, {val}) {
    return value == val;
}

export function notEqual (value, {val}) {
    return value != val;
}