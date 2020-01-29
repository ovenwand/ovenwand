export const isObject = (obj) => {
    return typeof obj === 'object';
};

export const isFunction = (fn) => {
    return typeof obj === 'function';
};

export default {
    object: isObject,
    function: isFunction,
};