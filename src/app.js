const express = require("express");
const AnalyticsService = require("./domain/analyticsService");
const logger = require("./infrastructure/logger");

require('dotenv').config();

const app = express();


// Log available API endpoints
function logEndpoints(portAddress) {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Route layer
      const route = middleware.route;
      routes.push({
        method: Object.keys(route.methods)[0].toUpperCase(),
        path: route.path,
      });
    } else if (middleware.name === "router") {
      // Router layer
      middleware.handle.stack.forEach((handler) => {
        const route = handler.route;
        routes.push({
          method: Object.keys(route.methods)[0].toUpperCase(),
          path: route.path,
        });
      });
    }
  });

  console.log("Available API endpoints:");
  routes.forEach((route) => {
    console.log(`${route.method} http://localhost:${portAddress}${route.path}`);
  });
}

// Fetch Analytics Data Route
app.get("/fetch", async (req, res) => {
  logger.info('Start of the get API to get GA data')
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 1);
  
  // Format start date as "YYYY-MM-DD"
  const formattedStartDate = startDate.toISOString().split('T')[0];
  
  // Format today's date as "YYYY-MM-DD"
  const formattedEndDate = today.toISOString().split('T')[0];

  try {
    // Initialize AnalyticsService
    const analyticsService = new AnalyticsService(
      process.env.GOOGLE_ANALYTICS_PROPERTY_ID,
      process.env.AZURE_BLOB_STORAGE_ACCOUNT_NAME,
      process.env.AZURE_BLOB_STORAGE_CONTAINER_NAME
    );


    await analyticsService.fetchAndStoreAnalyticsData(formattedStartDate, formattedEndDate);

    res.send("Analytics data fetched and stored successfully.");
  } catch (error) {
    logger.error("Error fetching and storing analytics data:", error);
    res.status(500).send("An error occurred while fetching and storing analytics data.");
  }
});

// Start the server
const port = process.env.PORT || 8080; 
const server = app.listen(port, () => {
  const port = server.address().port;
  console.log(`Server is running on port ${port}`);
  console.log(`Open your web browser and navigate to http://localhost:${port} to access the server.`);
  logEndpoints(port);

});

function getStartEndDates(){

  
}
