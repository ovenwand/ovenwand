import { flow, trim } from 'lodash/fp';
import { reduce, truthyReducer } from './object';

const classNameReducer = truthyReducer((classString, value, prop) => classString + ` ${prop}`);
export const createClassName = flow(
    reduce(classNameReducer, ''),
    trim,
);

export default createClassName;
