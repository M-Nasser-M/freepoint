import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_about_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_links_order_idx\` ON \`pages_blocks_about_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_about_links_parent_id_idx\` ON \`pages_blocks_about_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_about_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_about_links_order_idx\` ON \`_pages_v_blocks_about_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_about_links_parent_id_idx\` ON \`_pages_v_blocks_about_links\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_about\` DROP COLUMN \`cta_button_text\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_about\` DROP COLUMN \`cta_button_href\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_about\` DROP COLUMN \`cta_button_text\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_about\` DROP COLUMN \`cta_button_href\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_about_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_about_links\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_about\` ADD \`cta_button_text\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_about\` ADD \`cta_button_href\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_about\` ADD \`cta_button_text\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_about\` ADD \`cta_button_href\` text;`)
}
