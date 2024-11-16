import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const { searchParams } = url;

	const period_param = searchParams.get('period');

	let period: { start: Date; end: Date } | undefined;

	if (period_param) {
		const [start_date, end_date] = period_param.split('-');
		const [start_day, start_month, start_year] = start_date.split('/');
		const [end_day, end_month, end_year] = end_date.split('/');

		const start = new Date(Number(start_year), Number(start_month) - 1, Number(start_day));
		const end = new Date(Number(end_year), Number(end_month) - 1, Number(end_day));

		period = {
			start,
			end
		};
	}

	return { period };
};
