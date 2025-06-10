import type { PageServerLoad } from './$types';

import { getSumsAndCounts } from '$lib';

export const load = (async () => {
	return {
		sumsAndCounts: await getSumsAndCounts()
	};
}) satisfies PageServerLoad;
