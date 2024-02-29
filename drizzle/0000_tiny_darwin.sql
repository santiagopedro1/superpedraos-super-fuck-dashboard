CREATE TABLE `partes` (
	`parte_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transacoes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tipo` text NOT NULL,
	`valor` real NOT NULL,
	`data` text NOT NULL,
	`motivo` text NOT NULL,
	`parte_id` integer NOT NULL,
	FOREIGN KEY (`parte_id`) REFERENCES `partes`(`parte_id`) ON UPDATE no action ON DELETE no action
);
