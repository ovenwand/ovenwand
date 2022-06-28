<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import type { IEvent } from '$lib/store';

	export let events: IEvent[];

	const xTicks = [0, 5, 10, 15, 20, 25, 30];
	const yTicks = [0, 10, 20, 30, 40, 50];
	const padding = { top: 20, right: 15, bottom: 20, left: 25 };

	let width = 300;
	let height = 200;

	$: points = xTicks.map((tick) => {
		const y = events.reduce((count, event) => {
			const day = new Date(event.timestamp).getDate();
			const plottedDay = Math.round(day / 5) * 5;

			if (plottedDay === tick) {
				count++;
			}

			return count;
		}, 0);

		return { x: tick, y };
	});

	$: minX = points[0].x;
	$: maxX = points[points.length - 1].x;

	$: xScale = scaleLinear()
		.domain([minX, maxX])
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain([Math.min.apply(null, yTicks), Math.max.apply(null, yTicks)])
		.range([height - padding.bottom, padding.top]);

	$: path = `M${points.map((p) => `${xScale(p.x)},${yScale(p.y)}`).join('L')}`;
	$: area = `${path}L${xScale(maxX)},${yScale(0)}L${xScale(minX)},${yScale(0)}Z`;
</script>

Page view monthly chart

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	<svg>
		<g class="axis y-axis" transform="translate(0, {padding.top})">
			{#each yTicks as tick}
				<g class="tick tick-{tick}" transform="translate(0, {yScale(tick) - padding.bottom})">
					<line x2="100%" />
					<text y="-4">{tick}</text>
				</g>
			{/each}
		</g>

		<g class="axis x-axis">
			{#each xTicks as tick}
				<g class="tick tick-{tick}" transform="translate({xScale(tick)},{height})">
					<line y1="-{height}" y2="-{padding.bottom}" x1="0" x2="0" />
					<text y="-2">{tick}</text>
				</g>
			{/each}
		</g>

		<path class="path-area" d={area} />
		<path class="path-line" d={path} />
	</svg>
</div>

<style>
	.chart {
		width: 100%;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}

	svg {
		position: relative;
		width: 100%;
		height: 200px;
		overflow: visible;
	}

	.tick {
		font-size: 0.725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #aaa;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #666;
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.path-line {
		fill: none;
		stroke: rgb(0, 100, 100);
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
	}

	.path-area {
		fill: rgba(0, 100, 100, 0.2);
	}
</style>
