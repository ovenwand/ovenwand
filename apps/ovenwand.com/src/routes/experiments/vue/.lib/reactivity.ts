import { isProxy, isRef, ref as _ref, toRaw, unref, watch } from 'vue';

export const snapshot = <Type>(value: Type, onChange?: (value: Type) => unknown) => {
	if (onChange && (isRef(value) || isProxy(value))) {
		watch(value as object, (value) => onChange(value as Type));
	}

	if (isRef(value)) {
		return unref(value);
	} else if (isProxy(value)) {
		return toRaw(value);
	}

	return value;
};

export const ref = <Type>(value: Type, onChange?: (value: Type) => unknown) => {
	const state = _ref(value);

	if (onChange) {
		watch(state, (value) => onChange(value as Type));
	}

	return state;
};
