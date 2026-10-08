<script lang="ts">
	import professional from '#lib/assets/treated/professional.jpg?w=900;640;360&enhanced';
	import Backdrop from '#lib/components/Backdrop.svelte';
	import Button from '#lib/components/Button.svelte';
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { SCHEDULE_URL } from '#lib/site.ts';
	import BeforeCard from './BeforeCard.svelte';
	import Field from './Field.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	type Subject = { value: string; label: string };

	const subjects: Subject[] = [
		{ value: 'sell-side', label: 'Selling my business' },
		{ value: 'valuation', label: 'Complimentary pre-engagement (discovery + valuation)' },
		{ value: 'not-ready', label: 'Not ready yet; planning ahead' },
		{ value: 'referral', label: 'Referring a client' },
		{ value: 'general', label: 'General inquiry' }
	];

	const STATUS_ID = 'form-status';

	// A failed submission comes back with what the visitor typed and the fields to fix.
	const values = $derived(form?.values);
	const invalid = $derived<string[]>(form?.invalid ?? []);
	const error = $derived(form?.message);
	const sent = $derived(form?.success === true);
</script>

<PageHero compact>
	<Eyebrow>Contact</Eyebrow>
	<h1>Talk to a senior banker.</h1>
</PageHero>

<section class="section">
	<div class="wrap">
		<div class="contact-layout">
			<!-- Book a call -->
			<div class="contact-call on-dark reveal">
				<Backdrop
					image={professional}
					sizes="(max-width: 600px) 100vw, (max-width: 1100px) 95vw, 967px"
					opacity={0.26}
				/>
				<span class="call-icon">
					<Icon>
						<svg
							viewBox="0 0 32 32"
							fill="none"
							stroke="currentColor"
							stroke-width="1.7"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
							><rect x="5" y="7" width="22" height="20" rx="2" /><path
								d="M5 13h22M11 4.5v5M21 4.5v5"
							/><path d="m12.5 19.5 2.8 2.8 5.2-5.2" /></svg
						>
					</Icon>
				</span>
				<h2>Book a time with the principal.</h2>
				<Button variant="copper" href={SCHEDULE_URL} external arrow="right">Schedule a Call</Button>
			</div>

			<!-- Send a note -->
			<div class="contact-note reveal">
				<h2>Send a note</h2>
				<form id="contact-form" method="POST" action="/contact#contact-form">
					<div class="trap" aria-hidden="true">
						<label for="website">Leave this field empty</label>
						<input type="text" id="website" name="website" tabindex="-1" autocomplete="off" />
					</div>
					<div class="form-grid">
						<Field name="name" label="Name" invalid={invalid.includes('name')} errorId={STATUS_ID}>
							{#snippet control(attributes)}
								<input
									{...attributes}
									type="text"
									autocomplete="name"
									maxlength={data.limits.name}
									required
									value={values?.name}
								/>
							{/snippet}
						</Field>
						<Field
							name="email"
							label="Email"
							invalid={invalid.includes('email')}
							errorId={STATUS_ID}
						>
							{#snippet control(attributes)}
								<input
									{...attributes}
									type="email"
									autocomplete="email"
									maxlength={data.limits.email}
									required
									value={values?.email}
								/>
							{/snippet}
						</Field>
						<Field
							name="phone"
							label="Phone"
							optional
							invalid={invalid.includes('phone')}
							errorId={STATUS_ID}
						>
							{#snippet control(attributes)}
								<input
									{...attributes}
									type="tel"
									autocomplete="tel"
									maxlength={data.limits.phone}
									value={values?.phone}
								/>
							{/snippet}
						</Field>
						<Field
							name="company"
							label="Company"
							optional
							invalid={invalid.includes('company')}
							errorId={STATUS_ID}
						>
							{#snippet control(attributes)}
								<input
									{...attributes}
									type="text"
									autocomplete="organization"
									maxlength={data.limits.company}
									value={values?.company}
								/>
							{/snippet}
						</Field>
						<Field name="subject" label="What can we help with?" full>
							{#snippet control(attributes)}
								<select {...attributes}>
									{#each subjects as subject (subject.value)}
										<option value={subject.value} selected={subject.value === values?.subject}>
											{subject.label}
										</option>
									{/each}
								</select>
							{/snippet}
						</Field>
						<Field
							name="message"
							label="Message"
							full
							invalid={invalid.includes('message')}
							errorId={STATUS_ID}
						>
							{#snippet control(attributes)}
								<textarea
									{...attributes}
									maxlength={data.limits.message}
									placeholder="A few sentences about your business and what you&rsquo;re thinking about."
									required
									value={values?.message}></textarea>
							{/snippet}
						</Field>
						<div class="submit">
							<Button type="submit" arrow="right">Send Message</Button>
							<p
								id={STATUS_ID}
								class={['form-status', error && 'error', sent && 'ok']}
								role={error ? 'alert' : 'status'}
							>
								{#if error}{error}{:else if sent}{data.successMessage}{/if}
							</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>

<!-- BEFORE YOU CALL -->
<section class="section--tight bg-chalk-2">
	<div class="wrap">
		<span class="before-label">
			<Eyebrow class="reveal">Before You Call</Eyebrow>
		</span>
		<div class="before-grid reveal">
			<BeforeCard href="/process" kicker="The Process" title="How a Madfarm process actually runs">
				<svg
					viewBox="0 0 32 32"
					fill="none"
					stroke="currentColor"
					stroke-width="1.7"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
					><path d="M16 5 4 11l12 6 12-6-12-6Z" /><path d="m4 16 12 6 12-6" /><path
						d="m4 21 12 6 12-6"
					/></svg
				>
			</BeforeCard>
			<BeforeCard href="/case-studies" kicker="Case Studies" title="Closed deals, in detail">
				<svg
					viewBox="0 0 32 32"
					fill="none"
					stroke="currentColor"
					stroke-width="1.7"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
					><path
						d="M9 4.5h10l6 6V27a1.5 1.5 0 0 1-1.5 1.5h-14A1.5 1.5 0 0 1 8 27V6a1.5 1.5 0 0 1 1-1.5Z"
					/><path d="M19 4.5v6h6" /><path d="M12 17h8M12 21h8M12 25h5" /></svg
				>
			</BeforeCard>
			<BeforeCard href="/resources" kicker="Resources" title="For owners considering a sale">
				<svg
					viewBox="0 0 32 32"
					fill="none"
					stroke="currentColor"
					stroke-width="1.7"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
					><path d="M6 6.5A1.5 1.5 0 0 1 7.5 5H16v22H7.5A1.5 1.5 0 0 1 6 25.5Z" /><path
						d="M16 5h8.5A1.5 1.5 0 0 1 26 6.5v19a1.5 1.5 0 0 1-1.5 1.5H16"
					/><path d="M9.5 10h3M9.5 14h3M19.5 10h3M19.5 14h3M19.5 18h3" /></svg
				>
			</BeforeCard>
			<BeforeCard href="/about" kicker="About" title="Who would run your deal">
				<svg
					viewBox="0 0 32 32"
					fill="none"
					stroke="currentColor"
					stroke-width="1.7"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
					><circle cx="12" cy="12" r="3.4" /><path
						d="M5.5 25c0-3.6 2.9-6.3 6.5-6.3s6.5 2.7 6.5 6.3"
					/><circle cx="22.5" cy="13.5" r="2.7" /><path d="M20.5 19c3.2.1 5.8 2.6 5.8 6.1" /></svg
				>
			</BeforeCard>
		</div>
	</div>
</section>

<style>
	/* Two panels. `minmax(0, …)` and the `min-inline-size` keep a long word
	   or the select from pushing the page sideways on a phone. */
	.contact-layout {
		display: grid;
		grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
		gap: clamp(1.25rem, 3vw, 2rem);
		align-items: stretch;
	}
	.contact-layout > * {
		min-inline-size: 0;
	}

	.contact-call {
		position: relative;
		isolation: isolate;
		overflow: clip;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-end;
		gap: 1.25rem;
		min-block-size: 280px;
		padding: clamp(1.75rem, 4vw, 2.75rem);
		background: var(--steel);
		border-radius: var(--radius);
		border-block-start: 3px solid var(--copper);
	}
	.call-icon {
		display: block;
		margin-block-end: auto;
	}
	.contact-call h2,
	.contact-note h2 {
		font-size: clamp(1.5rem, 2.4vw, 1.9rem);
	}

	.contact-note {
		background: var(--white);
		border: 1px solid var(--sand);
		border-radius: var(--radius);
		padding: clamp(1.75rem, 4vw, 2.75rem);
	}
	form {
		margin-block-start: 2rem;
	}
	.form-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.2rem;
	}
	.submit {
		grid-column: 1 / -1;
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		min-inline-size: 0;
	}
	.form-status {
		font-size: 0.92rem;
		margin-block-start: 0.3rem;
		min-block-size: 1.2rem;
	}
	.error {
		color: var(--copper);
	}
	.ok {
		color: var(--success);
	}

	/* Spam honeypot: off-screen, and out of the accessibility tree and the tab order. */
	.trap {
		position: absolute;
		inset-inline-start: -9999px;
		inline-size: 1px;
		block-size: 1px;
		overflow: clip;
	}

	/* The eyebrow keeps its own box; this wrapper owns the space below it. */
	.before-label {
		display: inline-flex;
		margin-block-end: 1.5rem;
	}
	.before-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}

	@media (max-width: 900px) {
		.contact-layout {
			grid-template-columns: minmax(0, 1fr);
		}
		.before-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 720px) {
		.form-grid {
			grid-template-columns: minmax(0, 1fr);
		}
	}
	@media (max-width: 520px) {
		.before-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
