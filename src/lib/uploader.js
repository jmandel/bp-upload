const extractBPValues = (vs) => {
  if (vs.component.length !== 2) {
    throw new Error(
      "Expected exactly two components for systolic and diastolic blood pressures."
    );
  }

  const systolic = vs.component.find((comp) =>
    comp.code.coding.some((c) => c.code === "8480-6")
  ).valueQuantity.value;
  const diastolic = vs.component.find((comp) =>
    comp.code.coding.some((c) => c.code === "8462-4")
  ).valueQuantity.value;

  return { systolic, diastolic };
};

const areVitalSignsFromSameDayWithSameValues = (vs1, vs2) => {
  const date1 = new Date(vs1.effectiveDateTime || vs1.effectivePeriod.start);
  const date2 = new Date(vs2.effectiveDateTime || vs2.effectivePeriod.start);

  const sameDay =
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDate() === date2.getUTCDate();

  const bp1 = extractBPValues(vs1);
  const bp2 = extractBPValues(vs2);
  const mmHgClose = (x, y) => Math.abs(x - y) < 1;

  return (
    sameDay &&
    mmHgClose(bp1.systolic, bp2.systolic) &&
    mmHgClose(bp1.diastolic, bp2.diastolic)
  );
};

const filterRedundantRecords = (newVitalSigns, existingVitalSigns) => {
  return newVitalSigns.filter(
    (nvs) =>
      !existingVitalSigns.some((evs) =>
        areVitalSignsFromSameDayWithSameValues(nvs, evs)
      )
  );
};

const calculateDateRange = (vitalSigns) => {
  const dates = vitalSigns.map(
    (vs) => new Date(vs.effectiveDateTime || vs.effectivePeriod.start)
  );

  const bounds = {
    start: new Date(Math.min.apply(null, dates)),
    end: new Date(Math.max.apply(null, dates)),
  };

  // HAPI bug in SMART sandbox with "le" bounds on search
  bounds.end.setDate(bounds.end.getDate() + 1);
  return {
    start: bounds.start.toISOString().slice(0, 10),
    end: bounds.end.toISOString().slice(0, 10),
  };
};

const makeObservation = ({ patientId, systolic, diastolic, dateTime }) => ({
  resourceType: "Observation",
  status: "final",
  category: [
    {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/observation-category",
          code: "vital-signs",
          display: "Vital Signs",
        },
      ],
      text: "Vital Signs",
    },
  ],
  code: {
    coding: [
      {
        system: "http://loinc.org",
        code: "85354-9",
        display: "Blood pressure panel with all children optional",
      },
    ],
    text: "Blood pressure systolic and diastolic",
  },
  subject: {
    reference: `Patient/${patientId}`,
  },
  effectiveDateTime: new Date(dateTime).toISOString(),
  component: [
    {
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "8480-6",
            display: "Systolic blood pressure",
          },
        ],
        text: "Systolic blood pressure",
      },
      valueQuantity: {
        value: systolic,
        unit: "mmHg",
        system: "http://unitsofmeasure.org",
        code: "mm[Hg]",
      },
    },
    {
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "8462-4",
            display: "Diastolic blood pressure",
          },
        ],
        text: "Diastolic blood pressure",
      },
      valueQuantity: {
        value: diastolic,
        unit: "mmHg",
        system: "http://unitsofmeasure.org",
        code: "mm[Hg]",
      },
    },
  ],
});

export const handleVitalSignsSubmission = async (
  client,
  newVitalSignInputs,
  status
) => {
  console.log("HAndlng");
  const newVitalSigns = newVitalSignInputs
    .filter((v) => !!v.dateTime)
    .filter((v) => v.saved)
    .filter((v) => !v.isEditing)
    .map((vs) => makeObservation({ patientId: client.patient.id, ...vs }));
  if (newVitalSigns.length === 0) {
    status.set("No BPs Found");
    return;
  }
  status.set("Converted");
  const dateRange = calculateDateRange(newVitalSigns);
  status.set("Fetching existing vitals");
  const existingVitalSigns = await client.patient.request(
    `Observation?code=85354-9&date=ge${dateRange.start}&date=le${dateRange.end}`
  );
  const vitalSignsToSubmit = filterRedundantRecords(
    newVitalSigns,
    existingVitalSigns?.entry?.map((e) => e.resource) ?? []
  );
  if (vitalSignsToSubmit.length === 0) {
    status.set("All BPs already exist on server");
  }
  let i = 0;
  for (const vs of vitalSignsToSubmit) {
    status.set("Uploading " + ++i);
    await client.create(vs);
  }
  status.set("Done");
};
