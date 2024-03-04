<script context="module">
	import Chart from 'chart.js/auto';
</script>

<script lang="ts">
	export let config: any;

	const handleChart = (element: any, config: any) => {
		let theChart = new Chart(element, config);

		return {
			update(config: any) {
				theChart.destroy();
				theChart = new Chart(element, config);
			},
			destroy() {
				theChart.destroy();
			}
		};
	};
</script>

<canvas use:handleChart={config} />
