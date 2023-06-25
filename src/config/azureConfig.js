const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const logger = require("../infrastructure/logger");

require('dotenv').config();

const keyVaultName = process.env.AZURE_KEYVAULT_NAME;
const credential = new DefaultAzureCredential();

const secretClient = new SecretClient(
  `https://${keyVaultName}.vault.azure.net`,
  credential
);


module.exports = {
  accountName: process.env.AZURE_BLOB_STORAGE_ACCOUNT_NAME,
  containerName: process.env.AZURE_BLOB_STORAGE_CONTAINER_NAME,
  credential,
  secretClient,
};
