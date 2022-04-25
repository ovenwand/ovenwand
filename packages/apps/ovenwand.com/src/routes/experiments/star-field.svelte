<script lang="ts">
	import { map, random } from '@ovenwand/util.math';
	import { useEngine } from '@ovenwand/util.svelte';
	import { noop } from '@ovenwand/util.fp';

	const { setup, update, draw } = useEngine(() => canvas);

	let canvas: HTMLCanvasElement;
	const width = 640;
	const height = 420;
	const stars = [];

	setup(noop);

	update(() => {
		for (let i = 0; i < 3; i++) {
			stars.push({
				x: random() * width * 2 - width,
				y: random() * height * 2 - height,
				z: width
			});
		}
	});

	draw(({ background, circle, fill, translate, mouseX, mouseY }) => {
		background(0);
		translate(mouseX || width / 2, mouseY || height / 2);

		for (const star of stars) {
			const x = map(star.x / star.z, 0, 1, 0, width);
			const y = map(star.y / star.z, 0, 1, 0, height);
			const r = map(star.z, 0, width, 4, 0);

			fill('white');
			circle(x, y, r);
		}

		for (const star of stars) {
			star.z -= 10;

			if (star.z < 0) {
				stars.splice(stars.indexOf(star), 1);
			}
		}
	});
</script>

<canvas {width} {height} bind:this={canvas} />
