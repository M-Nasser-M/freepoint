import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_layout\` text DEFAULT 'textOnLeft';`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_layout\` text DEFAULT 'textOnLeft';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_layout\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`version_hero_layout\`;`)
}
