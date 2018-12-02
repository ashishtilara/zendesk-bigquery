/* eslint-disable no-console */
const ZenDesk = require('node-zendesk');
const { zendesk, googleCloud } = require('./src/config');
const {
  downloadResource,
  saveFile,
  uploadToCloudStorage,
  loadToBigQuery,
  getFileName,
} = require('./src/utils');

module.exports.handler = async (event) => {
  const RESOURCE = event.resource || 'tickets';
  const zClient = ZenDesk.createClient(zendesk);

  return downloadResource(zClient)
    .then(content => saveFile(content, `/tmp/${getFileName(RESOURCE)}`))
    .then(filePath => uploadToCloudStorage(googleCloud, `${googleCloud.prefix}/${getFileName(RESOURCE)}`, filePath))
    .then(cloudStorageFilePath => loadToBigQuery(googleCloud, cloudStorageFilePath))
    .then(response => console.log(response));
};
