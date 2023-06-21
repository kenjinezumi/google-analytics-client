// src/infrastructure/azureBlobStorage.js

const { BlobServiceClient } = require("@azure/storage-blob");
const { accountName, containerName, credential, secretClient } = require("../config/azureConfig");

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
    await blockBlobClient.uploadData(fileContent, {
      blobHTTPHeaders: { blobContentType: "application/json" },
    });
  }
}

module.exports = AzureBlobStorage;
