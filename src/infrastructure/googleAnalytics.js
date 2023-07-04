const createConfig = require("../config/googleAnalyticsConfig");
const logger = require("./logger");

const {BetaAnalyticsDataClient} = require('@google-analytics/data');
const analyticsDataClient = new BetaAnalyticsDataClient();

class GoogleAnalytics {
  constructor(propertyId) {
    this.propertyId = propertyId;


  }

  async fetchAnalyticsData(startDate, endDate) {
    const config =  createConfig(this.propertyId, startDate, endDate);
    console.log(config)

    try {
      
      logger.info('Starting to fetch analytics data');
  
      const [response] = await analyticsDataClient.runReport(config);

      return JSON.stringify({
        'key':1
      });
    } catch (error) {
      logger.error(`Error fetching analytics data: ${error.message}`);
      throw error;
    }
  }
  
}

module.exports = GoogleAnalytics;
