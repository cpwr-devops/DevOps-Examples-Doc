---
title: Mainframe CI using alternatives to Jenkins
footer: MIT Licensed | Copyright &copy; 2018 - Compuware
---
# Mainframe CI using alternatives to Jenkins

Even though Jenkins is the most prevalent CI server on the market, there are shops that use alternative solutions to using Jenkins. And even though implementing a mainframe CI process using Jenkins is simplified by the availability of  Compuware plugins, these plugins - under the hood - use the [Topaz Command Line Interface](../apis/topaz_cli.md) and the [ISPW REST API](../apis/rest_api.md). 

Solution using alternatives to Jenkins must allow:
- Installing of the Topaz command line interface
- Executing command line commands
- Executing http REST calls
- Triggering rjobs 
- jobs to be triggered from remote (e.g. via REST calls)
then making use of the CLI and ISPW REST API it should be possible to implement CI processes similar to the ones we present using Jenkins.

As a proof of concept we describe and publish the code to [implement a CI/CD process using Azure DevOps pipelines](../guidelines/azure_devops/azure_devops_pipeline.md). The pipeline will implement the [general process steps](../pipelines/basic_scenario.md#ci-pipeline-job). The CI build pipeline will trigger an Azure DevOps release pipeline which we will also describe. Most of the implementation will be done by using [Powershell scripts](../guidelines/azure_devops/powershell_scripts.md).
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE5OTQ4MzIwNTUsMTQ2MDc4MDMwNl19
-->