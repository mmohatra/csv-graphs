export function isDict(v) {
  return (
    typeof v === "object" &&
    v !== null &&
    !(v instanceof Array) &&
    !(v instanceof Date) &&
    !(v instanceof Error)
  );
}

export function getDataValidationErrors(data) {
  if (!Array.isArray(data)) {
    return "Data is not an array.";
  }

  if (data.length === 0) {
    return "Empty data set.";
  }

  if (!isDict(data[0])) {
    return "Data elements are not dictionary";
  }
  return null;
}
