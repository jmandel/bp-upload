<script>
  import Papa from "papaparse";
  import { bpStore } from "$lib/bpStore.js";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";

  export function parseOmronReport(csvContent) {
    const result = [];

    Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
      complete: (parsedData) => {
        parsedData.data.forEach((row) => {
          const date = new Date(`${row["Date"]} ${row["Time"]}`);
          const systolic = parseInt(row["Systolic (mmHg)"], 10);
          const diastolic = parseInt(row["Diastolic (mmHg)"], 10);
          const dateTime = date.toISOString();

          result.push({
            systolic,
            diastolic,
            dateTime,
            date: dateTime.slice(0, 10),
            time: dateTime.slice(11, 16),
            saved: true,
            isEditing: false,
          });
        });
      },
    });

    return result;
  }

  let csv = `
"Date","Time","Systolic (mmHg)","Diastolic (mmHg)","Pulse (bpm)","Symptoms","Consumed","TruRead","Notes"
"Jul 6 2023","10:43 am","120","80","75","-","-","-","jogging in my chair with a fan on"
`.trim();

(async () => {

    const keys = await caches.keys();
    const mediaCache = await caches.open(
      keys.filter((key) => key.startsWith('media'))[0],
    );
    const vitalsCsv = await mediaCache.match('vitals-csv');
    if (vitalsCsv) {
      const blob = await vitalsCsv.blob();
      await mediaCache.delete('vitals-image');
      const csv = await blob.text()
      let results = parseOmronReport(csv);
      bpStore.set(results);
      goto(`${base}/`);
    }
})()
</script>
