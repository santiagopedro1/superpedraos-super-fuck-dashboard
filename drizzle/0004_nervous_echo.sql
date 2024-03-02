CREATE TABLE `transacoes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tipo` text NOT NULL,
	`valor` real NOT NULL,
	`data` integer NOT NULL,
	`motivo` text NOT NULL,
	`dinheiro` integer NOT NULL,
	`parte_id` integer NOT NULL,
	FOREIGN KEY (`parte_id`) REFERENCES `partes`(`parte_id`) ON UPDATE no action ON DELETE no action
);
