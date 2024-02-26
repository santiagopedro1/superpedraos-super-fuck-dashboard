import { db } from '$lib/database';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const users = await db.query.user.findMany();
	return {
		users,
		mostrarValores: cookies.get('mostrarValores')
	};
}) satisfies PageServerLoad;
