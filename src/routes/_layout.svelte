<script>
	import { Footer, Header } from '@/components';
	import { App, Container } from '@/core/components';
	import { fluid } from '@/store/header';

	export let segment;
</script>

<style lang="scss">
	@import "../core/components/layout/mixins.scss";
	@import "../core/theme/index.scss";

	:global(#header-container) {
		position: relative;
		pointer-events: none;
	}

	:global(#content-container) {
        position: relative;
	}

    :global(#footer-container) {
		bottom: 0;
		left: 0;
		position: absolute;
		right: 0;
		pointer-events: none;
	}

	:global(#footer-container),
	:global(#header-container) {
		z-index: 1;
	}

	:global(main) {
		margin-bottom: 8rem;
		margin-top: 9.2rem;
		position: relative;

		@include screen-gt-sm {
			margin-bottom: 12rem;
			margin-top: 14rem;
		}
	}

	:global(.page-portfolio) {
        :global(main) {
            position: static;
		}

		:global(#page) {
			bottom: 0;
			left: 0;
			margin-bottom: 0;
			margin-top: 0;
			position: absolute;
			right: 0;
			top: 0;
			width: auto;
			z-index: 0;
		}

		:global(#content-container) {
			height: 100%;
		}
	}
</style>

<App {segment}>
	<Container id="header-container" fluid={$fluid}>
		<Header {segment}/>
	</Container>

	<main>
		<slot/>
	</main>

	<Container id="footer-container">
		<Footer/>
	</Container>
</App>
