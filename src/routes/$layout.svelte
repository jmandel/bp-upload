<script lang="ts">
	import Header from '$lib/Header/index.svelte';
	import '../app.css';
</script>

<Header />

<main>
	<slot />
</main>
<br/>
<footer>
SMART on FHIR, {new Date().toISOString().slice(0,4)}
</footer>

<style>
</style>
