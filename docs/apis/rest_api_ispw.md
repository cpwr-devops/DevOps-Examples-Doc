---
footer: MIT Licensed | Copyright © 2019 - Compuware | © Copyright 2019, 2020-2021 BMC Software, Inc.
---

# ISPW Rest API

To see the API Documentation on the internet, please visit our [Swagger REST API documentation](https://ispw.api.compuware.com/) for more details on the various APIs.

To access the APIs within your environment, go to the CES URL and select the `API Documentation` option in the Help menu (see below)

![CES Doc](./images/CES_api.png)

## Accessing the API Documentation

ISPW's Rest API is documented in [Swagger](https://swagger.io/solutions/api-documentation/), a commonly used format.  The Rest API is hosted in Compuware Enterprise Services (CES), which connects to the underlying mainframe products to perform various actions on the mainframe.  

![Swagger Doc](./images/Swagger.png)

The APIs use a token based authentication for securely accessing the mainframe.  Please visit the [CES Credentials](../tool_configuration/CES_credentials_token.md) for more information about setting up a Personal Access Token for the APIs.

## Example of REST API usage

For an example of how to call the Rest API from a scripting language, please see this [Powershell script](https://github.com/cpwr-devops/DevOps-Examples/blob/master/src/misc-examples/AzureDevOps/Powershell/ISPW_Operations.ps1) that calls ISPW's API to perform various ISPW Operations from a command line.
