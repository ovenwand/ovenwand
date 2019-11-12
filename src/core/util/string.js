import { kebabCase } from 'lodash';

export const slug = (str) => encodeURIComponent(kebabCase(str));