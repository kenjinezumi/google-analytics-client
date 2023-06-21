// src/domain/backfiller.js

const AnalyticsFetcher = require("./analyticsFetcher");
const BlobUploader = require("./blobUploader");
const logger = require("../infrastructure/logger/winstonLogger");

class Backfiller {
  constructor(keyFilePath, viewId, accountName, containerName) {
    this.analyticsFetcher = new AnalyticsFetcher(keyFilePath, viewId);
    this.blobUploader = new BlobUploader(accountName, containerName);
  }

  async backfillAnalyticsData(startDate, endDate) {
    try {
      this.validateDates(startDate, endDate);

      const analyticsData = await this.analyticsFetcher.fetchAnalyticsData(startDate, endDate);
      this.validateAnalyticsData(analyticsData);

      const formattedStartDate = startDate.replace(/-/g, "_");
      const formattedEndDate = endDate.replace(/-/g, "_");
      const fileName = `kompass_analytics_${formattedStartDate}_${formattedEndDate}.json`;

      await this.blobUploader.uploadAnalyticsData(fileName, analyticsData);

      logger.info(`Backfilled analytics data stored for dates ${startDate} to ${endDate}`);
    } catch (error) {
      logger.error("Error backfilling analytics data:", error);
      throw error;
    }
  }

  validateDates(startDate, endDate) {
    if (!startDate || !endDate) {
      throw new Error("Start date and end date are required.");
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (isNaN(startDateObj) || isNaN(endDateObj)) {
      throw new Error("Invalid date format. Please provide dates in the format YYYY-MM-DD.");
    }

    if (startDateObj > endDateObj) {
      throw new Error("Start date must be before end date.");
    }
  }

  validateAnalyticsData(data) {
    // Perform any additional validation on the analytics data if needed
    if (!data || !data.length) {
      throw new Error("No analytics data received.");
    }
  }
}

module.exports = Backfiller;
