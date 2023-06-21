// src/domain/blobUploader.js

const AzureBlobStorage = require("../infrastructure/azureBlobStorage");
const logger = require("../infrastructure/logger/winstonLogger");

class BlobUploader {
  constructor(accountName, containerName) {
    this.azureBlobStorage = new AzureBlobStorage(accountName, containerName);
  }

  async uploadAnalyticsData(fileName, analyticsData) {
    try {
      await this.azureBlobStorage.uploadFile(fileName, JSON.stringify(analyticsData));
      logger.info(`Analytics data uploaded to Azure Blob Storage: ${fileName}`);
    } catch (error) {
      logger.error(`Error uploading analytics data to Azure Blob Storage:`, error);
      throw error;
    }
  }
}

module.exports = BlobUploader;