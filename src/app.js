const express = require("express");
const { BlobServiceClient } = require("@azure/storage-blob");
const AnalyticsService = require("./domain/analyticsService");
const logger = require("./infrastructure/logger");

const app = express();

// Azure Blob Storage configuration
const azureBlobStorageConnectionString = process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING;
const azureBlobStorageContainerName = process.env.AZURE_BLOB_STORAGE_CONTAINER_NAME;

// Fetch Analytics Data Route
app.get("/fetch-analytics-data", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    // Initialize AnalyticsService
    const analyticsService = new AnalyticsService(
      process.env.GOOGLE_KEY_FILE, // Replace with the path or contents of your service account key file
      process.env.GOOGLE_ANALYTICS_VIEW_ID,
      azureBlobStorageConnectionString,
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

// Start the server
const server = app.listen(0, () => {
  const port = server.address().port;
  console.log(`Server is running on port ${port}`);
  console.log(`Open your web browser and navigate to http://localhost:${port} to access the server.`);

});
