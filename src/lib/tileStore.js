import { browser } from "$app/environment";
import { writable } from "svelte/store";

const tileStore = writable([]);
export default tileStore;

let defaultTiles = [
  {
    logo: "clinic-1.png",
    name: "SMART Sandbox",
    fhirConnection: {
      redirectUri: "upload",
      iss: "https://launch.smarthealthit.org/v/r4/sim/WzMsIiIsIiIsIkFVVE8iLDEsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMV0/fhir",
      clientId: "whatever",
      scope:
        "launch/patient offline_access patient/Patient.read patient/Observation.read patient/Observation.write",
    },
  },
  {
    logo: "clinic-2.png",
    name: "FHIR Candle",
    fhirConnection: {
      redirectUri: "upload",
      iss: "https://launch.smarthealthit.org/v/r4/sim/WzMsIiIsIiIsIkFVVE8iLDEsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMV0/fhir",
      clientId: "whatever",
      scope:
        "launch/patient offline_access patient/Patient.read patient/Observation.read patient/Observation.write",
    },
  },
  {
    logo: "clinic-3.png",
    name: "Associated Physicians",
    fhirConnection: {
      redirectUri: "upload",
      iss: "https://launch.smarthealthit.org/v/r4/sim/WzMsIiIsIiIsIkFVVE8iLDEsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMV0/fhir",
      clientId: "whatever",
      scope:
        "launch/patient offline_access patient/Patient.read patient/Observation.read patient/Observation.write",
    },
  },
  {
    logo: "clinic-4.png",
    name: "General Hospital",
    fhirConnection: {
      redirectUri: "upload",
      iss: "https://launch.smarthealthit.org/v/r4/sim/WzMsIiIsIiIsIkFVVE8iLDEsMCwwLCIiLCIiLCIiLCIiLCIiLCIiLCIiLDAsMV0/fhir",
      clientId: "whatever",
      scope:
        "launch/patient offline_access patient/Patient.read patient/Observation.read patient/Observation.write",
    },
  },
];

if (browser) {
  const savedTiles = JSON.parse(
    localStorage.getItem(`tileStore`) || JSON.stringify(defaultTiles)
  );
  tileStore.set(savedTiles);
  tileStore.subscribe((val) => {
    if (!val) return;
    console.log("new tiles", val)
    localStorage.setItem(`tileStore`, JSON.stringify(val));
  });
}
