<script lang="ts">
	import QR from '../../../lib/components/QR.svelte'
	import { apps } from '../../../lib/apps'

	export let data
	let { app, link } = data
	let [name, logo, color] = apps[app]

	let size: number
	let valid: boolean
</script>

<main>
	<div class="qr">
		<QR {link} {logo} {color} bind:size bind:valid />
	</div>

	{#if valid}
		<input
			type="text"
			readonly
			value={link}
			on:focus={(event) => event.currentTarget.select()}
			class="link"
			style="width: {size}px"
		/>
	{:else}
		<p class="error">Invalid SSB link</p>
	{/if}
</main>

<style lang="scss">
	.qr {
		// display: none;
	}

	input.link {
		display: block;
		border: 0;
		text-align: center;
	}

	.error {
		color: crimson;
		font-weight: bold;
		text-align: center;
	}
</style>
