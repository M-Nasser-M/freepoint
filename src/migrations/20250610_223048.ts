import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`footer_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_social_links_order_idx\` ON \`footer_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_social_links_parent_id_idx\` ON \`footer_social_links\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`footer\` ADD \`company_info_description\` text;`)
  await db.run(sql`ALTER TABLE \`footer\` ADD \`company_info_phone\` text;`)
  await db.run(sql`ALTER TABLE \`footer\` ADD \`company_info_email\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_layout\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`version_hero_layout\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`footer_social_links\`;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_layout\` text DEFAULT 'textOnLeft';`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_layout\` text DEFAULT 'textOnLeft';`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`company_info_description\`;`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`company_info_phone\`;`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`company_info_email\`;`)
}
