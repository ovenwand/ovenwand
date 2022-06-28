import faunadb from 'faunadb';

export const { Client, Query, query: q } = faunadb;

export * from './utils';
export * from './model';
export * from './request';
export * from './schema';
export * from './client';
export * from './gql';
