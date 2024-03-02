<script lang="ts">
	import '../app.pcss';
	import { page } from '$app/stores';

	const links = [
		{
			name: 'Visão geral',
			href: '/'
		},
		{
			name: 'Demonstrativo',
			href: '/demonstrativo'
		}
	];
</script>

<div class="min-h-screen bg-zinc-300 text-black">
	<div class="flex items-center gap-8 bg-primary px-4 text-white">
		<img
			src="/fn-logo.png"
			alt="Logo"
			class="h-12 w-12 rounded-full"
		/>
		<nav class="flex h-16 items-center gap-4">
			{#each links as link}
				<a
					href={link.href}
					class="rounded-md px-3 py-2 text-sm font-bold {$page.url.pathname === link.href
						? 'color-white pointer-events-none bg-fuchsia-800 text-white'
						: 'hover: hover:bg-fuchsia-800 hover:text-white'}"
					on:click={() => ($page.url.pathname = link.href)}>{link.name}</a
				>
			{/each}
		</nav>
	</div>

	<main class="px-12 py-8">
		<slot />
	</main>
</div>
