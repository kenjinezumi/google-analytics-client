
## GA Analytics Client
The GA Analytics Client is an Express application that allows you to query and fetch Google Analytics data. With this app, you can easily retrieve important metrics and insights from your Google Analytics account programmatically.

## Features
- Query and fetch Google Analytics data using the Google Analytics Reporting API.
- Retrieve metrics such as sessions, users, pageviews, and more.
- Specify a date range for the analytics data to be fetched.
- Store the fetched analytics data in Azure Blob Storage for further analysis or reporting.

## Prerequisites

Before running this application, ensure you have the following:

- Node.js (version 20.3.0)
- Azure Blob Storage account
- Google Analytics account and credentials
- Azure service account credentials
- GCP service account and credentials 

## Exporting GOOGLE_APP_CREDENTIALS for GCP
To interact with Google Cloud Platform (GCP) , you need to provide the authentication credentials. One common way to authenticate is by using a service account key file, which contains the necessary information to authenticate your application.

Follow the steps below to export the GOOGLE_APP_CREDENTIALS  environment variable with the path to your service account key file.

1. Go to the Google Cloud Console.

2. Select your project or create a new one.

3. In the navigation menu, click on the IAM & Admin -> Service Accounts.

4. Locate the service account you want to use or create a new one.

5. Click on the Actions button (vertical ellipsis) for the desired service account and select Create key.

6. Choose the key type as JSON and click on the Create button. The service account key file will be downloaded to your local machine.

7. Move the downloaded service account key file to a secure location in your project directory.

8. In your terminal or command prompt, navigate to your project directory.

9. Export the google_app_credentials environment variable with the path to your service account key file using one of the following methods:

Linux / macOS

```
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
```

Windows (PowerShell)
```
$env:GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
```

10. Add the GOOGLE_APPLICATION_CREDENTIALS to the `.env` file

## Setting Up Google Analytics env variable

1. Go to the Google Analytics website and sign in with your Google account.

2. Select the appropriate Google Analytics account and property from the account list.

3. In the left navigation menu, click on the Admin tab.

4. In the Property column, click on the Property Settings option.

5. Copy the property ID

6. Set up the environment variables in the `.env` file:

GOOGLE_ANALYTICS_PROPERTY_ID=

## Setting Up Azure Service Account

To interact with Azure Blob Storage, you will need a service account with appropriate credentials and permissions. Follow these steps to set up the service account:

1. Sign in to the Azure portal (https://portal.azure.com).

2. Create a new Azure Storage account or use an existing one.

3. Generate a new access key for the storage account:

   - Go to the "Access keys" section of the storage account.
   - Click on "Generate SAS and connection string".
   - Save the access key value for later use.

4. Provide the necessary access and permissions to the service account for the Blob Storage container(s) you want to use.

5. Obtain the following information from the Azure portal:

   - Azure Blob Storage account name
   - Azure Blob Storage container name
   - Azure keyvault name

6. Set up the environment variables in the `.env` file:

AZURE_KEYVAULT_NAME=
AZURE_BLOB_STORAGE_ACCOUNT_NAME=
AZURE_BLOB_STORAGE_CONTAINER_NAME=

Your final .env file should look like that: 

AZURE_KEYVAULT_NAME=
AZURE_BLOB_STORAGE_ACCOUNT_NAME=
AZURE_BLOB_STORAGE_CONTAINER_NAME=
GOOGLE_ANALYTICS_PROPERTY_ID=
GOOGLE_APPLICATION_CREDENTIALS
PORT=

## Installation

1. Install the dependencies 

```
npm install 
```

2. Start the server 

```
npm start
```

## Contributions
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.