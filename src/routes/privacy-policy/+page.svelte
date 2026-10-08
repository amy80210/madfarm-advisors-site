<script lang="ts">
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
</script>

<PageHero compact>
	<Eyebrow>Legal</Eyebrow>
	<h1>Privacy Policy</h1>
</PageHero>

<section class="section">
	<div class="wrap narrow legal">
		<p>
			At Madfarm Advisors, we are committed to maintaining the confidentiality and security of the
			personal and financial information entrusted to us by our clients. This privacy policy
			outlines how we collect, use, and protect sensitive information related to business
			transactions for buyers and sellers. We understand the importance of privacy in such matters
			and handle all client information with the highest level of discretion and care.
		</p>

		<h2>Information we collect</h2>
		<p>
			In the course of providing our services, we may collect certain details from you, such as
			contact information and data pertinent to the valuation and acquisition process. This
			information helps us to facilitate communications, manage transactions, and deliver
			personalized service aligned with your needs and goals.
		</p>
		<p>
			When you use the contact form on this website, we receive the name, email address, and message
			you provide, along with your phone number and company if you choose to include them. We use
			this information only to respond to your inquiry. This website does not use advertising or
			analytics cookies.
		</p>

		<h2>How we share information</h2>
		<p>
			We do not share this information with third parties, except in instances where collaboration
			with essential service providers is necessary for transaction facilitation or when legally
			obligated.
		</p>

		<h2>How we protect information</h2>
		<p>
			To protect your data, we employ industry-standard security measures aimed at preventing
			unauthorized access. While we are diligent in safeguarding your information, please note that
			no security system is entirely foolproof. Therefore, we commit to continuously updating our
			practices to uphold the highest standards of security.
		</p>

		<h2>Changes to this policy</h2>
		<p>
			Madfarm Advisors may occasionally update this policy to reflect changes in our privacy
			practices. Any updates will be posted here, and continued use of our services implies
			acceptance of these changes.
		</p>

		<h2>Contact</h2>
		<p>
			For any questions or concerns regarding this privacy policy, please contact us at <a
				href="mailto:info@madfarm-advisors.com">info@madfarm-advisors.com</a
			>.
		</p>
	</div>
</section>

<style>
	.legal h2 {
		font-size: 1.35rem;
		margin-block: 2.25rem 0.75rem;
	}
	.legal p + p {
		margin-block-start: 1rem;
	}
	.legal a {
		color: var(--copper);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.legal a:active {
		color: var(--steel);
	}
	@media (hover: hover) and (pointer: fine) {
		.legal a:hover {
			color: var(--steel);
		}
	}
</style>
