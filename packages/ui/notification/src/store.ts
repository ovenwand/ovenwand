import type { Readable } from 'svelte/store';
import { writable } from 'svelte/store';
import { uuid } from '@ovenwand/util.string';

function timeout(timeout: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
}

const { subscribe, update } = writable<Notification[]>([]);

function addNotification(notification: Omit<Notification, 'id'>): string {
	const id = uuid();

	update(($notifications) => {
		$notifications.push({ ...notification, id });
		return [...$notifications];
	});

	return id;
}

function removeNotification({ id }: Identifiable): void {
	update(($notifications) => $notifications.filter((n) => n.id !== id));
}

function updateNotification(id: string, notification: Notification): void {
	update(($notifications) => {
		const n = $notifications.find((n) => n.id === id);

		if (n) {
			Object.assign(n, notification);
			return [...$notifications];
		}

		return [...$notifications, notification as Notification];
	});
}

function notify(notification: Omit<Notification, 'id'>, delay?: number): Notifier {
	const id = addNotification(notification);

	if (delay) {
		timeout(delay).then(() => removeNotification({ id }));
	}

	return createUpdater(id);
}

function createNotifier(type: NotificationType): Notifier {
	return ({ message }: Omit<Notification, 'type'>, delay?: number) =>
		notify(
			{
				type,
				message
			},
			delay
		);
}

function createUpdater(id: string): Notifier {
	return (notification: Notification, delay) => {
		updateNotification(id, notification);

		if (delay) {
			timeout(delay).then(() => removeNotification({ id }));
		}

		return createUpdater(id);
	};
}

export type Identifiable = { id: string };
export type Typed = { type: NotificationType };
export type Notifier = (notification: Partial<Notification>, delay?: number) => Notifier;
export type NotificationType = 'info' | 'success' | 'warn' | 'error' | 'loading';

type Notification = { message: string } & Typed & Identifiable;

export type NotificationState = { notifications: Readable<Notification[]> };
export type NotificationActions = { close: typeof removeNotification } & Record<
	NotificationType,
	Notifier
>;
export type NotificationStore = NotificationState & NotificationActions;

export function useNotifications(): NotificationStore {
	return {
		notifications: { subscribe },
		close: removeNotification,
		loading: createNotifier('loading'),
		info: createNotifier('info'),
		success: createNotifier('success'),
		warn: createNotifier('warn'),
		error: createNotifier('error')
	};
}
