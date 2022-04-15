<script lang="ts">
	import { cos, PI, sin } from '@ovenwand/util.math';
	import { useEngine } from '@ovenwand/util.svelte';

	const { setup, update, draw } = useEngine(() => canvas);

	let canvas: HTMLCanvasElement;
	const width = 640;
	const height = 420;

	const gravity = 1;
	let acceleration: number;
	let velocity: number;

	let length: number;
	let angle: number;

	setup(() => {
		acceleration = 0;
		velocity = 0;
		length = height * 0.75;
		angle = PI / 4;
	});

	update(() => {
		const force = gravity * sin(angle);
		acceleration = (-1 * force) / length;
		velocity += acceleration;
		angle += velocity;
	});

	draw(({ background, circle, fill, line, stroke, strokeWeight, translate }) => {
		const x = length * sin(angle);
		const y = length * cos(angle);

		background('black');

		translate(width / 2, 0);

		stroke('red');
		strokeWeight(5);
		line(0, 0, x, y);

		fill('red');
		circle(x, y, 25);
	});
</script>

<canvas {width} {height} bind:this={canvas} />
