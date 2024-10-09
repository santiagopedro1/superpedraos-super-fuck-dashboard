<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';

	import { Ellipsis, Pencil, Trash } from 'lucide-svelte';

	const { id }: { id: string } = $props();

	function edit() {
		console.log('edit', id);
	}

	function delete_transaction() {
		console.log('delete', id);
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button
			size="icon"
			variant="ghost"
			class="rounded-full"
		>
			<Ellipsis />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Item
				onclick={edit}
				class="items-center gap-2"
			>
				<Pencil />
				Edit
			</DropdownMenu.Item>
			<DropdownMenu.Item
				onclick={delete_transaction}
				class="text-destructive data-[highlighted]:bg-destructive data-[highlighted]:text-destructive-foreground items-center gap-2"
			>
				<Trash />
				Delete
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
