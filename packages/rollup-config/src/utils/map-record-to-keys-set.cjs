module.exports = function mapRecordToKeysSet(record) {
  return new Set(Object.keys(record));
};
