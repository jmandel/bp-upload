import { browser } from "$app/environment";
import { writable } from "svelte/store";

// let fhirclient = writable(null);
let fhirclient;

if (browser) {
  (async function () {
    await import("/static/fhir-client.js");
    console.log("B")
    fhirclient = window.FHIR.oauth2;
    try {
        smart.set(await fhirclient.ready());
    } catch(e) {
        console.log("No smart session")
    }
  })();
}
export let smart = writable(null);
export const authorize = (details) => fhirclient.authorize(details);