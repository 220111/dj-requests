// @ts-nocheck
import { hash, verify } from '@node-rs/argon2';
import { createAct, getActs } from '$lib/server';
import { db } from '$lib/server/db';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import * as table from '$lib/server/db/schema';
import * as auth from '$lib/server/auth';

/** @type {import('./$types').PageServerLoad} */
export const load = async (event) => {
	const user = event.locals.user;
	if (!user) {
		return { user: null, step: 1 };
	}
	const acts = await getActs(user.id);
	if (acts.length == 0) {
		return { user: user, step: 2 };
	}

	return { user: user, step: 3, acts: acts };
};

export const actions = {
	create: async (event) => {
		const user = event.locals.user;
		const formData = await event.request.formData();
		const name = formData.get('name')?.toString().trim();

		if (!user) {
			return redirect(302, '/login');
		}

		if (name === undefined || name === "") {
			return Error("Name is invalid!");
		}

		createAct(user.id, name);
		redirect(302, "/app/onboarding");
	},
	register: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		console.log(username);
		console.log(password);

		if (!validateUsername(username)) {
			return fail(400, { message: 'Invalid username' });
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Invalid password' });
		}

		const userId = generateUserId();
		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			await db.insert(table.user).values({ id: userId, username, passwordHash });

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch (e) {
			console.log(e);
			return fail(500, { message: 'An error has occurred' });
		}
		redirect(302, "/app/onboarding");
	}
}

function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}

/**
 * @param {FormDataEntryValue | null} username
 */
function validateUsername(username) {
	return (
		typeof username === 'string' &&
		username.length >= 3 &&
		username.length <= 31 &&
		/^[a-z0-9_-]+$/.test(username)
	);
}

/**
 * @param {FormDataEntryValue | null} password
 */
function validatePassword(password) {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}