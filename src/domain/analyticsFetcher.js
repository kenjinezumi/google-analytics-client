// src/domain/analyticsFetcher.js

const GoogleAnalytics = require("../infrastructure/googleAnalytics");
const logger = require("../infrastructure/logger");

class AnalyticsFetcher {
  constructor(propertyId) {
    this.googleAnalytics = new GoogleAnalytics(propertyId);
  }

  async fetchAnalyticsData(startDate, endDate) {
    try {
      const analyticsData = await this.googleAnalytics.fetchAnalyticsData(startDate, endDate);
      return analyticsData;
    } catch (error) {
      logger.error("Error fetching analytics data:", error);
      throw error;
    }
  }
}

module.exports = AnalyticsFetcher;
