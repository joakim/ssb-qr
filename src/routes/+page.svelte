<script lang="ts">
	import QR from '../lib/components/QR.svelte'
	import { apps } from '../lib/apps'

	export let link = ''
	export let app = 'patchwork'

	let logo: string
	let color: string
	$: [name, logo, color] = apps[app]

	let size: number
	let valid: boolean
</script>

<QR {link} {logo} {color} bind:size bind:valid />

<input
	type="text"
	placeholder="Paste SSB URI or cypherlink here"
	bind:value={link}
	style="width: {size}px"
	class="link"
	class:invalid={link && !valid}
/>

<div class="options">
	<label
		>Theme:
		<select bind:value={app}>
			{#each Object.entries(apps) as [id, [name]]}
				<option value={id}>{name}</option>
			{/each}
		</select>
	</label>

	<!-- <button>Generate</button> -->
</div>

<style lang="scss">
	.options {
		display: flex;
		justify-content: space-between;
	}

	input,
	button {
		display: block;
		margin-bottom: 1rem;
	}

	input.link {
		&.invalid {
			outline: none;
			border: 2px solid crimson;
			border-radius: 0.2rem;
			filter: drop-shadow(0 0 0.2rem crimson);
		}
	}
</style>
