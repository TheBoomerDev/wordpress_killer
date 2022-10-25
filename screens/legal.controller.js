
const tools = require("./features/common/tools")

exports.getLegal = async (req, res, next) => {
  const data = {}
  res.render('legal_policy', data);
}

exports.getTerms = async (req, res, next) => {
  const data = {}
  res.render('legal_terms', data);
}

