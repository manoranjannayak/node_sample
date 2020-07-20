module.exports = {
  development: {
    port: 2000, // assign your own port no
    mongoUri: 'mongodb://localhost:27017/node_sample',
    logs: 'dev',
  },
  production: {
    port: 2000, // assign your own port no
    mongoUri: 'mongodb://localhost:27017/databaseName',
    logs:'prod'
  },
}