<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { HeadingLevel } from './index';
	import { cn } from '$lib/utils';

	type $$Props = HTMLAttributes<HTMLHeadingElement> & {
		tag?: HeadingLevel;
	};

	let className: $$Props['class'] = undefined;
	export let tag: $$Props['tag'] = 'h3';
	export { className as class };
</script>

<svelte:element
	this={tag}
	class={cn('text-lg leading-none font-semibold tracking-tight capitalize', className)}
	{...$$restProps}
>
	<slot />
</svelte:element>
