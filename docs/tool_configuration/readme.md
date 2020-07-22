---
title: Tool Configurations
footer: MIT Licensed | Copyright © 2018 - Compuware
---
# Tool Configurations

The scenarios covered by the [primary pipelines](../pipelines/readme.md), the [other pipeline examples](../advanced_pipelines/readme.md), and more generally the use of the [Compuware and third party plugins](./plugins.md), require certain configurations and settings, both within Jenkins and within other tools provided by Compuware.

## Compuware Enterprise Services

Next to serving as web application server for Compuware's web based tools like [iStrobe](https://compuware.com/strobe-mainframe-performance-monitoring/) or the [ISPW web interface](https://compuware.com/ispw-source-code-management/), Compuware Enterprise Services (CES) provides a set of services that allow interfacing with Compuware tools outside the mainframe. For Jenkins and CI/CD these are ISPW Webhooks and CES Credentials Tokens.

### ISPW Webhooks

ISPW allows registering webhooks to use events in the ISPW software life cycle to trigger events outside of ISPW like triggering a Jenkins pipeline. CES may be used as one source to define and register webhooks for ISPW. Both *primary* pipelines make use of such webhooks defined in CES. Refer to the Webhooks** section in the  **Compuware Enterprise Services** online help for setting up ISPW webhooks and the parameters that may be passed from ISPW to the webhook.

[Definition of a webhook used in the examples](./webhook_setup.md)

### CES Credentials Tokens

The Compuware plugins (and other operations) make use of credential tokens defined in CES. These tokens store mainfram TSO user id and password and allow authentication against the mainframe without using clear text credentials within script code. 

[Definition of CES credentials token](./CES_credentials_token.md)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE2MjkyOTI4MzFdfQ==
-->