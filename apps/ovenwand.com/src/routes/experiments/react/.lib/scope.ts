import { useCallback, useId, useState } from 'react';

export function createScope() {
	return {
		id: useId(),
		isRendering: false,
		isTracked: false,
		listener: () => {}
	};
}

function register(listener, scope = getCurrentScope()) {
	scope.listener = listener;
	scope.isTracked = true;
}

function flush(value, scope = getCurrentScope()) {
	scope.listener(value);
	scope.listener = () => {};
	scope.isTracked = false;
}

let rootScope;
let currentScope;

export function getCurrentScope() {
	return currentScope || rootScope;
}

export function useScope(scope = currentScope ?? rootScope ?? createScope()) {
	currentScope = scope;

	if (!rootScope) {
		rootScope = scope;
	}

	scope.isTracked = false;
	scope.isRendering = true;

	Promise.resolve().then(() => {
		// Force set isRendering when useEffect isn't called
		scope.isRendering = false;
	});

	return {
		scope,
		register(value) {
			// TODO Remove the need to pass value
			register(useState(value)[1], scope);
		},
		update(value) {
			// TODO Remove the need to pass value
			flush(value, scope);
		}
	};
}
