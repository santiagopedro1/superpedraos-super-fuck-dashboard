// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	type Entrada = {
		id: number;
		valor: number;
		destino: 'caixa' | 'banco';
		data: Date;
		vendedor: string;
	};
	type Saida = {
		id: number;
		valor: number;
		motivo: string;
		origem: 'caixa' | 'banco';
		data: Date;
	};
}

export {};
