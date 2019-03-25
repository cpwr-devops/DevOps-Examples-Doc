---
title: Tool Configurations
footer: MIT Licensed | Copyright © 2018 - Compuware
---
# Tool Configurations

The scenarios covered by the [primary pipelines](../pipelines/readme.md), the [other code examples](../code_examples/code_examples.md), and more generally the use of the Compuware and third party [plugins](./plugins.md), require certain configurations and setting, both within Jenkins and within other tools provided by Compuware.

## Compuware Enterprise Services

Next to serving as web application server for Compuware's web based tools like [iStrobe](https://compuware.com/strobe-mainframe-performance-monitoring/) or the [ISPW web interface](https://compuware.com/ispw-source-code-management/), Compuware Enterprise Services (CES) provides a set of services that allow interfacing with Compuware tools outside the mainframe. In the context of Jenkins and CI/CD these are

### ISPW Webhooks

ISPW allows registering webhooks to use events in the ISPW software life cycle to trigger events outside of ISPW like triggering a Jenkins pipeline. CES may be used as one source to define and register webhooks for ISPW. Both *primary* pipelines make use of such webhooks defined in CES. Refer to the CES online help, chapter **Compuware Enterprise Services**, section **Webhooks** for documentation on setting up ISPW webhooks, and the parameters that may be passed from ISPW to the webhook.

[Definition of a webhook used in the examples](./webhook_setup.md)

### CES Credentials Token

The Compuware plugins (and other operations) make use of credential tokens defined in CES. These tokens store mainfram TSO user id and password and allow authentication against the mainframe without using clear text credentials within script code. 

[Definition of CES credentials token](./CES_credentials_token.md)
