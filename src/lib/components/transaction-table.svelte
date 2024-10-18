<script lang="ts">
	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import { addPagination, addSelectedRows, addTableFilter } from 'svelte-headless-table/plugins';

	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	import Edit from './data-table-edit.svelte';
	import DataTableCheckbox from './data-table-checkbox.svelte';

	import type { Transaction } from '$lib/db/schema';
	import { currencyFormatter } from '$lib';

	import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Trash2 } from 'lucide-svelte';

	import { readable } from 'svelte/store';

	interface Props {
		transactions: Array<Transaction>;
		interactive?: boolean;
	}

	const { transactions, interactive = false }: Props = $props();

	const createColumnsArray = (interactive: boolean) => {
		const allColumns = [
			table.column({
				id: 'checkbox',
				header: (_, { pluginStates }) => {
					const { allPageRowsSelected } = pluginStates.select;
					return createRender(DataTableCheckbox, { checked: allPageRowsSelected });
				},
				accessor: 'id',
				cell: ({ row }, { pluginStates }) => {
					const { getRowState } = pluginStates.select;
					const { isSelected } = getRowState(row);
					return createRender(DataTableCheckbox, { checked: isSelected });
				},
				plugins: { filter: { exclude: true } }
			}),
			table.column({
				header: 'Code',
				accessor: 'code',
				plugins: { filter: { exclude: true } }
			}),
			table.column({
				header: 'Amount',
				accessor: 'amount',
				cell: ({ value }) => {
					return currencyFormatter(value);
				},
				plugins: { filter: { exclude: true } }
			}),
			table.column({
				header: 'Date',
				accessor: 'date',
				cell: ({ value }) => {
					return value.toLocaleDateString('pt-BR');
				},
				plugins: { filter: { exclude: true } }
			}),
			table.column({
				header: 'Destination',
				accessor: 'destination',
				plugins: { filter: { exclude: true } }
			}),
			table.column({
				header: 'Description',
				accessor: 'description',
				cell: ({ value }) => {
					return value || '-';
				},
				plugins: {
					filter: {
						getFilterValue(value) {
							return value.toLowerCase();
						}
					}
				}
			}),
			table.column({
				id: 'edit',
				header: '',
				accessor: ({ id }) => id,
				cell: (item) => {
					// svelte 5 bug
					return createRender(Edit as any, { id: item.value });
				},
				plugins: { filter: { exclude: true } }
			})
		];

		if (!interactive) {
			return table.createColumns(allColumns.slice(1, -1));
		} else {
			return table.createColumns(allColumns);
		}
	};

	const table = createTable(readable(transactions), {
		page: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.includes(filterValue)
		}),
		select: addSelectedRows()
	});

	const columns = table.createColumns(createColumnsArray(interactive));

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex, pageCount } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
	const { selectedDataIds } = pluginStates.select;

	function deleteSelectedRows() {
		const selected_rows_ids = Object.keys($selectedDataIds);
		const selected_transactions_ids = transactions
			.filter((_, i) => selected_rows_ids.includes(i.toString()))
			.map((transaction) => transaction.id);
		console.log('Selected transactions', selected_transactions_ids);
	}
</script>

<div class="w-full space-y-2">
	<div class="flex justify-between">
		<Input
			class="max-w-sm"
			placeholder="Filter description..."
			type="text"
			bind:value={$filterValue}
		/>
		{#if Object.keys($selectedDataIds).length > 0}
			<Button
				variant="ghost"
				size="icon"
				class="text-destructive hover:text-destructive-foreground hover:bg-destructive"
				onclick={deleteSelectedRows}
			>
				<Trash2 />
			</Button>
		{/if}
	</div>
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row class="hover:bg-inherit">
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe
								attrs={cell.attrs()}
								let:attrs
							>
								<Table.Head
									{...attrs}
									class="
									{cell.id === 'checkbox' ? 'w-9' : ''}
									{cell.id === 'code' ? 'w-20' : ''}
									{cell.id === 'amount' ? 'w-28' : ''}
									{cell.id === 'date' ? 'w-32' : ''}
									{cell.id === 'destination' ? 'w-28' : ''}
									{cell.id === 'edit' ? 'w-16' : ''}
									"
								>
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe
					rowAttrs={row.attrs()}
					let:rowAttrs
				>
					<Table.Row
						{...rowAttrs}
						data-state={$selectedDataIds[row.id] && 'selected'}
					>
						{#each row.cells as cell (cell.id)}
							<Subscribe
								attrs={cell.attrs()}
								let:attrs
							>
								<Table.Cell
									class="
									{cell.id === 'amount' ? 'font-bold' : ''}
									{cell.id === 'destination' ? 'capitalize' : ''}"
									{...attrs}
								>
									<Render of={cell.render()} />
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
	<div class="flex items-center justify-center gap-2 py-4">
		<div>
			<Button
				variant="outline"
				size="icon"
				on:click={() => ($pageIndex = 0)}
				disabled={!$hasPreviousPage}
			>
				<ChevronsLeft />
			</Button>
			<Button
				variant="outline"
				size="icon"
				on:click={() => ($pageIndex = $pageIndex - 1)}
				disabled={!$hasPreviousPage}
			>
				<ChevronLeft />
			</Button>
		</div>
		<div>
			<Button
				variant="outline"
				size="icon"
				disabled={!$hasNextPage}
				on:click={() => ($pageIndex = $pageIndex + 1)}
			>
				<ChevronRight />
			</Button>
			<Button
				variant="outline"
				size="icon"
				disabled={!$hasNextPage}
				on:click={() => ($pageIndex = $pageCount - 1)}
			>
				<ChevronsRight />
			</Button>
		</div>
	</div>
</div>
