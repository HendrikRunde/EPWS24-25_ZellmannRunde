const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'src',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

