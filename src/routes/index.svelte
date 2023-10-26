<script>
  import { writable } from 'svelte/store';
  import Home from '$lib/Home.svelte';
  import Share from '$lib/Share.svelte';
  
  let screen = 'one'; // can be 'one', 'two', or 'three'
  let shared = writable(false);
</script>

<style>
  /* General styling for the main container and page */
  .app-container {
    max-width: 800px;
  }
</style>

<div class="app-container">
  {#if screen === 'one'}
    <Home bind:screen={screen} />
  {:else if screen === 'two'}
    <Share bind:screen={screen} />
  {:else}
    <Home shared={$shared} bind:screen={screen} />
  {/if}
</div>
