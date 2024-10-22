<script lang="ts">
	import '../app.css';

	import { Button } from '$lib/components/ui/button';
	import { Toaster } from '$lib/components/ui/sonner';

	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	const navLinks = ['/', '/transactions', '/reports'];

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	const { children } = $props();
</script>

<Toaster />

<header class="grid grid-cols-3 items-center py-4 px-8">
	<h1 class="justify-self-start text-xl font-extrabold tracking-tight">
		SUPERPEDRÃO'S SUPER FUCK DASHBOARD
	</h1>
	<nav class="flex w-full justify-center gap-4 justify-self-center">
		{#each navLinks as href}
			<div class="flex flex-col">
				<Button
					variant="ghost"
					{href}
					aria-current={$page.url.pathname === href ? 'page' : undefined}
					class="text-base font-bold uppercase {$page.url.pathname === href &&
						'text-primary pointer-events-none'}"
				>
					{href === '/' ? 'Overview' : href.slice(1)}
				</Button>
				{#if $page.url.pathname === href}
					<div
						class="border-primary h-px border"
						style="view-transition-name: current-page-indicator;"
					></div>
				{/if}
			</div>
		{/each}
	</nav>
</header>

<div class="flex justify-center">
	<main class="w-full max-w-6xl space-y-8 p-4">
		{@render children()}
	</main>
</div>
