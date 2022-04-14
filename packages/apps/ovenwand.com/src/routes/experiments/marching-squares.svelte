<script lang="ts">
	import type { Noise3D } from '@ovenwand/util.math';
	import { ceil, max, min, makeNoise3D } from '@ovenwand/util.math';
	import { useEngine } from '@ovenwand/util.svelte';

	let debug = false;
	let canvas: HTMLCanvasElement;
	const width = 720;
	const height = 720;
	const resolution = 20;
	const rows = 1 + width / resolution;
	const columns = 1 + height / resolution;
	let grid: number[][];
	let noise: Noise3D;
	let increment: number;
	let t: number;

	const [setup, draw] = useEngine(() => canvas);

	setup(() => {
		grid = [...Array(columns)].map(() => [...Array(rows)]);
		noise = makeNoise3D(Date.now());
		increment = 0.1;
		t = 0;
	});

	draw(
		({
			background,
			fill,
			font,
			line,
			noFill,
			noStroke,
			point,
			rect,
			stroke,
			strokeWeight,
			text
		}) => {
			let xOffset = 0;
			for (let i = 0; i < rows; i++) {
				xOffset += increment;

				let yOffset = 0;
				for (let j = 0; j < columns; j++) {
					grid[i][j] = noise(xOffset, yOffset, t);
					yOffset += increment;
				}
			}

			// t += .005;

			background(50);

			for (let i = 0; i < rows; i++) {
				for (let j = 0; j < columns; j++) {
					const x = i * resolution;
					const y = j * resolution;

					if (debug) {
						noFill();
						stroke(100);
						strokeWeight(1);
						rect(x, y, resolution, resolution);

						strokeWeight(3);
						fill(ceil(grid[i][j]) * 255);
						point(x, y);
					} else {
						const r = grid[max(i - 1, 0)][max(j - 1, 0)] * 255;
						const g = grid[i][j] * 255;
						const b = grid[min(i + 1, rows - 1)][min(j + 1, columns - 1)] * 255;

						strokeWeight(resolution * 2);
						fill(r, g, b);
						point(x, y);
					}
				}
			}

			for (let i = 0; i < rows - 1; i++) {
				for (let j = 0; j < columns - 1; j++) {
					const x = i * resolution;
					const y = j * resolution;

					const fa = grid[i][j];
					const fb = grid[i + 1][j];
					const fc = grid[i + 1][j + 1];
					const fd = grid[i][j + 1];

					noStroke();

					const ax = x + resolution * 0.5;
					const ay = y;

					const bx = x + resolution;
					const by = y + resolution * 0.5;

					const dx = x + resolution * 0.5;
					const dy = y + resolution;

					const cx = x;
					const cy = y + resolution * 0.5;

					const state = ceil(fa) * 8 + ceil(fb) * 4 + ceil(fc) * 2 + ceil(fd) * 1;

					if (debug) {
						fill(255);
						noStroke();
						font(`${resolution / 3}px mono`);
						text(x + resolution / 2, y + resolution / 2, state, resolution);
					}

					stroke(255);
					strokeWeight(2);

					switch (state) {
						case 0:
						case 15:
							break;
						case 1:
						case 14:
							line(cx, cy, dx, dy);
							break;
						case 2:
						case 13:
							line(bx, by, dx, dy);
							break;
						case 3:
						case 12:
							line(bx, by, cx, cy);
							break;
						case 4:
						case 11:
							line(ax, ay, bx, by);
							break;
						case 5:
							line(ax, ay, cx, cy);
							line(bx, by, dx, dy);
							break;
						case 6:
						case 9:
							line(ax, ay, dx, dy);
							break;
						case 7:
						case 8:
							line(ax, ay, cx, cy);
							break;
						case 10:
							line(ax, ay, bx, by);
							line(cx, cy, dx, dy);
							break;
					}
				}
			}
		}
	);
</script>

<select bind:value={debug}>
	<option value={true}>Enable</option>
	<option value={false}>Disable</option>
</select>

<canvas {width} {height} bind:this={canvas} />
