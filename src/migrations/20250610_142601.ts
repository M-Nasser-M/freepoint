import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_call_to_action_block_cta_buttons\` RENAME TO \`pages_blocks_my_call_to_action_block_cta_buttons\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_call_to_action_block\` RENAME TO \`pages_blocks_my_call_to_action_block\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_call_to_action_block_cta_buttons\` RENAME TO \`_pages_v_blocks_my_call_to_action_block_cta_buttons\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_call_to_action_block\` RENAME TO \`_pages_v_blocks_my_call_to_action_block\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_my_call_to_action_block_cta_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`button_text\` text,
  	\`button_href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_my_call_to_action_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_my_call_to_action_block_cta_buttons\`("_order", "_parent_id", "id", "button_text", "button_href") SELECT "_order", "_parent_id", "id", "button_text", "button_href" FROM \`pages_blocks_my_call_to_action_block_cta_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_my_call_to_action_block_cta_buttons\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_my_call_to_action_block_cta_buttons\` RENAME TO \`pages_blocks_my_call_to_action_block_cta_buttons\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_my_call_to_action_block_cta_buttons_order_idx\` ON \`pages_blocks_my_call_to_action_block_cta_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_my_call_to_action_block_cta_buttons_parent_id_idx\` ON \`pages_blocks_my_call_to_action_block_cta_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_my_call_to_action_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`background_color\` text,
  	\`centered\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_my_call_to_action_block\`("_order", "_parent_id", "_path", "id", "title", "description", "background_color", "centered", "block_name") SELECT "_order", "_parent_id", "_path", "id", "title", "description", "background_color", "centered", "block_name" FROM \`pages_blocks_my_call_to_action_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_my_call_to_action_block\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_my_call_to_action_block\` RENAME TO \`pages_blocks_my_call_to_action_block\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_my_call_to_action_block_order_idx\` ON \`pages_blocks_my_call_to_action_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_my_call_to_action_block_parent_id_idx\` ON \`pages_blocks_my_call_to_action_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_my_call_to_action_block_path_idx\` ON \`pages_blocks_my_call_to_action_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_my_call_to_action_block_cta_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`button_text\` text,
  	\`button_href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_my_call_to_action_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_my_call_to_action_block_cta_buttons\`("_order", "_parent_id", "id", "button_text", "button_href", "_uuid") SELECT "_order", "_parent_id", "id", "button_text", "button_href", "_uuid" FROM \`_pages_v_blocks_my_call_to_action_block_cta_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_my_call_to_action_block_cta_buttons\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_my_call_to_action_block_cta_buttons\` RENAME TO \`_pages_v_blocks_my_call_to_action_block_cta_buttons\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_my_call_to_action_block_cta_buttons_order_idx\` ON \`_pages_v_blocks_my_call_to_action_block_cta_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_my_call_to_action_block_cta_buttons_parent_id_idx\` ON \`_pages_v_blocks_my_call_to_action_block_cta_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_my_call_to_action_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`background_color\` text,
  	\`centered\` integer DEFAULT true,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_my_call_to_action_block\`("_order", "_parent_id", "_path", "id", "title", "description", "background_color", "centered", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "title", "description", "background_color", "centered", "_uuid", "block_name" FROM \`_pages_v_blocks_my_call_to_action_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_my_call_to_action_block\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_my_call_to_action_block\` RENAME TO \`_pages_v_blocks_my_call_to_action_block\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_my_call_to_action_block_order_idx\` ON \`_pages_v_blocks_my_call_to_action_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_my_call_to_action_block_parent_id_idx\` ON \`_pages_v_blocks_my_call_to_action_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_my_call_to_action_block_path_idx\` ON \`_pages_v_blocks_my_call_to_action_block\` (\`_path\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_my_call_to_action_block_cta_buttons\` RENAME TO \`pages_blocks_call_to_action_block_cta_buttons\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_my_call_to_action_block\` RENAME TO \`pages_blocks_call_to_action_block\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_my_call_to_action_block_cta_buttons\` RENAME TO \`_pages_v_blocks_call_to_action_block_cta_buttons\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_my_call_to_action_block\` RENAME TO \`_pages_v_blocks_call_to_action_block\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_call_to_action_block_cta_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`button_text\` text,
  	\`button_href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_call_to_action_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_call_to_action_block_cta_buttons\`("_order", "_parent_id", "id", "button_text", "button_href") SELECT "_order", "_parent_id", "id", "button_text", "button_href" FROM \`pages_blocks_call_to_action_block_cta_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_call_to_action_block_cta_buttons\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_call_to_action_block_cta_buttons\` RENAME TO \`pages_blocks_call_to_action_block_cta_buttons\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_call_to_action_block_cta_buttons_order_idx\` ON \`pages_blocks_call_to_action_block_cta_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_call_to_action_block_cta_buttons_parent_id_idx\` ON \`pages_blocks_call_to_action_block_cta_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_call_to_action_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`background_color\` text,
  	\`centered\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_call_to_action_block\`("_order", "_parent_id", "_path", "id", "title", "description", "background_color", "centered", "block_name") SELECT "_order", "_parent_id", "_path", "id", "title", "description", "background_color", "centered", "block_name" FROM \`pages_blocks_call_to_action_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_call_to_action_block\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_call_to_action_block\` RENAME TO \`pages_blocks_call_to_action_block\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_call_to_action_block_order_idx\` ON \`pages_blocks_call_to_action_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_call_to_action_block_parent_id_idx\` ON \`pages_blocks_call_to_action_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_call_to_action_block_path_idx\` ON \`pages_blocks_call_to_action_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_call_to_action_block_cta_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`button_text\` text,
  	\`button_href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_call_to_action_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_call_to_action_block_cta_buttons\`("_order", "_parent_id", "id", "button_text", "button_href", "_uuid") SELECT "_order", "_parent_id", "id", "button_text", "button_href", "_uuid" FROM \`_pages_v_blocks_call_to_action_block_cta_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_call_to_action_block_cta_buttons\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_call_to_action_block_cta_buttons\` RENAME TO \`_pages_v_blocks_call_to_action_block_cta_buttons\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_call_to_action_block_cta_buttons_order_idx\` ON \`_pages_v_blocks_call_to_action_block_cta_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_call_to_action_block_cta_buttons_parent_id_idx\` ON \`_pages_v_blocks_call_to_action_block_cta_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_call_to_action_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`background_color\` text,
  	\`centered\` integer DEFAULT true,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_call_to_action_block\`("_order", "_parent_id", "_path", "id", "title", "description", "background_color", "centered", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "title", "description", "background_color", "centered", "_uuid", "block_name" FROM \`_pages_v_blocks_call_to_action_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_call_to_action_block\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_call_to_action_block\` RENAME TO \`_pages_v_blocks_call_to_action_block\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_call_to_action_block_order_idx\` ON \`_pages_v_blocks_call_to_action_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_call_to_action_block_parent_id_idx\` ON \`_pages_v_blocks_call_to_action_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_call_to_action_block_path_idx\` ON \`_pages_v_blocks_call_to_action_block\` (\`_path\`);`)
}
