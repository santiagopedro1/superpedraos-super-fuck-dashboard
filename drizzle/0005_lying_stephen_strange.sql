CREATE TABLE `entrada` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`valor` real NOT NULL,
	`destino` text NOT NULL,
	`data` integer NOT NULL,
	`vendedor_id` integer NOT NULL,
	FOREIGN KEY (`vendedor_id`) REFERENCES `vendedores`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `saida` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`valor` real NOT NULL,
	`motivo` text NOT NULL,
	`origem` text NOT NULL,
	`data` integer NOT NULL
);
--> statement-breakpoint
DROP TABLE `transacoes`;--> statement-breakpoint
ALTER TABLE `partes` RENAME TO `vendedores`;--> statement-breakpoint
ALTER TABLE `vendedores` RENAME COLUMN `parte_id` TO `id`;