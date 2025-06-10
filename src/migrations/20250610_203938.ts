import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`header_nav_items\` ADD \`order\` numeric DEFAULT 1 NOT NULL;`)
  await db.run(sql`ALTER TABLE \`header\` DROP COLUMN \`order\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`header\` ADD \`order\` numeric DEFAULT 1 NOT NULL;`)
  await db.run(sql`ALTER TABLE \`header_nav_items\` DROP COLUMN \`order\`;`)
}
