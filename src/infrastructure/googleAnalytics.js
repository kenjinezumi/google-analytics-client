const { google } = require("googleapis");
const fs = require("fs");
const logger = require("./logger");

class GoogleAnalytics {
  constructor(keyFilePath, propertyId) {
    this.keyFilePath = keyFilePath;
    this.propertyId = propertyId;
    this.jwtClient = null;
    this.analyticsData = null;
  }

  async initialize() {
    logger.info('Initializing the GA4 service');

    try {

      this.jwtClient = new google.auth.JWT({
        keyFile: this.keyFilePath,
        scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
      });

      this.analyticsData = google.analyticsdata({
        version: "v1beta",
        auth: this.jwtClient,
      });

      logger.info('Initialization of the GA4 service completed');
    } catch (error) {
      logger.error(`Error initializing the GA4 service: ${error.message}`);
      throw error;
    }
  }

  async fetchAnalyticsData(startDate, endDate) {
    try {
      if (!this.jwtClient || !this.analyticsData) {
        await this.initialize();
      }
      logger.info('Starting to fetch analytics data');

      const response = await this.analyticsData.properties.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [
          {
            startDate,
            endDate,
          },
        ],
        dimensions: [
          {
            name: "date",
          },
        ],
        metrics: [
          {
            name: "sessions",
          },
          {
            name: "users",
          },
        ],
      });

      logger.info('End of fetching analytics data');

      return response.data;
    } catch (error) {
      logger.error(`Error fetching analytics data: ${error.message}`);
      throw error;
    }
  }
}

module.exports = GoogleAnalytics;
