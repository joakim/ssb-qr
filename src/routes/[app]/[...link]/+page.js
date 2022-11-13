import { error } from '@sveltejs/kit'
import { apps } from '../../../lib/apps'

export const ssr = false

/** @type {import('./$types').PageLoad} */
export function load({ params: { app, link } }) {
	if (!link) {
		link = app
		app = 'patchwork'
	}

	if (!apps[app]) {
		throw error(404, 'app not found')
	}

	if (!link) {
		throw error(500, 'invalid link')
	}

	return {
		app: app,
		link: link,
	}
}
