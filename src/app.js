// src/app.js

const express = require("express");
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const AnalyticsService = require("./domain/analyticsService");
const logger = require("./infrastructure/logger/winstonLogger");

const app = express();

// Azure Key Vault configuration
const keyVaultName = process.env.AZURE_KEYVAULT_NAME;
const credential = new DefaultAzureCredential();
const secretClient = new SecretClient(`https://${keyVaultName}.vault.azure.net`, credential);

// Azure Blob Storage configuration
const azureBlobStorageAccountName = process.env.AZURE_BLOB_STORAGE_ACCOUNT_NAME;
const azureBlobStorageContainerName = process.env.AZURE_BLOB_STORAGE_CONTAINER_NAME;

app.get("/fetch-analytics-data", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    // Retrieve Google Analytics key file path from Azure Key Vault
    const googleAnalyticsKeyFilePath = await secretClient.getSecret(process.env.GOOGLE_ANALYTICS_KEY_FILE_SECRET_NAME);

    // Initialize AnalyticsService
    const analyticsService = new AnalyticsService(
      googleAnalyticsKeyFilePath.value,
      process.env.GOOGLE_ANALYTICS_VIEW_ID,
      azureBlobStorageAccountName,
      azureBlobStorageContainerName
    );

    // Fetch and store analytics data
    await analyticsService.fetchAndStoreAnalyticsData(startDate, endDate);

    res.send("Analytics data fetched and stored successfully.");
  } catch (error) {
    logger.error("Error fetching and storing analytics data:", error);
    res.status(500).send("An error occurred while fetching and storing analytics data.");
  }
});

module.exports = app;
