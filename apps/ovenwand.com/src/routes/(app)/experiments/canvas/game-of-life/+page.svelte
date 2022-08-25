<script lang="ts">
	import { useEngine } from '@ovenwand/util';
	import { floor } from '@ovenwand/util.math';

	type Dead = 0;
	type Alive = 1;
	type Grid = (Dead | Alive)[][];
	type Seed = [number, number][];

	export let data: { seed: [number, number][] };

	const width = 640;
	const height = 640;
	const columns = 80;
	const rows = 80;

	let canvas: HTMLCanvasElement;
	let grid: Grid;
	let framerate: number;
	let throttle: number;
	let isPlaying: boolean;

	const columnSize = width / columns;
	const rowSize = height / rows;

	const { setup, update, draw, stop, resume } = useEngine(() => canvas);

	function findNeighbors(grid: Grid, x: number, y: number): number {
		const xn = x - 1 < 0 ? rows - 1 : x - 1;
		const xp = x + 1 > rows - 1 ? 0 : x + 1;
		const yn = y - 1 < 0 ? columns - 1 : y - 1;
		const yp = y + 1 > columns - 1 ? 0 : y + 1;

		return (
			// Top row
			grid[xn][yn] +
			grid[xn][y] +
			grid[xn][yp] +
			// Center row
			grid[x][yn] +
			grid[x][yp] +
			// Bottom row
			grid[xp][yn] +
			grid[xp][y] +
			grid[xp][yp]
		);
	}

	function useSeed(grid: Grid, seed: Seed) {
		const xSize = 65;
		const ySize = 65;
		const xBase = floor(columns / 2 - xSize / 2);
		const yBase = floor(rows / 2 - ySize / 2);

		for (const [x, y] of seed) {
			grid[yBase + y][xBase + x] = 1;
		}
	}

	function togglePlay() {
		if (isPlaying) {
			stop();
		} else {
			resume();
		}

		isPlaying = !isPlaying;
	}

	function createGrid(columns: number, rows: number): Grid {
		return [...Array(rows)].map(() => [...Array(columns)].map(() => 0));
	}

	function copyGrid(grid: Grid): Grid {
		return grid.map((row) => row.slice());
	}

	setup(({ onClick }) => {
		framerate = 30;
		throttle = 0;
		isPlaying = true;
		grid = createGrid(columns, rows);

		onClick((x, y) => {
			const column = floor(x / columnSize);
			const row = floor(y / rowSize);
			grid[row][column] = grid[row][column] ? 0 : 1;
		});

		useSeed(grid, data.seed);
	});

	update(() => {
		const nextGrid = copyGrid(grid);

		for (let x = 0; x < grid.length; x++) {
			for (let y = 0; y < grid[x].length; y++) {
				const isAlive = grid[x][y];
				const neighbors = findNeighbors(grid, x, y);

				if (isAlive && (neighbors < 2 || neighbors > 3)) {
					nextGrid[x][y] = 0;
				}
				if (!isAlive && neighbors === 3) {
					nextGrid[x][y] = 1;
				}
			}
		}

		// Sad.. We'll never see the first frame.
		grid = nextGrid;
	});

	draw(({ background, fill, rect, restore, save }) => {
		if (throttle > 1) {
			throttle--;
			return;
		}

		throttle = 60 / framerate;

		background(0);

		for (let x = 0; x < grid.length; x++) {
			for (let y = 0; y < grid[x].length; y++) {
				if (!grid[x][y]) {
					continue;
				}

				save();
				fill(255);
				rect(y * rowSize, x * columnSize, columnSize, rowSize);
				restore();
			}
		}
	});
</script>

<button on:click={togglePlay}>{isPlaying ? 'Pause' : 'Resume'}</button>

<select bind:value={framerate}>
	<option value={10}>10</option>
	<option value={24}>24</option>
	<option value={30}>30</option>
	<option value={60}>60</option>
	<option value={90}>90</option>
	<option value={120}>120</option>
</select>

<canvas {width} {height} bind:this={canvas} />
