const fs = require("fs");

function getOffset(timeZone) {
  const now = new Date();

  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
  });

  const part = fmt.formatToParts(now).find(p => p.type === "timeZoneName")?.value;

  const match = part?.match(/GMT([+-]\d+)/);
  const hours = match ? parseInt(match[1], 10) : 1;

  const sign = hours >= 0 ? "+" : "-";
  const abs = String(Math.abs(hours)).padStart(2, "0");

  return `UTC${sign}${abs}:00`;
}

const output = {
  schemaVersion: 1,
  label: "📍 Odense, Denmark",
  message: getOffset("Europe/Copenhagen"),
  color: "blue",
  style: "flat-square"
};

fs.writeFileSync("timezone.json", JSON.stringify(output, null, 2));