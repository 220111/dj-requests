import { db } from '$lib/server/db';
import { act } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

/**
 * @param {string} userId
 */
export async function getActs(userId) {
    return await db.select().from(act).where(eq(act.userId, userId));
}

/**
 * @param {string} userId
 * @param {string} name
 */
export async function createAct(userId, name) {
    await db.insert(act).values({ userId: userId, name: name })
}