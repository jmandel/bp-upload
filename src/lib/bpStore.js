import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const bpStore = writable([]);
if (browser) {
  const savedBps = JSON.parse(localStorage.getItem(`bpStore`) || `[]`);
  bpStore.set(savedBps);
  bpStore.subscribe((bps) => {
    if (!bps) return;
    localStorage.setItem(`bpStore`, JSON.stringify(bps.filter(bp=> bp.saved)));
  });
}
