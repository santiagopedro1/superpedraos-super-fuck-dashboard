import { InferSelectModel } from 'drizzle-orm';
import { transaction } from '$lib/server/db/schema';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	type TransactionCategory =
		| 'Income'
		| 'Supplier Payments'
		| 'Staff Payments'
		| 'Pro-Labore Payments'
		| 'Office/Administrative Supplies'
		| 'Utility Payments'
		| 'Third-Party Payments'
		| 'Tax Payments'
		| 'Labor Charges'
		| 'Asset Acquisition'
		| 'Bank Fees'
		| 'Loans'
		| 'Promotions and Advertising';

	type Transaction = InferSelectModel<typeof transaction>;
}

export {};
