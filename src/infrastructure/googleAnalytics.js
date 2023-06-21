// src/infrastructure/googleAnalytics.js

const { google } = require("googleapis");
const { secretClient } = require("../config/azureConfig");

class GoogleAnalytics {
  constructor(keyVaultSecretName, viewId) {
    this.keyVaultSecretName = keyVaultSecretName;
    this.viewId = viewId;
    this.jwtClient = null;
    this.analyticsReporting = null;
  }

  async initialize() {
    const keyFileUrl = await secretClient.getSecret(this.keyVaultSecretName);
    const keyFilePath = keyFileUrl.value;
    
    this.jwtClient = new google.auth.JWT({
      keyFile: keyFilePath,
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
    });
    this.analyticsReporting = google.analyticsreporting({
      version: "v4",
      auth: this.jwtClient,
    });
  }

  async fetchAnalyticsData(startDate, endDate) {
    if (!this.jwtClient || !this.analyticsReporting) {
      await this.initialize();
    }

    const response = await this.analyticsReporting.reports.batchGet({
      requestBody: {
        reportRequests: [
          {
            viewId: this.viewId,
            dateRanges: [
              {
                startDate,
                endDate,
              },
            ],
            metrics: [
              {
                expression: "ga:sessions",
              },
              {
                expression: "ga:users",
              },
            ],
            dimensions: [
              {
                name: "ga:date",
              },
            ],
          },
        ],
      },
    });

    return response.data;
  }
}

module.exports = GoogleAnalytics;
