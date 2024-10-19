import { CalendarDate, DateFormatter, type DateValue } from '@internationalized/date';

export const currencyFormatter = (n: number) => {
	const r = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
	return r.format(n);
};

export const codeMapper = (code: number) => {
	switch (code) {
		case 1:
			return 'Entrada';
		case 2:
			return 'Saída';
	}
};

export const dateToCalendarDate = (date: Date) => {
	return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
};

export const dateFormatter = (
	date: Date | DateValue,
	tz: string = 'America/Sao_Paulo',
	locale: string = 'pt-BR'
) => {
	const df = new DateFormatter(locale, {
		dateStyle: 'long'
	});

	if ('toDate' in date) {
		date = date.toDate(tz);
	}

	return df.format(date);
};
