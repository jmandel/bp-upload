<script>
  export let screen;
  import { bpStore } from './bpStore.js';

  function goToScreenThree() {
    screen = 'three';
  }
</script>

<style>
  /* Styling for ScreenTwo component */
  .tiles-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .tile {
    flex: 1 1 30%;
    padding: 1rem;
    border: 1px solid #ccc;
    text-align: center;
  }
  
  .tile-logo {
    width: 60px;
    height: 60px;
    margin: 0 auto;
    background-color: #eee; /* Placeholder style */
  }
</style>

<h2>Share With Healthcare Provider</h2>

<p>You're about to share {$bpStore.length} vital sign{$bpStore.length !== 1 ? "s":""}</p>

<div class="tiles-container">
  <!-- Sample provider tile -->
  <div class="tile">
    <div class="tile-logo"></div>
    <div>Associated Physicians</div>
    <button on:click={goToScreenThree}>Share</button>
  </div>
  <div class="tile">
    <div class="tile-logo"></div>
    <div>Example Hospital</div>
    <button on:click={goToScreenThree}>Share</button>
  </div>
  <div class="tile">
    <div class="tile-logo"></div>
    <div>Local Clinic</div>
    <button on:click={goToScreenThree}>Share</button>
  </div>
  <!-- Add more tiles as needed -->
</div>
