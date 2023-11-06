<script>
  import EndpointEditor from "$lib/EndpointEditor.svelte";
import { bpStore } from "$lib/bpStore.js";
  import { authorize, smart } from "$lib/smartStore";
  import tiles from "$lib/tileStore.js";
  

  function connect(id) {
    console.log("COnnect", id)
    authorize($tiles[id].fhirConnection);
  }

  let editing = null;
  function edit(id) {
    editing =  id;
  }
</script>

<h2>Share With Healthcare Provider</h2>

<p>
  You're about to share {$bpStore.length} vital sign{$bpStore.length !== 1
    ? "s"
    : ""}
</p>
<div class="tiles-container">
{#each $tiles   as tile, i}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="tile">
    <img class="tile-logo" src={tile.logo} alt="logo"/>
    <div class="title">{tile.name}</div>
    {#if editing !== i}
      <button class="edit" on:click={(event) => edit(i)}>✎</button>
      <button on:click={() => connect(i)}>Share</button>
    {:else}
      <EndpointEditor bind:tile bind:editing/>
    {/if} 
  </div>
{/each}
</div>

<style>
  /* Styling for ScreenTwo component */
  .tiles-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2rem;
  }

  .tile {
    flex: 1 1;
    padding: 1rem;
    border: 1px solid #ccc;
    text-align: center;
    position: relative;
  }

  .tile-logo {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    background-color: #eee; /* Placeholder style */
  }
  .title {
    margin-bottom:.2em;
  }

 .tile:hover::after {
     content: ""; /* Empty content to generate the pseudo-element */
     position: absolute; /* Position the overlay on top of the div */
     top: 0;
     right: 0;
     bottom: 0;
     left: 0;
     background-color: rgba(255, 255, 0, 0.05); /* Yellow tint with 30% opacity */
     z-index: -1; /* Place the overlay above the div's content */
 }

 button.edit {
  position: absolute;
  top: 0px;
  right: 0px;
 }


</style>

