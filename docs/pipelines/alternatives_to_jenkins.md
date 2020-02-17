---
title: Mainframe CI using alternatives to Jenkins
footer: MIT Licensed | Copyright © 2018 - Compuware
---
# Mainframe CI using alternatives to Jenkins

Even though Jenkins is the most prevalent CI server on the market, there are shops that use alternative solutions to using Jenkins. And even though implementing a mainframe CI process using Jenkins is simplified by the availability of the Compuware plugins, these plugins - under the hood - use the [Topaz Command Line Interface](../apis/topaz_cli.md) and the [ISPW REST API](../apis/rest_api.md). Therefore, if a specific solution as alternative to Jenkins allows
- installing the Topaz command line interface
- executing command line commands
- executing http REST calls
- jobs to be triggered from remote (e.g. via REST calls)
then making use of the CLI and ISPW REST API it should be possible to implement CI processes similar to the ones we present using Jenkins should be possible.

As a proof of concept we describe and publish the code to [implement a CI/CD process using Azure DevOps pipelines](../guidelines/azure_devops_pipeline.md). The pipeline will implement the [general process steps](../pipelines/basic_scenario.md#ci-pipeline-job). The CI build pipeline will trigger an Azure DevOps release pipeline which we will also describe.

## The Powershell scripts

Azure DevOps pipelines use yaml as language to describe pipeline steps. Therefore, [Powershell scripts](https://github.com/cpwr-devops/DevOps-Examples/blob/master/src/misc-examples/AzureDevOps/Powershell) will be used to code some of the logic required to implement the process. These scripts may also be used as bases to transfer the example to a different CI tool than Azure DevOps or Jenkins.

::: warning
Most of the Powershell scripts have just been written to proof the concept and would require expanding the logic for plausibility checking and error handling.
:::

## `Azure_Trigger_Release.ps1`

This script uses the following parameters and will use the [Azure DevOps REST API](https://docs.microsoft.com/en-us/rest/api/azure/devops/?view=azure-devops-rest-5.1&viewFallbackFrom=azure-devops) to trigger an [Azure DevOps release pipeline](../guidelines/azure_devops_pipeline.md#create-a-release-pipeline).

Parameter | Description
---- | -----------
`[string]$serverAddress` | Address of the Azure DevOps server storing the pipeline definition
`[string]$serverOrganization` | Azure DevOps organization
`[string]$serverProject` | Azure DevOps project
`[string]$serverAuthorization` |  `authorization` header for the http request - [encrypting the personal access token](../guidelines/azure_devops_pipeline.html#personal-access-token-pat)
`[string]$ispwApplication` | ISPW application (passed into the process by the [ISPW webhook](../guidelines/azure_devops_pipeline.md#define-ispw-webhook))
`[string]$ispwContainerName` | ISPW Container (passed into the process by the [ISPW webhook](../guidelines/azure_devops_pipeline.md#define-ispw-webhook))
`[string]$ispwContainerType` | ISPW Container Type (passed into the process by the [ISPW webhook](../guidelines/azure_devops_pipeline.md#define-ispw-webhook))
`[string]$ispwLevel` | ISPW Level (passed into the process by the [ISPW webhook](../guidelines/azure_devops_pipeline.md#define-ispw-webhook))
`[string]$releaseDefinitionId` | Id of the Azure DevOps release

## `Clear_Workspace.ps1`

This script will delete the content of the folder being passed as parameter. For the pipelines this will be the corresponding workspace.

Parameter | Description
---- | -----------
`[string]$workspaceRoot` | Folder whose contents to delete

## `Code_Coverage_Download_Metrics.ps1`

This script uses the following parameters and will use [`CodeCoverageCLI.bat`](../apis/topaz_cli.md#codecoveragecli-bat) to download Xpediter Code Coverage results from the mainframe to the workspace.

Parameter | Description
---- | -----------
`[string]$workspaceRoot` | Folder to use as workspace for the AzureDevOps pipeline
`[string]$hostUri` | Mainframe host name or IP address
`[string]$hostPort` | HCI port
`[string]$hostUser` | Mainframe (TSO) Userid
`[string]$hostPassword` | Mainframe password
`[string]$hostCodePage` | Mainframe code page
`[string]$ispwApplication` | ISPW application (passed into the process by the [ISPW webhook](../guidelines/azure_devops_pipeline.md#define-ispw-webhook))
`[string]$ccRepo` | Code Coverage repository to use
`[string]$ccSystem` | Code Coverage system to get data for
`[string]$ccTestid` | Code Coverage test id to get data for
`[string]$ccDdio` | Optional override DDIO file
`[string]$cliPath` | Location of the Topaz CLI on the machine the local agent executes on

## `Git_Clone_TTT_Repo.ps1`

This script uses the following parameters and will clone the Git repository to the `tests` subfolder of the workspace.

Parameter | Description
---- | -----------
`[string]$workspaceRoot` | Folder to use as workspace for the AzureDevOps pipeline
`[string]$gitRepo` | Git repository to clone

## `ISPW_Download_Container.ps1`

This script uses the following parameters and will use [`SCMDownloaderCLI.bat`](../apis/topaz_cli.md#example-using-the-ispw-container-downloader) to download the tasks of an ISPW container to the workspace.

Parameter | Description
---- | -----------
`[string]$workspaceRoot` | Folder to use as workspace for the AzureDevOps pipeline
`[string]$hostUri` | Mainframe host name or IP address
`[string]$hostPort` | HCI port
`[string]$hostUser` | Mainframe (TSO) Userid
`[string]$hostPassword` | Mainframe password
`[string]$hostCodePage` | Mainframe code page
`[string]$ispwApplication` | ISPW application (passed into the process by the [ISPW webhook](../guidelines/azure_devops_pipeline.md#define-ispw-webhook))
`[string]$ispwConfig` | ISPW configuration to use
`[string]$ispwContainerName` | ISPW container to download the tasks from
`[string]$ispwContainerType` | ISPW container type
`[string]$ispwDownloadLevel` | ISPW level to download the tasks from
`[string]$cliPath` | Location of the Topaz CLI on the machine the local agent executes on

## `ISPW_Operations.ps1`

This is the most advanced of all scripts and has been available for a while now. It allows using a subset of functions provided by the [ISPW REST API](../apis/rest_api.md). It uses the following parameters and will execute the `ISPWFunction`.

Parameter | Description
---- | -----------
`[string]$ISPWFunction` | Function to use (`ContainerCreate`, `ContainerOperation`, **`TaskLoad`**)
`[string]$ces` | CES URL
`[string]$runtimeconfig` | ISPW runtime config
`[string]$containerType` | ISW container Type (`assignments`, `releases`)
`[string]$operation` | ISPW operation (`generate`, `promote`, `deploy`, `regress`)
`[string]$container` | ISPW container
`[string]$level` | ISPW level
`[string]$token` | CES Token
`[string]$stream` | ISPW stream
`[string]$application` | ISPW application
`[string]$ISPWServer` | ISPW server (same as ISPW configuration)
`[string]$description` | Description (for create container)
`[string]$prefix` | Container name prefix (for create container)
`[string]$refnumber` | Reference number (for create container)
`[string]$usertag` | User tag (for create container)
`[string]$owner` | Owner Id (for create container)
`[string]$moduleName` | Module name (for task load)
`[string]$moduleType` | Module type (for task load)
`[string]$type` | Component type (for task load)
`[string]$dpenvlst` | Lsit of deployment environments (for deploy)

## `Sonar_Check_Quality_Gate.ps1`

This script uses the following parameters and will use the SonarQube REST API to query the status of a SonarQube quality gate for the project.

Parameter | Description
---- | -----------
`[string]$sonarServer` | SonerQube URI
`[string]$sonarProjectName` | SonarQube project to query
`[string]$sonarAuthorization` | `authorization` header for the http request, i.e. SonarQube access token [encrypted similarly to the Azure PAT](../guidelines/azure_devops_pipeline.html#personal-access-token-pat)

## `Sonar_Scan.ps1`

This script uses the following parameters and will use the Sonar Scanner to pass sources, test results and code coverage data to SonarQube.

Parameter | Description
---- | -----------
`[string]$workspaceRoot` | Folder to use as workspace for the AzureDevOps pipeline
`[string]$ispwApplication` | ISPW application (passed into the process by the [ISPW webhook](../guidelines/azure_devops_pipeline.md#define-ispw-webhook))
`[string]$sonarProjectName` | SonarQube project to use
`[string]$sonarSources` | Folder in the workspace containing the program sources

## `TTT_Run_Functional_Tests.ps1`

This script uses the following parameters and will use [`TotalTestCLIFT.bat`](../apis/topaz_cli.md#total-test-functional-test-totaltestftcli-bat) determine the program sources that have been downloaded and execute all corresponding Topaz for Total Test scenarios.

Parameter | Description
--------- | -----------
`[string]$workspaceRoot` | Folder to use as workspace for the AzureDevOps pipeline
`[string]$cesUri` | URI for the CES
`[string]$hostUser` | Mainframe (TSO) Userid
`[string]$hostPassword` | Mainframe password
`[string]$ispwApplication` | ISPW application (passed into the process by the [ISPW webhook](../guidelines/azure_devops_pipeline.md#define-ispw-webhook))
`[string]$tttEnvironment` | Topaz for Total Test environment ID within the repository server to use for test execution
`[string]$cliPath` | Location of the Topaz CLI on the machine the local agent executes on

## `TTT_Run_Tests.ps1`

This script uses the following parameters and will use [`TotalTestCLI.bat`](../apis/topaz_cli.md#specific-parameters) determine the program sources that have been downloaded and execute all corresponding Topaz for Total Test scenarios.

`[string]$workspaceRoot` | Folder to use as workspace for the AzureDevOps pipeline
`[string]$hostUri` | Mainframe host name or IP address
`[string]$hostPort` | HCI port
`[string]$hostUser` | Mainframe (TSO) Userid
`[string]$hostPassword` | Mainframe password
`[string]$hostCodePage` | Mainframe code page
`[string]$ispwApplication` | ISPW application (passed into the process by the [ISPW webhook](../guidelines/azure_devops_pipeline.md#define-ispw-webhook))
`[string]$ispwLevel` | ISPW Level (passed into the process by the [ISPW webhook](../guidelines/azure_devops_pipeline.md#define-ispw-webhook))
`[string]$ccRepo` | Code Coverage repository to use
`[string]$ccSystem` | Code Coverage system to use
`[string]$ccTestid` | Code Coverage test id to use
`[string]$ccDdio` | Optional override DDIO files
`[string]$cliPath` | Location of the Topaz CLI on the machine the local agent executes on
