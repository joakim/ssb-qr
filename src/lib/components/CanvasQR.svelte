<script lang="ts">
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'
	import { Canvas, Layer } from 'svelte-canvas'
	import QR from './QR.svelte'

	let root: HTMLElement
	let svg: SVGSVGElement
	onMount(() => {
		svg = root.querySelector('svg') as SVGSVGElement
	})

	// $: setup = ({ context, width, height }: any) => {
	// 	const img = new Image(width, height)
	// 	const url = new XMLSerializer().serializeToString(svg)
	// 	img.onload = () => context.drawImage(img, 0, 0)
	// 	img.src = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(url)
	// 	console.log(img.src)
	// }

	$: render = ({ context, width, height }: any) => {
		if (!svg) return
		const img = new Image(width, height)
		const url = new XMLSerializer().serializeToString(svg)
		img.onload = () => context.drawImage(img, 0, 0)
		img.src = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(url)
		console.log(img.src)
	}
</script>

<div class="qr" bind:this={root}>
	<QR {link} {logo} {color} bind:size bind:valid />
</div>

<Canvas width={size} height={size}>
	<Layer {render} />
</Canvas>
