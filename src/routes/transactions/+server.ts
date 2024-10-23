import { db, schema } from '$lib/db';

import { inArray } from 'drizzle-orm';

export async function DELETE({ url }) {
	const ids = new URL(url).searchParams.get('ids')?.split(',');

	if (!ids) return new Response(null, { status: 400 });

	await db.delete(schema.transaction).where(inArray(schema.transaction.id, ids));

	return new Response(null, { status: 204 });
}
