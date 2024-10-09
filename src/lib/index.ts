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
