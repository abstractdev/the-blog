export function formatDate(isoString: string | undefined) {
  const msSinceEpoch = Date.parse(isoString!);
  return new Date(msSinceEpoch).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTitle(string: string | undefined) {
  return string!.replace(/-/g, " ");
}
