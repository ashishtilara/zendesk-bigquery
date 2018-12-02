module.exports = {
  zendesk: {
    username: process.env.ZENDESK_USERNAME,
    token: process.env.ZENDESK_TOKEN,
    remoteUri: `https://${process.env.ZENDESK_URI}/api/v2`,
  },
  googleCloud: {
    bucket: process.env.GOOGLECLOUD_BUCKET,
    prefix: process.env.GOOGLECLOUD_PREFIX,
    projectId: process.env.GOOGLECLOUD_PROJECTID,
    datasetId: process.env.GOOGLECLOUD_DATASETID,
    tableId: process.env.GOOGLECLOUD_TABLEID,
    credentials: {
      private_key: Buffer.from(process.env.GOOGLECLOUD_CRED_PRIVATEKEY || '', 'base64').toString(),
      client_email: process.env.GOOGLECLOUD_CRED_CLIENTEMAIL,
    },
  },
};
