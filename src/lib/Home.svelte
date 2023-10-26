<script>
  import { bpStore } from './bpStore.js';
  export let screen;
  export let shared = false;

  let editingIndices = [];  // Tracks which rows are in "editing" mode

  function shareData() {
    console.log("Sharing")
    screen = 'two';
  }

  function addBP() {
    const bp = {
      systolic: '',
      diastolic: '',
      date: '',
      note: '',
      isEditing: true  // Indicates if this BP is in editing mode
    };
    bpStore.update(bps => {
      bps.push(bp);
      return bps;
    });
  }

  function saveBP(index) {
    bpStore.update(bps => {
      const bp = bps[index];
      bp.isEditing = false;  // Toggle off editing mode after saving
      return bps;
    });
  }

  function deleteBP(index) {
    bpStore.update(bps => {
      bps.splice(index, 1);
      return bps;
    });
  }

  function toggleEdit(index) {
    bpStore.update(bps => {
      const bp = bps[index];
      bp.isEditing = !bp.isEditing;
      return bps;
    });
  }
</script>



<h2>{shared ? 'Thank you for sharing your data' : 'Welcome'}</h2>

  <table>
    <thead>
      <tr>
        <th>Systolic</th>
        <th>Diastolic</th>
        <th>Date/Time</th>
        <th>Note</th>
        <th>Actions</th>
        {#if shared}
          <th>Shared</th>
        {/if}
      </tr>
    </thead>

<tbody>
  <tr>
    <td colspan="5">
      <button style="width: 100%" on:click={addBP}>Add New BP</button>
    </td>
    {#if shared}
      <td></td>
    {/if}
  </tr>
  <!-- Display BPs from the store -->
  {#each $bpStore as bp, index}
    {#if bp.isEditing}
      <tr>
        <td><input bind:value={bp.systolic} type="number" placeholder="Systolic"></td>
        <td><input bind:value={bp.diastolic} type="number" placeholder="Diastolic"></td>
        <td><input bind:value={bp.date} type="datetime-local"></td>
        <td><input bind:value={bp.note} type="text" placeholder="Note"></td>
        <td>
          <button on:click={() => saveBP(index)}>Save</button>
          <button on:click={() => deleteBP(index)}>Delete</button>
        </td>
        {#if shared}
          <td></td>
        {/if}
      </tr>
    {:else}
      <tr>
        <td>{bp.systolic}</td>
        <td>{bp.diastolic}</td>
        <td>{bp.date}</td>
        <td>{bp.note}</td>
        <td>
          <button on:click={() => toggleEdit(index)}>Edit</button>
          <button on:click={() => deleteBP(index)}>Delete</button>
        </td>
        {#if shared}
          <td><input type="checkbox" checked></td>
        {/if}
      </tr>
    {/if}
  {/each}
</tbody>
  </table>

<button on:click={shareData}>Share with Healthcare Provider</button>


<style>
  /* Styling for ScreenOne component */
  .table-container {
    margin-top: 2rem;
    border: 1px solid #ccc;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 0.5rem;
    border: 1px solid #ccc;
  }
</style>