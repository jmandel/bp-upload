<script lang="ts">
  import "../app.css";
</script>

<main>
  <slot />
</main>
<br />
<footer>
  <!-- svelte-ignore a11y-missing-attribute -->
  <img src="./logo2.png" />
  SMART on FHIR, {new Date().toISOString().slice(0, 4)}
</footer>

<style>
  main {
    min-height: calc(100% - 20em);
    padding-top: 1px;
  }
  footer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    max-width: 25vmin;
    max-height: 25vmin;
    display: block;
  }
</style>
