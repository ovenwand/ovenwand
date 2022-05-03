/// <reference types="cypress" />

import type { RenderResult } from '@testing-library/svelte';

export type TestOptions<O = Record<string, unknown>> = () => {
	wrapper: Cypress.Chainable<RenderResult>;
	props?: Record<string, unknown>;
} & O;
