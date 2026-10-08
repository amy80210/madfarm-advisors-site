<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import LinkedInIcon from './LinkedInIcon.svelte';

	type Props = {
		/** Square portrait. Import with `?w=320;160&enhanced`. */
		image: Picture;
		name: string;
		/** LinkedIn profile URL. The card opens it in a new tab. */
		href: string;
	} & Omit<HTMLAnchorAttributes, 'href' | 'target' | 'rel'>;

	let { image, name, href, class: className, ...rest }: Props = $props();
</script>

<a class={['advisor', className]} {href} target="_blank" rel="noopener" {...rest}>
	<div class="photo">
		<enhanced:img src={image} alt="" sizes="80px" loading="lazy" decoding="async" />
	</div>
	<b>{name}</b>
	<span class="li" aria-hidden="true"><LinkedInIcon /></span>
</a>

<style>
	.advisor {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.55rem;
		background: var(--surface);
		border: 1px solid var(--hairline);
		border-radius: var(--radius);
		padding: 1.1rem 1.15rem;
		transition: border-color var(--dur) var(--ease);
	}
	.photo {
		inline-size: 84px;
		block-size: 84px;
		border-radius: 50%;
		overflow: clip;
		background: var(--sand);
		border: 2px solid var(--sand-2);
	}
	.photo :global(img) {
		inline-size: 100%;
		block-size: 100%;
		object-fit: cover;
	}
	b {
		font-family: var(--serif);
		font-size: 1.15rem;
		color: var(--heading);
		font-weight: 700;
	}
	.li {
		--li-ico-size: 1.35rem;
		margin-block-start: auto;
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--accent);
		display: inline-flex;
		align-items: center;
	}
	@media (prefers-reduced-motion: no-preference) {
		.advisor {
			transition:
				border-color var(--dur) var(--ease),
				transform var(--dur) var(--ease);
		}
	}
	@media (hover: hover) and (pointer: fine) {
		.advisor:hover {
			border-color: var(--accent);
			transform: translateY(-2px);
		}
		.li:hover {
			color: var(--link-hover);
		}
	}
	.advisor:active {
		border-color: var(--accent);
		transform: none;
	}
</style>
