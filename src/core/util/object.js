import { reduce as _reduce } from 'lodash/fp';

export const forEach = (obj) => (callback) => {
    for (const prop of Object.keys(obj)) {
        callback(prop, obj[prop]);
    }
};

export const filter = (obj) => (filterFn, initialValue = {}) => {
    forEach(obj)((prop, value) => {
        if (filterFn(prop, value)) {
            initialValue[prop] = value;
        }
    });

    return initialValue;
};

export const reduce = _reduce.convert({ cap: false });

export const truthyReducer = (reducer) => (accumulator, value, prop) => {
    if (value) {
        return reducer(accumulator, value, prop);
    }

    return accumulator;
};
