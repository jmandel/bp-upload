<script>
  import { base } from "$app/paths";
  import { bpStore } from "$lib/bpStore.js";
  import { smart } from "$lib/smartStore";
  import { handleVitalSignsSubmission } from "$lib/uploader";
  import { writable } from "svelte/store";

  let status = writable("Initializing...");

  $: submitTo($smart);

  function submitTo($smart) {
    $smart && handleVitalSignsSubmission($smart, $bpStore, status);
    bpStore.update((bps) =>
      bps.map((bp) => (bp.saved ? { ...bp, submitted: true } : bp))
    );
  }

  $: console.log("STAT", $status);
</script>

<h2>Uploading BPs: {$bpStore.length}</h2>

<div>
  Status: <em>{$status}</em>
</div>

<a href="{base}/">Back to grid</a>
