<script>
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { bpStore } from "$lib/bpStore.js";

  let newBpBox = [];
  addBP();

  console.log("BASE", base)
  function shareData() {
    goto(`${base}/share`);
  }

  function addBP() {
    const bp = {
      systolic: "",
      diastolic: "",
      date: "",
      time: "",
      note: "",
      isEditing: true,
      saved: false,
      uploaded: false,
    };
    bpStore.update((bps) => {
      bps.unshift(bp);
      return bps;
    });
    setTimeout(() => {
      newBpBox?.[0]?.focus();
    });
  }

  function saveBP(index) {
    bpStore.update((bps) => {
      const bp = bps[index];
      bp.isEditing = false; // Toggle off editing mode after saving
      bp.dateTime = bp.date + (bp.time ? "T" + bp.time : "");
      bp.saved = true;
      return bps;
    });
    if (index === 0) {
      addBP();
    }
  }

  function deleteBP(index) {
    bpStore.update((bps) => {
      bps.splice(index, 1);
      return bps;
    });
    if (index === 0) {
      addBP();
    }
  }

  function toggleEdit(index) {
    bpStore.update((bps) => {
      const bp = bps[index];
      bp.isEditing = !bp.isEditing;
      return bps;
    });
  }
</script>

<h2>Enter Your Blood Pressure Readings</h2>

<table>
  <thead>
    <tr>
      <th>Systolic</th>
      <th>Diastolic</th>
      <th>Date/Time</th>
      <th>Note</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    <!-- Display BPs from the store -->
    {#each $bpStore as bp, index}
      {#if bp.isEditing}
        <tr>
          <td
            ><input
              bind:this={newBpBox[index]}
              bind:value={bp.systolic}
              max="300"
              size="5"
              type="number"
              placeholder="Systolic"
            /></td
          >
          <td
            ><input
              bind:value={bp.diastolic}
              type="number"
              placeholder="Diastolic"
            /></td
          >
          <td
            ><input bind:value={bp.date} type="date" /><input
              bind:value={bp.time}
              type="time"
            /></td
          >
          <td><input bind:value={bp.note} type="text" placeholder="Note" /></td>
          <td>
            <button on:click={() => saveBP(index)}>Save</button>
            {#if index > 0}
              <button on:click={() => deleteBP(index)}>Delete</button>
            {/if}
          </td>
        </tr>
      {:else}
        <tr class:submitted={bp.submitted}>
          <td>{bp.systolic}</td>
          <td>{bp.diastolic}</td>
          <td>{bp.date}T{bp.time}</td>
          <td>{bp.note}</td>
          <td>
            <button on:click={() => toggleEdit(index)}>Edit</button>
            <button on:click={() => deleteBP(index)}>Delete</button>
          </td>
        </tr>
      {/if}
    {/each}
  </tbody>
</table>

<button on:click={shareData}>Share with Healthcare Provider</button>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }

  input[type="number"] {
    width: 3em;
  }

  tr.submitted {
    background: lightgreen;
  }

  th,
  td {
    padding: 0.5rem;
    border: 1px solid #ccc;
  }
</style>
