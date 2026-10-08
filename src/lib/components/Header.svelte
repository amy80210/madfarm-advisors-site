<script lang="ts">
	import { page } from '$app/state';
	import logo from '#lib/assets/logos/madfarm-stack-dark.png?enhanced';
	import { headerNav, SCHEDULE_URL } from '#lib/site.ts';
	import Button from './Button.svelte';
</script>

<header class="site-header">
	<div class="wrap nav">
		<a class="brand" href="/" aria-label="Madfarm Advisors home">
			<enhanced:img src={logo} alt="Madfarm Advisors" />
		</a>
		<!-- The button comes before the menu, so Tab moves from it into the open menu. -->
		<button class="mobile-toggle" type="button" popovertarget="site-nav" aria-label="Menu">
			<span></span><span></span><span></span>
		</button>
		<nav class="nav-links" id="site-nav" popover aria-label="Primary">
			{#each headerNav as link (link.path)}
				<a href={link.path} aria-current={page.url.pathname === link.path ? 'page' : undefined}>
					{link.label}
				</a>
			{/each}
			<span class="cta">
				<Button variant="copper" size="sm" href={SCHEDULE_URL} external arrow="right">
					Schedule a Call
				</Button>
			</span>
		</nav>
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		inset-block-start: 0;
		z-index: 100;
		background: color-mix(in srgb, var(--chalk) 85%, transparent);
		backdrop-filter: saturate(140%) blur(10px);
		border-block-end: 1px solid transparent;
	}

	/* Solid header once the page has scrolled 16px. No script: the scroll position drives it. */
	@keyframes header-scrolled {
		to {
			background: var(--chalk);
			border-block-end-color: var(--sand);
			box-shadow: 0 1px 20px rgba(28, 32, 36, 0.05);
		}
	}
	@supports (animation-timeline: scroll()) {
		.site-header {
			animation: header-scrolled linear both;
			animation-timeline: scroll(root block);
			animation-range: 0 16px;
		}
	}

	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		block-size: var(--header-h);
	}
	.brand :global(img) {
		block-size: 46px;
		inline-size: auto;
	}

	/* The menu is one <nav popover>. From 721px it shows inline and the popover
	   defaults are reset. Below that it is a real popover: Escape closes it and
	   focus returns to the button, both native. */
	.nav-links {
		position: static;
		display: flex;
		align-items: center;
		gap: 1.6rem;
		inline-size: auto;
		block-size: auto;
		margin: 0;
		padding: 0;
		border: 0;
		background: none;
		color: inherit;
		overflow: visible;
	}
	.nav-links > a {
		font-size: 0.88rem;
		font-weight: 500;
		color: var(--text-soft);
		letter-spacing: 0.01em;
		position: relative;
		padding-block: 0.25rem;
		transition: color var(--dur) var(--ease);
	}
	.nav-links > a::after {
		content: '';
		position: absolute;
		inset-inline-start: 0;
		inset-block-end: -2px;
		inline-size: 0;
		block-size: 1.5px;
		background: var(--accent);
	}
	.nav-links > a:active {
		color: var(--accent);
	}
	.cta {
		margin-inline-start: 0.5rem;
	}

	@media (hover: hover) and (pointer: fine) {
		.nav-links > a:hover {
			color: var(--text);
		}
		.nav-links > a:hover::after {
			inline-size: 100%;
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		.nav-links > a::after {
			transition: inline-size var(--dur) var(--ease);
		}
	}

	.mobile-toggle {
		display: none;
		background: none;
		border: 0;
		inline-size: 40px;
		block-size: 40px;
		position: relative;
	}
	/* 44px hit area around the 40px button */
	.mobile-toggle::after {
		content: '';
		position: absolute;
		inset: -2px;
	}
	.mobile-toggle span {
		position: absolute;
		inset-inline: 8px;
		block-size: 2px;
		background: var(--steel);
	}
	.mobile-toggle span:nth-child(1) {
		inset-block-start: 14px;
	}
	.mobile-toggle span:nth-child(2) {
		inset-block-start: 20px;
	}
	.mobile-toggle span:nth-child(3) {
		inset-block-start: 26px;
	}
	.mobile-toggle:active {
		scale: 0.95;
	}
	.site-header:has(.nav-links:popover-open) .mobile-toggle span:nth-child(1) {
		inset-block-start: 20px;
		rotate: 45deg;
	}
	.site-header:has(.nav-links:popover-open) .mobile-toggle span:nth-child(2) {
		opacity: 0;
	}
	.site-header:has(.nav-links:popover-open) .mobile-toggle span:nth-child(3) {
		inset-block-start: 20px;
		rotate: -45deg;
	}
	@media (prefers-reduced-motion: no-preference) {
		.mobile-toggle span {
			transition:
				inset-block-start 0.3s var(--ease),
				rotate 0.3s var(--ease),
				opacity 0.3s var(--ease);
		}
	}

	@media (max-width: 720px) {
		.mobile-toggle {
			display: block;
		}
		.nav-links {
			display: none;
			position: fixed;
			inset: var(--header-h) 0 auto 0;
			inline-size: 100%;
			max-inline-size: none;
			max-block-size: calc(100dvh - var(--header-h));
			flex-direction: column;
			align-items: flex-start;
			gap: 0;
			padding: 1rem var(--gutter) 2rem;
			background: var(--chalk);
			border-block-end: 1px solid var(--sand);
			overflow-y: auto;
			overscroll-behavior: contain;
		}
		.nav-links:popover-open {
			display: flex;
		}
		.nav-links > a {
			inline-size: 100%;
			padding-block: 1rem;
			border-block-end: 1px solid var(--sand);
		}
		.nav-links > a::after {
			display: none;
		}
		.cta {
			--btn-inline-size: 100%;
			--btn-justify: center;
			inline-size: 100%;
			margin: 1rem 0 0;
		}

		/* The page behind the open menu: no scroll, and out of reach for
		   keyboard and screen readers. This replaces the `inert` script. */
		:global(html:has(#site-nav:popover-open)) {
			overflow: hidden;
		}
		:global(body:has(#site-nav:popover-open) :is(main, footer)) {
			visibility: hidden;
		}
	}

	/* The menu unrolls from under the header. It closes at once where the
	   exit transition is not supported. */
	@media (max-width: 720px) and (prefers-reduced-motion: no-preference) {
		.nav-links {
			clip-path: inset(0 0 100%);
			transition:
				clip-path 0.3s var(--ease),
				display 0.3s allow-discrete,
				overlay 0.3s allow-discrete;
		}
		.nav-links:popover-open {
			clip-path: inset(0 0 0);
		}
		@starting-style {
			.nav-links:popover-open {
				clip-path: inset(0 0 100%);
			}
		}
	}
</style>
