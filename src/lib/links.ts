import { fromFeedSigil, fromMessageSigil, fromBlobSigil, isSSBURI } from 'ssb-uri2'

type Sigils = { [index: string]: Function }

const sigils: Sigils = {
	'@': fromFeedSigil,
	'%': fromMessageSigil,
	'&': fromBlobSigil,
}

function sigilLinkToSSBURI(link: string) {
	const sigil = link[0]
	if (!sigils[sigil]) {
		return null
	}
	return sigils[sigil](link)
}

function isSigilLink(link: string) {
	const dot = link.lastIndexOf('.')
	if (dot === -1) return false

	const format = link.slice(dot + 1)
	if (!format) return false

	const sigil = link[0]
	return !!sigils[sigil]
}

export function validate(link: string) {
	let isURI

	try {
		isURI = isSSBURI(link) // throws on malformed URLs
	} catch (err) {
		// silent treatment
	}

	return isURI || isSigilLink(link)
}

export function normalize(link: string) {
	let uri = link

	if (isSigilLink(link)) {
		uri = sigilLinkToSSBURI(link)

		// Use deprecated URIs, because they are the only ones that work in Manyverse
		// @todo ask stalz why Manyverse doesn't handle the new URIs
		if (uri.includes('/classic/')) {
			if (uri.startsWith('ssb:feed')) {
				uri = uri.replace('/classic/', '/ed25519/')
			} else if (uri.startsWith('ssb:message') || uri.startsWith('ssb:blob')) {
				uri = uri.replace('/classic/', '/sha256/')
			}
		}
	}

	return uri
}
