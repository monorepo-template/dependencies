module.exports = function mapMapToRecord(map) {
  const record = Object.create(null);

  for (const [key, value] of Array.from(map.entries())) {
    record[key] = value;
  }

  return record;
};
