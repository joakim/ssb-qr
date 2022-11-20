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
		text = valid ? normalize(link) : link
	}

	$: qrSvg = vkQr.createQR(text, {
		qrSize: 512,
		isShowLogo: true,
		logoData: logo,
		foregroundColor: !link || valid ? color : 'crimson',
	})

	function open() {
		if (valid) window.location.assign(text)
	}

	let qr: HTMLElement
	let offset: number
	$: offset = qr?.offsetTop

	let resizing = false
	function resize(event: MouseEvent) {
		if (resizing) size = Math.max(256, event.y - offset)
	}

	let innerWidth: number
	$: if (!resizing && innerWidth < 512) {
		size = 256
	}
</script>

<svelte:window
	bind:innerWidth
	on:mousemove={resize}
	on:mouseup={() => {
		if (resizing) resizing = false
	}}
/>

<div bind:this={qr} class="qr" class:valid style="width: {size}px; height: {size}px;">
	<div class="svg" on:click={open} on:keypress={({ key }) => key === 'Enter' && open()}>
		{@html qrSvg}
	</div>
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

		&.valid {
			cursor: pointer;
		}

		svg {
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
