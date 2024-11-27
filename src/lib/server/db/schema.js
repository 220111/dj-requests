import { pgTable, serial, text, integer, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const act = pgTable('act', {
	id: uuid('id').primaryKey().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	name: text('name').notNull().unique(),
	image: text('image'),
})

export const event = pgTable('event', {
	id: uuid('id').primaryKey().defaultRandom(),
	act_id: uuid('act_id')
		.notNull()
		.references(() => act.id),
	name: text('name').notNull(),
	client_email: text('client_email'),
	start_time: timestamp('start_time', {withTimezone: true}).notNull(),
	accepting_requests: boolean('accepting_requests').default(false).notNull(),
	ended: boolean('ended').default(false).notNull()
})