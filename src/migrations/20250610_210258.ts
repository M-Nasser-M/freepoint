import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_line1\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_highlighted_word\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_line2\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_subheadline\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_rich_text\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_line1\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_highlighted_word\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_line2\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_subheadline\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`version_hero_rich_text\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_rich_text\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_line1\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_highlighted_word\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_line2\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_subheadline\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_rich_text\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`version_hero_line1\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`version_hero_highlighted_word\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`version_hero_line2\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`version_hero_subheadline\`;`)
}
