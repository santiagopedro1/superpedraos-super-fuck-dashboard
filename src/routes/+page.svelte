<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	const users = data.users;
</script>

{#each users as user}
	<li>{user.id} - {user.name}</li>
{/each}
