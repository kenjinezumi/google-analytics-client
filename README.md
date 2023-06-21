## Prerequisites

Before running this application, ensure you have the following:

- Node.js (version 20.3.0)
- Azure Blob Storage account
- Google Analytics account and credentials
- Azure service account credentials

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
   - Azure Blob Storage access key
   - Azure Blob Storage container name

6. Set up the environment variables in the `.env` file:

