export function formatDate(isoString: string) {
  const msSinceEpoch = Date.parse(isoString);
  return new Date(msSinceEpoch).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
