import { createStore } from '@ovenwand/util';
import { copyEvent, createEvent, type IEvent } from './state';

const { mutations } = createStore((a, b) => a._id === b._id, createEvent, copyEvent);

export function addEvent(event: Partial<IEvent>) {
	return mutations.add(event);
}

export function updateEvent(event: Partial<IEvent>) {
	return mutations.update(event);
}

export function addOrUpdateEvent(event: Partial<IEvent>) {
	return mutations.addOrUpdate(event);
}
