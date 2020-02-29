require('dotenv').config()

function generateDefinition () {
  const d = {
    SECRET: process.env.SECRET,
    ENDPOINT: process.env.ENDPOINT
  }
  for (const k in d) d[k] = JSON.stringify(d[k])
  return d
}

exports.generateDefinition = generateDefinition
