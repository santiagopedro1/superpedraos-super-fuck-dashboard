<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';

	import '../app.css';

	const { children } = $props();
</script>

<header class="space-y-4 py-4 px-8 text-center lg:px-16">
	<h1 class="scroll-m-20 text-xl font-extrabold tracking-tight">
		SUPERPEDRÃO'S SUPER FUCK DASHBOARD
	</h1>
	<Separator class="bg-primary h-0.5" />
</header>

<div class="flex justify-center">
	<main class="w-full max-w-6xl space-y-8 p-4">
		{@render children()}
	</main>
</div>
