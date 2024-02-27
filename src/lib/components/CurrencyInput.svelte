<script lang="ts">
	export let placeholder: string | undefined = '0.00';
	export let value: string | undefined = undefined;
	export let tipo: string | undefined;

	function onlyNumeric(e: KeyboardEvent) {
		if (!e.key.match(/^[0-9]+$/)) e.preventDefault();
	}

	function setTwoNumberDecimal(e: Event) {
		const el = e.target as HTMLInputElement;
		if (el.value) {
			let temporaryStringValue = el.value.replace('.', '');
			temporaryStringValue = temporaryStringValue.replace(/\D/g, '');
			if (temporaryStringValue && temporaryStringValue.length > 0) {
				const temporaryValue = +temporaryStringValue;
				const temporaryShiftedValue = temporaryValue / 100;
				value = parseFloat(temporaryShiftedValue.toString()).toFixed(2);
			}
		}
	}
</script>

<div
	class="relative mt-1 h-[2.5rem] rounded-md text-2xl {tipo === 'entrada'
		? 'text-green-500'
		: 'text-red-500'}"
>
	<input
		type="number"
		inputmode="numeric"
		pattern="\d*"
		id="currency"
		class="block h-[2.5rem] w-full max-w-60 rounded-md border-b px-3 pl-12 placeholder-opacity-80 outline-none focus:outline-none"
		{placeholder}
		bind:value
		step="0.01"
		on:input={setTwoNumberDecimal}
		on:keypress={onlyNumeric}
	/>

	<span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
		<slot name="leading" />
	</span>
</div>

<style>
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
