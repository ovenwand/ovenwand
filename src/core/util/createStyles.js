import { flow, trim } from 'lodash/fp';
import { reduce, truthyReducer } from './object';

const styleReducer = truthyReducer((classString, value, prop) => classString + `${prop}: ${value};`);
export const createStyle = flow(
    reduce(styleReducer, ''),
    trim,
);

export default createStyle;
