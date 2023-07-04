const { expect } = require("chai");
const sinon = require("sinon");
const AnalyticsFetcher = require("../../src/domain/analyticsFetcher");
const GoogleAnalytics = require("../../src/infrastructure/googleAnalytics");
const logger = require("../../src/infrastructure/logger");

describe("AnalyticsFetcher", () => {
  describe("fetchAnalyticsData", () => {
    it("should fetch analytics data from Google Analytics", async () => {
      // Stub the GoogleAnalytics class and its fetchAnalyticsData method
      const propertyId = "YOUR_PROPERTY_ID";
      const startDate = "YOUR_START_DATE";
      const endDate = "YOUR_END_DATE";
      const analyticsData = "EXPECTED_ANALYTICS_DATA";

      const fetchAnalyticsDataStub = sinon.stub(GoogleAnalytics.prototype, "fetchAnalyticsData").resolves(analyticsData);

      // Create an instance of AnalyticsFetcher
      const analyticsFetcher = new AnalyticsFetcher(propertyId);

      // Call the fetchAnalyticsData method
      const result = await analyticsFetcher.fetchAnalyticsData(startDate, endDate);

      // Verify the expected result
      expect(result).to.equal(analyticsData);

      // Restore the stub
      fetchAnalyticsDataStub.restore();
    });

    it("should throw an error if fetching analytics data fails", async () => {
      // Stub the GoogleAnalytics class and its fetchAnalyticsData method to simulate an error
      const propertyId = "YOUR_PROPERTY_ID";
      const startDate = "YOUR_START_DATE";
      const endDate = "YOUR_END_DATE";
      const error = new Error("Failed to fetch analytics data");

      const fetchAnalyticsDataStub = sinon.stub(GoogleAnalytics.prototype, "fetchAnalyticsData").rejects(error);
      const loggerErrorStub = sinon.stub(logger, "error");

      // Create an instance of AnalyticsFetcher
      const analyticsFetcher = new AnalyticsFetcher(propertyId);

      // Call the fetchAnalyticsData method and expect it to throw an error
      try {
        await analyticsFetcher.fetchAnalyticsData(startDate, endDate);
        // If the above line doesn't throw an error, fail the test
        throw new Error("Expected an error to be thrown");
      } catch (err) {
        // Verify that the error was logged
        sinon.assert.calledWith(loggerErrorStub, "Error fetching analytics data:", error);
      }

      // Restore the stubs
      fetchAnalyticsDataStub.restore();
      loggerErrorStub.restore();
    });
  });
});
