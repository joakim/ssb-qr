<script lang="ts">
	import vkQr from '@vkontakte/vk-qr'
	import { validate, normalize } from '../links'

	export let link: string
	export let logo: string
	export let color: string
	export let size = 512
	export let valid: boolean

	let text: string
	$: {
		valid = link.length > 0 && validate(link)
		if (valid) {
			text = normalize(link)
		} else {
			text = link
		}
	}

	$: qrSvg = vkQr.createQR(text, {
		qrSize: 512,
		isShowLogo: true,
		logoData: logo,
		foregroundColor: !link || valid ? color : 'crimson',
	})

	let qr: HTMLElement
	let offset: number
	$: offset = qr?.offsetTop

	let innerWidth: number
	$: size = innerWidth < 512 ? 256 : 512

	let resizing = false
	function resize(event: MouseEvent) {
		if (resizing) {
			size = Math.max(256, event.y - offset)
		}
	}
</script>

<svelte:window
	bind:innerWidth
	on:mousemove={resize}
	on:mouseup={() => {
		resizing = false
	}}
/>

<div bind:this={qr} class="qr" style="width: {size}px; height: {size}px;">
	{@html qrSvg}
	<div class="drag" on:mousedown={() => (resizing = true)} />
</div>

<style global lang="scss">
	.qr {
		position: relative;
		margin-bottom: 1rem;

		@media screen and (max-width: 400) {
			width: 80vw !important;
			height: 80vh !important;
		}

		> svg {
			width: 100% !important;
			height: 100% !important;
		}

		.drag {
			position: absolute;
			bottom: 0;
			right: 0;
			width: 2rem;
			height: 2rem;
			cursor: nwse-resize;
		}
	}
</style>
