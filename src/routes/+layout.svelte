<script lang="ts">
	import '../app.pcss';
	import { page } from '$app/stores';

	const links = [
		{
			name: 'Visão Geral',
			href: '/'
		},
		{
			name: 'Demonstrativo',
			href: '/demonstrativo'
		}
	];

	let currPath = $page.url.pathname;
</script>

<div class="min-h-screen bg-neutral-100 px-16 py-4 text-black">
	<ul class="mb-12 flex items-center justify-center gap-4">
		{#each links as link}
			<li>
				<a
					href={link.href}
					class:active={currPath === link.href}
					class="px-8 py-6 text-xl font-bold"
					on:click={() => (currPath = link.href)}>{link.name}</a
				>
			</li>
		{/each}
	</ul>
	<slot />
</div>

<style>
	.active {
		color: white;
		text-decoration: underline;
		text-underline-offset: 0.6rem;
		background-color: #c026d3;
		pointer-events: none;
	}
	a:not(.active):hover {
		color: white;
		background-color: #c026d3;
	}
</style>
