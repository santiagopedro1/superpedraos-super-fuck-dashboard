<script lang="ts">
	import RelatorioForm from '$lib/components/relatorio-form.svelte';

	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import type { FormSchema } from '$lib/form-schema';

	const { data }: { data: SuperValidated<Infer<FormSchema>> } = $props();
</script>

<RelatorioForm {data} />
