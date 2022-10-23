import { Direction, Side } from './constants';

export function debug(...args: unknown[]) {
	if (import.meta.env.PROD) {
		return;
	}

	return console.log(`DEBUG (${Date.now()}):`, ...args);
}

export const faceToLineOffsetMap = {
	[Side.North]: { x: 0, y: 0 },
	[Side.East]: { x: 1, y: 0 },
	[Side.South]: { x: 0, y: 1 },
	[Side.West]: { x: 0, y: 0 }
};

export const faceToDirectionMap = {
	[Side.North]: Direction.Right,
	[Side.East]: Direction.Down,
	[Side.South]: Direction.Right,
	[Side.West]: Direction.Down
};

export const faceToAdjacentFaceMap = {
	[Side.North]: Side.South,
	[Side.East]: Side.West,
	[Side.South]: Side.North,
	[Side.West]: Side.East
};
