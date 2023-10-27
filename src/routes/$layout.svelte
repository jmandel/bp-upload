<script lang="ts">
	import '../app.css';
</script>

<main>
	<slot />
</main>
<br/>
<footer>
SMART on FHIR, {new Date().toISOString().slice(0,4)}
</footer>

<style>
</style>
