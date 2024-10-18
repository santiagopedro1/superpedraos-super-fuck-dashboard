<script lang="ts">
	import { Pencil } from 'lucide-svelte/icons';
	import { Button } from '$lib/components/ui/button';

	interface Props {
		id: string;
	}

	const { id }: Props = $props();

	function editRow() {
		console.log('Editing row', id);
	}
</script>

<Button
	variant="ghost"
	size="icon"
	onclick={editRow}
>
	<Pencil size="16" />
</Button>
