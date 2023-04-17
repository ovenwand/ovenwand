<script lang="ts">
	import { useEngine } from '@ovenwand/util';
	import { floor, max, min } from '@ovenwand/util.math';
	import { Direction, Side } from './lib/constants';
	import {
		debug,
		faceToAdjacentFaceMap,
		faceToDirectionMap,
		faceToLineOffsetMap
	} from './lib/utils';

	const width = 480;
	const height = 480;

	let canvas;
	let points, squares, lines;
	let gridSize, offset;
	let cellSize, offsetSize;
	let pointWeight, lineWeight;
	let currentPlayer = false;

	function minmax(value, minimumValue, maximumValue) {
		return max(minimumValue, min(maximumValue, value));
	}

	function isInPlayfield(x, y) {
		const margin = offsetSize / 2;

		const bounds = {
			top: margin - pointWeight,
			right: width - margin + pointWeight,
			bottom: width - margin + pointWeight,
			left: margin - pointWeight
		};

		return x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom;
	}

	function findAdjacentSquares(square) {
		const squareIndex = squares.findIndex((s) => s === square);

		const column = squareIndex % gridSize;
		const row = floor(squareIndex / gridSize);

		const adjacentSquares = {
			[Side.North]: null,
			[Side.East]: null,
			[Side.South]: null,
			[Side.West]: null
		};

		if (row > 0) {
			adjacentSquares[Side.North] = squares[squareIndex - gridSize];
		}

		if (row < gridSize - 1) {
			adjacentSquares[Side.South] = squares[squareIndex + gridSize];
		}

		if (column > 0) {
			adjacentSquares[Side.West] = squares[squareIndex - 1];
		}

		if (column < gridSize - 1) {
			adjacentSquares[Side.East] = squares[squareIndex + 1];
		}

		return adjacentSquares;
	}

	const { setup, draw } = useEngine(() => canvas);

	setup(({ onClick, onMouseMove, onKeyDown }) => {
		pointWeight = 8;
		lineWeight = 4;

		gridSize = 6;
		offset = 0.5;

		offsetSize = width / (gridSize + offset * 2);
		cellSize = (width - offsetSize) / gridSize;

		points = [];
		squares = [];
		lines = [];

		for (let y = 0; y < gridSize + 1; y++) {
			for (let x = 0; x < gridSize + 1; x++) {
				points.push({ x, y });
			}
		}

		for (let y = 0; y < gridSize; y++) {
			for (let x = 0; x < gridSize; x++) {
				const boundsTop = (y + offset) * cellSize;
				const boundsLeft = (x + offset) * cellSize;

				const position = {
					x,
					y
				};

				const bounds = {
					top: boundsTop,
					right: boundsLeft + cellSize,
					bottom: boundsTop + cellSize,
					left: boundsLeft
				};

				squares.push({
					position,
					bounds,
					borders: [],
					player: null,
					selected: null
				});
			}
		}

		onMouseMove((mouseX, mouseY) => {
			if (!isInPlayfield(mouseX, mouseY)) {
				for (const square of squares) {
					square.selected = false;
				}

				return;
			}

			for (const square of squares) {
				const { bounds, position } = square;

				const x = minmax(floor(mouseX / cellSize - offset), 0, gridSize - 1);
				const y = minmax(floor(mouseY / cellSize - offset), 0, gridSize - 1);

				const isInBounds = position.x === x && position.y === y;

				square.selected = false;

				if (isInBounds) {
					const deltaX = mouseX - bounds.left;
					const deltaY = mouseY - bounds.top;
					const threshold = pointWeight;

					let side;

					if (deltaX < threshold) {
						side = Side.West;
					} else if (deltaX > cellSize - threshold) {
						side = Side.East;
					} else if (deltaY < threshold) {
						side = Side.North;
					} else if (deltaY > cellSize - threshold) {
						side = Side.South;
					}

					const isLineDrawn = square.borders.includes(side);

					if (side && !isLineDrawn) {
						square.selected = side;
					}
				}
			}
		});

		onClick((mouseX, mouseY) => {
			if (!isInPlayfield(mouseX, mouseY)) {
				return;
			}

			const selectedSquareIndex = squares.findIndex(
				(square) => typeof square.selected === 'string'
			);

			if (selectedSquareIndex < 0) {
				return;
			}

			const square = squares[selectedSquareIndex];
			const { borders, selected, position } = square;

			debug(
				`Player ${
					currentPlayer + 1
				} attempting to draw a line on the ${selected} side of the square at (${position.x},${
					position.y
				}).`
			);

			const adjacentSquares = findAdjacentSquares(square);
			const adjacent = adjacentSquares[selected];
			const adjacentBorder = faceToAdjacentFaceMap[selected];

			const squareIsFinished = borders.push(selected) >= 4;
			const adjacentIsFinished = adjacent?.borders.push(adjacentBorder) >= 4;

			lines.push({
				position: {
					x: position.x + faceToLineOffsetMap[selected].x,
					y: position.y + faceToLineOffsetMap[selected].y
				},
				direction: faceToDirectionMap[selected]
			});

			if (squareIsFinished) {
				square.player = currentPlayer;
			}

			if (adjacentIsFinished) {
				adjacent.player = currentPlayer;
			}

			if (!squareIsFinished && !adjacentIsFinished) {
				currentPlayer = !currentPlayer;
			}
		});

		onKeyDown((key) => {
			console.log(key);
		});
	});

	draw(({ background, fill, line, point, rect, restore, save, stroke, strokeWeight }) => {
		background(0);

		save();
		stroke(255);
		rect(0, 0, width, height);
		restore();

		for (const { x, y } of points) {
			save();
			strokeWeight(pointWeight);
			fill(255);
			point((x + offset) * cellSize, (y + offset) * cellSize);
			restore();
		}

		for (const { borders, bounds, selected, player } of squares) {
			if (borders.length >= 4) {
				save();
				fill(player ? `rgba(0, 255, 0, .333)` : 'rgba(255, 0, 0, .333)');
				rect(bounds.left, bounds.top, cellSize, cellSize);
				restore();
			}

			if (selected) {
				let lineStartX, lineStartY, lineEndX, lineEndY;

				switch (selected) {
					case Side.North: {
						lineStartX = bounds.left;
						lineStartY = bounds.top;
						lineEndX = bounds.right;
						lineEndY = bounds.top;
						break;
					}
					case Side.East: {
						lineStartX = bounds.right;
						lineStartY = bounds.top;
						lineEndX = bounds.right;
						lineEndY = bounds.bottom;
						break;
					}
					case Side.South: {
						lineStartX = bounds.left;
						lineStartY = bounds.bottom;
						lineEndX = bounds.right;
						lineEndY = bounds.bottom;
						break;
					}
					case Side.West: {
						lineStartX = bounds.left;
						lineStartY = bounds.top;
						lineEndX = bounds.left;
						lineEndY = bounds.bottom;
						break;
					}
				}

				// Highlight square
				// save();
				// fill(255, .2);
				// rect(bounds.left, bounds.top, cellSize, cellSize);
				// restore();

				save();
				strokeWeight(lineWeight);
				stroke(255, 0.6);
				line(lineStartX, lineStartY, lineEndX, lineEndY);
				restore();
			}
		}

		for (const { position, direction } of lines) {
			const startX = (position.x + offset) * cellSize;
			const startY = (position.y + offset) * cellSize;

			const endX = direction === Direction.Right ? startX + cellSize : startX;

			const endY = direction === Direction.Right ? startY : startY + cellSize;

			save();
			strokeWeight(lineWeight);
			stroke(255);
			line(startX, startY, endX, endY);
			restore();
		}
	});
</script>

<canvas {width} {height} bind:this={canvas} />
