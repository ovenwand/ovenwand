export interface ObjectSave<S> {
	type: string;
	state: S;
}

export interface Save<S = unknown> {
	timestamp: number;
	chi: {
		bank: number;
		total: number;
	};
	objects: ObjectSave<S>[];
}
