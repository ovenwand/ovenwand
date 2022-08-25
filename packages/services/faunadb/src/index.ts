import faunadb from 'faunadb';

export const q = faunadb.query;
export type { ClientConfig, Expr, Query } from 'faunadb';

export * from './helpers';
export * from './utils';
export * from './model';
export * from './schema';
export * from './client';
export * from './gql';
export * from './migrate';
