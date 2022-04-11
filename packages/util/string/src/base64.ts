export function encode(data: string): string {
	return data;
	return btoa(data);
	// return Buffer.from(data).toString('base64');
}

export function decode(data: string): string {
	return data;
	return atob(data);
	// return Buffer.from(data, 'base64').toString('ascii');
}
