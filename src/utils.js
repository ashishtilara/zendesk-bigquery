const fs = require('fs');
const { Storage } = require('@google-cloud/storage');
const { BigQuery } = require('@google-cloud/bigquery');

const mod = {};

/**
 * @param resource
 * @returns {string}
 */
mod.getFileName = (resource) => {
  const timestamp = new Date().getTime();
  return `${resource}-${timestamp}.json`;
};

/**
 * @param client
 * @param resourceName
 */
mod.downloadResource = (client, resourceName = 'tickets') => new Promise((resolve, reject) => {
  client[resourceName].list((err, req, result) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(result.map(v => JSON.stringify(v)).join('\n'));
  });
});

/**
 * @param content
 * @param filePath
 * @returns {Promise<any>}
 */
mod.saveFile = (content, filePath) => new Promise((resolve, reject) => {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(filePath);
  });
});

/**
 * @param config
 * @param cloudStorageFilePath
 * @param localFilepath
 * @returns {Promise<string | never>}
 */
mod.uploadToCloudStorage = (config, cloudStorageFilePath, localFilepath) => {
  // Creates a client
  const storage = new Storage(config);

  // Uploads a local file to the bucket
  return storage
    .bucket(config.bucket)
    .upload(localFilepath, { destination: cloudStorageFilePath })
    .then(() => `gs://${config.bucket}/${cloudStorageFilePath}`);
};

/**
 * @param config
 * @param cloudStorageFilePath
 * @returns {PromiseLike<T | never> | Promise<T | never>}
 */
mod.loadToBigQuery = (config, cloudStorageFilePath) => {
  const bq = new BigQuery(config);
  const options = {
    configuration: {
      load: {
        sourceUris: [
          cloudStorageFilePath,
        ],
        destinationTable: {
          projectId: config.projectId,
          datasetId: config.datasetId,
          tableId: config.tableId,
        },
        sourceFormat: 'NEWLINE_DELIMITED_JSON',
        createDisposition: 'CREATE_IF_NEEDED',
        writeDisposition: 'WRITE_TRUNCATE',
        autodetect: true,
      },
    },
  };
  return bq.createJob(options)
    .then(data => data[0].id);
};

module.exports = mod;
