import { createAct } from '$lib/server';
import { redirect } from '@sveltejs/kit';
import { createAbstractBuilder } from 'typescript';

/** @type {import('./$types').PageServerLoad} */
export const load = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}
	return { user: event.locals.user };
};

export const actions = {
    create: async (event) => {
        const formData = await event.request.formData();
		const name = formData.get('name')?.toString();

        if (!event.locals.user) {
            return redirect(302, '/login');
        }
        const user_id = event.locals.user.id;

        if(name === undefined){
            return Error("Name is invalid!");
        }

        createAct(user_id, name);
    }
}