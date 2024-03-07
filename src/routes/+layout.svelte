<script lang="ts">
	import '../app.pcss';
	import { page } from '$app/stores';

	const links = [
		{
			name: 'Visão geral',
			href: '/'
		},
		{
			name: 'Caixa',
			href: '/caixa'
		}
	];
</script>

<div class="bg-background pl-[calc(100vw-100%)] text-foreground">
	<nav class="flex h-16 items-center justify-center gap-4">
		{#each links as link}
			<a
				href={link.href}
				class="rounded-md px-3 py-2 text-sm font-bold {$page.url.pathname === link.href
					? 'pointer-events-none'
					: 'text-muted-foreground hover:text-foreground'}"
				on:click={() => ($page.url.pathname = link.href)}>{link.name}</a
			>
		{/each}
	</nav>

	<main class="px-72 py-8">
		<slot />
	</main>
</div>
