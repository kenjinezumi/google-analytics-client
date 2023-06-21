// src/domain/analyticsFetcher.js

const GoogleAnalytics = require("../infrastructure/googleAnalytics");
const logger = require("../infrastructure/logger/winstonLogger");

class AnalyticsFetcher {
  constructor(keyFilePath, viewId) {
    this.googleAnalytics = new GoogleAnalytics(keyFilePath, viewId);
  }

  async fetchAnalyticsData(startDate, endDate) {
    try {
      const analyticsData = await this.googleAnalytics.fetchAnalyticsData(startDate, endDate);
      logger.info(`Analytics data fetched for dates ${startDate} to ${endDate}`);
      return analyticsData;
    } catch (error) {
      logger.error("Error fetching analytics data:", error);
      throw error;
    }
  }
}

module.exports = AnalyticsFetcher;
