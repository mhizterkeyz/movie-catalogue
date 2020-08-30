const parallelRequests = (...funcs) => Promise.all(funcs.map((func) => func()));

module.exports = {
  parallelRequests,
};
