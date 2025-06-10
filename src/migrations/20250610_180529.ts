import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`header\` ADD \`logo_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`header_logo_idx\` ON \`header\` (\`logo_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header\`("id", "updated_at", "created_at") SELECT "id", "updated_at", "created_at" FROM \`header\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`ALTER TABLE \`__new_header\` RENAME TO \`header\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
}
