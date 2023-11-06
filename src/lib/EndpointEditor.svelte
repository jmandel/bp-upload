<script>
export let tile;
export let editing;

let tileString;
function input(tile) {
    tileString = JSON.stringify(tile, null, 2)
}
function output(tileString) {
    try {
        tile = JSON.parse(tileString)
    } catch {}
}

$: input(tile)
// $: output(tileString)
</script>
<textarea bind:value={tileString}></textarea>
<button on:click={() => {output(tileString); editing = false}}>Save</button>

<style>
    textarea {
        height: 30em;
        width: 100%;
    }
</style>