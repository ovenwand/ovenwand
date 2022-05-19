export type Blok<T extends {} = {}> = {} & T;

export interface Story<T extends {} = {}> {
	id: number;
	uuid: string;
	name: string;
	created_at: string;
	published_at: string;
	content: Blok<T>;
}
