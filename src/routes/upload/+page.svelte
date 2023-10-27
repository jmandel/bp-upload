<script>
  import { onMount } from "svelte";
  import { bpStore } from "$lib/bpStore.js";
  import { authorize, smart } from "$lib/smartStore";
  import { handleVitalSignsSubmission } from "$lib/uploader";
  import { writable } from "svelte/store";

  let status = writable("Initializing...")

  $: submitTo($smart);

  function submitTo($smart) {
    $smart && handleVitalSignsSubmission($smart, $bpStore, status);
    bpStore.update(bps => bps.map(bp => bp.saved ? {...bp, submitted: true} : bp))
  }
  $: console.log("STAT", $status);
  console.log($bpStore[0])
</script>

<h2>Uploading BPs: {$bpStore.length} </h2>

<div>
Status: <em>{$status}</em>
</div>

<a href="/">Back to grid</a>