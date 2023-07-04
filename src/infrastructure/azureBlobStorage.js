// src/infrastructure/azureBlobStorage.js

const { BlobServiceClient } = require("@azure/storage-blob");
const { accountName, containerName, credential} = require("../config/azureConfig");
const logger = require("./logger");

class AzureBlobStorage {
  constructor() {
    this.blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      credential
    );
    this.containerClient = this.blobServiceClient.getContainerClient(containerName);
  }

  async uploadFile(fileName, fileContent) {
    const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.upload(fileContent, fileContent.length);
  }
}

module.exports = AzureBlobStorage;
