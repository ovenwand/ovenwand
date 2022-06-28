<script lang="ts">
	import type { IEvent } from '$lib/store';
	import { scaleLinear } from 'd3-scale';

	export let events: IEvent[];

	const xTicks = [0, 1, 2, 3, 4, 5, 6];
	const yTicks = [0, 10, 20, 30, 40, 50];
	const padding = { top: 20, right: 15, bottom: 20, left: 25 };

	const labels = {
		0: 'Sunday',
		1: 'Monday',
		2: 'Tuesday',
		3: 'Wednesday',
		4: 'Thursday',
		5: 'Friday',
		6: 'Saturday'
	};

	let width = 300;
	let height = 200;

	$: points = xTicks.map((tick) => {
		const y = events.reduce((y, event) => {
			const day = new Date(event.timestamp).getDay();

			if (day === tick) {
				y++;
			}

			return y;
		}, 0);

		return { x: tick, y };
	});

	$: xScale = scaleLinear()
		.domain([0, xTicks.length])
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain([0, Math.max.apply(null, yTicks)])
		.range([height - padding.bottom, padding.top]);

	$: innerWidth = width - (padding.left + padding.right);
	$: barWidth = innerWidth / xTicks.length;
</script>

Page view by day of the week chart

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	<svg>
		<!-- y axis -->
		<g class="axis y-axis">
			{#each yTicks as tick}
				<g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
					<line x2="100%" />
					<text y="-4">{tick}</text>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g class="axis x-axis">
			{#each points as point, i}
				<g class="tick" transform="translate({xScale(i)},{height})">
					<text x={barWidth / 2} y="-4">{labels[point.x]}</text>
				</g>
			{/each}
		</g>

		<g class="bars">
			{#each points as point, i}
				<rect
					x={xScale(i) + 2}
					y={yScale(point.y)}
					width={barWidth - 4}
					height={yScale(0) - yScale(point.y)}
				/>
			{/each}
		</g>
	</svg>
</div>

<style>
	.chart {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
	}

	svg {
		position: relative;
		width: 100%;
		height: 200px;
	}

	.tick {
		font-family: Helvetica, Arial;
		font-size: 0.725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #e2e2e2;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #ccc;
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.bars rect {
		fill: #a11;
		stroke: none;
		opacity: 0.65;
	}
</style>
