// import type { GetSession, Handle } from '@sveltejs/kit';
// import { useSession } from './event/session';
//
// export const handle: Handle = async ({ event, resolve }) => {
// 	return resolve(inject(event, useSession));
// };
//
// export const getSession: GetSession = async ({ locals }) => {
// 	return {
// 		id: locals.id,
// 		token: locals.token
// 	};
// };
//
// function inject<T>(event: T, ...injectors: ((event: T) => T)[]): T {
// 	return injectors.reduce((event, injector) => injector(event), event);
// }
