require('dotenv').config()

function generateDefinition (dev) {
  const d = {
    SECRET: process.env.SECRET,
    ENDPOINT: process.env.ENDPOINT,
    BUILD: dev ? 'dev' : 'prod'
  }
  for (const k in d) d[k] = JSON.stringify(d[k])
  return d
}

exports.generateDefinition = generateDefinition
