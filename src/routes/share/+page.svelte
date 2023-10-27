<script>
  import { bpStore } from "$lib/bpStore.js";
  import { authorize, smart } from "$lib/smartStore";

  let tiles =  [{
    logo: "clinic-1.png",
    name: "SMART Sandbox"
  },{
    logo: "clinic-2.png",
    name: "FHIR Candle"
  },{
    logo: "clinic-3.png",
    name: "Associated Physicians"
  },{
    logo: "clinic-4.png",
    name: "General Hospital"
  }]

  function connect() {
    authorize({
      redirectUri: "upload",
      iss:
        "https://launch.smarthealthit.org/v/r4/sim/WzMsIiIsIiIsIkFVVE8iLDEsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMV0/fhir",
      clientId: "whatever",
      scope: "launch/patient offline_access openid fhirUser",
    });
  }

</script>

<h2>Share With Healthcare Provider</h2>

<p>
  You're about to share {$bpStore.length} vital sign{$bpStore.length !== 1
    ? "s"
    : ""}
</p>
<div class="tiles-container">
{#each tiles   as tile, i}
  <div class="tile" on:click={connect}>
    <img class="tile-logo" src={tile.logo} alt="logo"/>
    <div class="title">{tile.name}</div>
    <button on:click={connect}>Share</button>
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
    cursor: pointer;
    position: relative;
  }

  .tile:hover::after {
    content: ""; /* Empty content to generate the pseudo-element */
    position: absolute; /* Position the overlay on top of the div */
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 0, 0.05); /* Yellow tint with 30% opacity */
    z-index: 1; /* Place the overlay above the div's content */
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
</style>
