<script lang="ts">
	import { useEngine } from '@ovenwand/util';
	import { ceil, max, min, makeNoise3D, type Noise3D } from '@ovenwand/util.math';

	let debug = false;
	let canvas: HTMLCanvasElement;
	const width = 720;
	const height = 720;
	let resolution = 30;
	$: rows = 1 + width / resolution;
	$: columns = 1 + height / resolution;
	$: grid = [...Array(columns)].map(() => [...Array(rows)]);
	let noise: Noise3D;
	let increment: number;
	let t: number;

	const { setup, update, draw } = useEngine(() => canvas);

	setup(() => {
		noise = makeNoise3D(Date.now());
		increment = 0.08;
		t = 0;
	});

	update(() => {
		let xOffset = 0;
		for (let i = 0; i < rows; i++) {
			xOffset += increment;

			let yOffset = 0;
			for (let j = 0; j < columns; j++) {
				grid[i][j] = noise(xOffset, yOffset, t);
				yOffset += increment;
			}
		}

		t += 0.005;
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
			background(50);

			for (let i = 0; i < columns; i++) {
				for (let j = 0; j < rows; j++) {
					const x = i * resolution;
					const y = j * resolution;

					if (debug) {
						noFill();
						stroke(100);
						strokeWeight(1);
						rect(x, y, resolution, resolution);

						strokeWeight(3);
						fill(ceil(grid[i][j]) * 255, 0, 0);
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

			for (let i = 0; i < columns - 1; i++) {
				for (let j = 0; j < rows - 1; j++) {
					const x = i * resolution;
					const y = j * resolution;

					const fa = grid[i][j];
					const fb = grid[i + 1][j];
					const fc = grid[i + 1][j + 1];
					const fd = grid[i][j + 1];

					const ax = x + resolution * 0.5;
					const ay = y;

					const bx = x + resolution;
					const by = y + resolution * 0.5;

					const cx = x;
					const cy = y + resolution * 0.5;

					const dx = x + resolution * 0.5;
					const dy = y + resolution;

					const state = ceil(fa) * 8 + ceil(fb) * 4 + ceil(fc) * 2 + ceil(fd) * 1;

					noStroke();

					if (debug) {
						fill(255);
						font(`${resolution / 3}px mono`);
						text(x + resolution / 2, y + 5, fa.toFixed(2), resolution);
						text(x + resolution / 2, y + resolution / 2, state.toString(), resolution);
					}

					stroke(255);
					strokeWeight(2);

					// TODO Add linear interpolation

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

<input type="number" bind:value={resolution} />

<select bind:value={debug}>
	<option value={true}>Enable</option>
	<option value={false}>Disable</option>
</select>

<canvas {width} {height} bind:this={canvas} />
