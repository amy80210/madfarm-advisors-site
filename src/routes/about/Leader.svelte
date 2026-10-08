<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import LinkedInIcon from './LinkedInIcon.svelte';

	type Props = {
		/** Portrait, 4:5. Import with `?w=560;320&enhanced`. */
		image: Picture;
		alt: string;
		role: string;
		name: string;
		/** LinkedIn profile URL. */
		linkedin: string;
		/** The biography paragraphs. */
		children: Snippet;
	} & HTMLAttributes<HTMLDivElement>;

	let { image, alt, role, name, linkedin, class: className, children, ...rest }: Props = $props();
</script>

<div class={['leader', className]} {...rest}>
	<div class="photo">
		<enhanced:img
			src={image}
			{alt}
			sizes="(max-width: 600px) 75vw, (max-width: 1100px) 40vw, 300px"
			loading="lazy"
			decoding="async"
		/>
	</div>
	<div class="body">
		<span class="role">{role}</span>
		<h3>{name}</h3>
		{@render children()}
		<a class="li" href={linkedin} target="_blank" rel="noopener"><LinkedInIcon />LinkedIn</a>
	</div>
</div>

<style>
	.leader {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: start;
	}
	.photo {
		position: relative;
	}
	.photo :global(img) {
		inline-size: 100%;
		aspect-ratio: 4/5;
		object-fit: cover;
		border-radius: var(--radius);
		background: var(--sand);
	}
	.role {
		color: var(--accent);
		font-weight: 600;
		font-size: 0.8rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}
	h3 {
		margin-block: 0.5rem 1rem;
		font-size: clamp(1.5rem, 2.6vw, 2rem);
	}
	.body > :global(p + p) {
		margin-block-start: 1rem;
	}
	.li {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-block-start: 1.5rem;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--accent);
	}
	@media (hover: hover) and (pointer: fine) {
		.li:hover {
			color: var(--link-hover);
		}
	}
	.li:active {
		color: var(--link-hover);
	}

	@media (max-width: 900px) {
		.leader {
			grid-template-columns: 1fr;
		}
		.photo {
			max-inline-size: 280px;
		}
	}
</style>
