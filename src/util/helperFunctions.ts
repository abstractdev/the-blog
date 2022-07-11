export function formatDate(isoString: string | undefined) {
  const msSinceEpoch = Date.parse(isoString!);
  return new Date(msSinceEpoch).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
export function formatShortDate(isoString: string | undefined) {
  const msSinceEpoch = Date.parse(isoString!);
  return new Date(msSinceEpoch).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

export function formatTitle(string: string | undefined) {
  return string!.replace(/-/g, " ");
}
