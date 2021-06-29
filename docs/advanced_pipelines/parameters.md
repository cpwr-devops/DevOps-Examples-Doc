---
title: Pipeline Parameters
footer: MIT Licensed | Copyright © 2018 - Compuware
---
# The pipeline parameter
Most of the pipelines shown here, use a set of parameters and configuration settings that are taken from several sources.

This table documents the different names these parameters appear under, how and where they are defined/passed into the pipleine, and how to determine which values to specify.

## Webhook Parameters

These values are passed via the ISPW [Webhook](../tool_configuration/webhook_setup.md#URL). Each pipeline is setup as [parameterized](../pipelines/basic_example_pipeline.md#setting-up-the-pipeline-job) to accept the corresponding values as input.

The first column contains the name as configured in the Jenkins job configuration. The follwoing columns show the variable names used within the code of the corresponding `.jenkinsfile`/`.groovy` file.

Jenkins configuration | Basic Pipeline | Shared Library Examples | Combined Pipelines | Source / Name of parameter passed by Webhook | Description
--------------------- | -------------- | ----------------------- | ------------------ | -------------------------------------------- | -----------
`ISPW_Stream`         | `ISPW_Stream`       | `ispwStream`        | `ispwStream`        | `$$stream$$`        | ISPW stream
`ISPW_Application`    | `ISPW_Application`  | `ispwApplication`   | `ispwApplication`   | `$$application$$`   | ISPW application
`ISPW_Release`        | `ISPW_Release`      | `ispwRelease`       | `ispwRelease`       | `$$release$$`       | ISPW release - depending on the circumstances, the release may be empty
`ISPW_Assignment`     | `ISPW_Assignment`   | `ispwAssignment`    | `ispwAssignment`    | `$$assignment$$`    | ISPW assignment
`ISPW_Set_id`         | not used            | `ispwSet`           | `ispwSet`           | `$$set$$`           | ISPW set that was created for a specific operation, like `generate`or `promote`
`ISPW_Src_Level`      | `ISPW_Src_Level`    | `ispwSrcLevel`      | `ispwSrcLevel`      | `$$level$$`         | Level in the ISPW life cycle
`ISPW_Owner`          | `ISPW_Owner`        | `ispwOwner`         | `ispwOwner`         | `$$owner$$`         | TSO user id of the user performing the ISPW operation triggering webhook
`ISPW_Operation`      | not used            | not used            | `ISPW_Operation`    | `$$operation$$`     | Operation in ISPW triggering the webhook, like `generate`or `promote`

::: tip Note
The `ISPW_Operation` in the combined example is not used by the two scripts performing the work, but used in the calling code to determine which of the two scripts to call.
::: 

## Configuration parameters

These parameters are dependent on environment and configuration. Unlike the previous set of parameters, they will not differ from build to build, and may all be consitent for every job/pipeline in the installation. 
- In the basic pipeline example they are partly defined as [parameters using default values](../pipelines/basic_example_pipeline.md#the-pipeline-parameters) or [partly set as global variables in the code](../pipelines/basic_example_pipeline.md#global-variables)
- In the examples using Shared Libraries they are [passed on the call to the Shared Library script](../advanced_pipelines/setup.md#executing-a-shared-library-script) or set from the [pipelineConfig.yml](./config_files.md#pipelineconfig.yml) file.

::: tip Note
To determine where in your configuration to define and set any of these parameters, you should ask yourself:
- Is the value likely to change between different implementations of Jenkins jobs using the same code? In that case it should rather be a pipeline parameter using a default or be set on the call.
- Is the value likely to remain the same across all jobs? In that case it should be set in the script or via a configuration file.
- Should the value be "hidden" from users? In that case it should be set in the script or via a configuration file.
:::

### Jenkins configuration / pipeline script call
 
Jenkins configuration | Basic Pipeline variable | Shared Library variable | Description / Value to use
--------------------- | ----------------------- | -------------------     | ------------------------------------
`CES_Token`           | `CES_Token`             | `cesToken`              | [Token defined in CES (clear text)](../tool_configuration/CES_credentials_token.md)
`Jenkins_CES_Token`   | `Jenkins_CES_Token`     | `jenkinsCesToken`       | [ID of Jenkins (secret text) credentials for the CES token](../tool_configuration/CES_credentials_token.md)
`HCI_Conn_ID`         | `HCI_Conn_ID`           | `hciConnectionId`       | [Jenkins ID of the HCI connection to use](../tool_configuration/Jenkins_config.md#compuware-configurations)
`HCI_Token`           | `HCI_Token`             | `hciToken`              | [ID of Jenkins (userid and password) credentials for TSO user ID and password](../tool_configuration/CES_credentials_token.md)
`CC_Repository`       | `CC_Repository`         | `ccRepository`          | Code Coverage repository dataset to use for Code Coverage data collection during test execution.
`Git_Project`         | `Git_Project`           | `gitProject`            | Name of the GitHub project used to store Topaz for Total Test repositories. (GitHub repository URLs are of the form `https://github.com/<project>/<repository>`)
`Git_Credentials`     | `Git_Credentials`       | `gitCredentials`        | [ID of Jenkins (userid and password) credentials for the GitHub repository used to store Topaz for Total Test assets](../tool_configuration/CES_credentials_token.md)

### Set in script / via `pipelineConfig.yml`

::: tip Note 1
The code of the Shared Library examples reads the content of the `pipelineConfig.yml` file into variable `pipelineConfig`. As a result, a parameter from this file gets reffered to by adding this variable name to the path of the parameter, e.g. `pipelineConfig.git.url`.
:::

::: tip Note 2
Some of the values for the paramters below are fixed by the plugins or tools generating the values.
::: 

Basic Pipeline | `pipelineConfig.yml` | Description / Value to use | Fixed value if applicable
---------------| -------------------- | -------------------------- | -------------------------
`Git_URL` | `git.url` | URL to the git repository server. In the examples `https://github.com`. In the basic example the value is set to the GitHub URL plus the `GIT_Project` | 
`Git_Ttt_Repo` | `git.tttRepoExtension` | **Basic pipeline**: Full name of the TTT repository, built from the `ISPW_Stream`, `ISPW_Application` and the extension `'_Total_Tests.git'`. **Shared Library**: The extension to use to build the repository name. | 
`Git_Branch` | `git.branch` | Branch of the Git repository to use for Topaz for Total Tests | 
`SQ_Scanner_Name` | `sq.scannerName` | Name of the SonbarQube scanner as defined in the [Jenkins Global Tool Configuration](../tool_configuration/Jenkins_config.md#sonarqube-scanner) | 
`SQ_Server_Name` | `sq.serverName` | Name of the SonarQube server as defined in the [Jenkins System Configuration](../tool_configuration/Jenkins_config.md#sonarqube-server-information) | 
`MF_Source` | `ispw.mfSourceFolder` | Name of the workspace folder containing the sources downloaded from the mainframe | `'MF_Source'` (set by ISPW downloader plugin)
`XLR_Template` | `xlr.template` | Name of the XL Release release template to trigger after successful execution of a 'promote pipeline' | 
`XLR_User` | `xlr.user` | Name of the credentials defined with the [XL Release configuration](../tool_configuration/Jenkins_config.md#xl-release) |
`TTT_Base_Folder` | `ttt.general.folder` | Name of workspace folder to clone the Topaz for Total Test repository into. Creating a separate sub folder simplifies using the Topaz for Total Test step. | 
`TTT_Vt_Folder` | `ttt.virtualized.folder` | Sub folder of the test base folder containing **virtualized test scenarios**. Pointing the Topaz for Total Test step to this sub folder allows targeted execution of virtualized tests only. |
`TTT_Vt_Environment` | `ttt.virtualized.environment` | ID of an environment defined in the [CES repository for Topaz for Total Test](). This will execute only scenarios (`.context` files) matching the environemnt. | 
| | `ttt.virtualized.targetSonarResults` | In case several Topaz for Total Test steps are executed within one build, the results file of any previous step would be replaced by the most current version. To prevent this, the examples rename the original file into this new name. | 
| | `ttt.nonVirtualized.folder` | Sub folder of the test base folder containing **non virtualized test scenarios**. Pointing the Topaz for Total Test step to this sub folder allows targeted execution of virtualized tests only. |
| | `ttt.nonVirtualized.environment` | ID of an environment defined in the [CES repository for Topaz for Total Test](). This will execute only scenarios (`.context` files) matching the environemnt. | 
| | `ttt.nonVirtualized.targetSonarResults` | In case several Topaz for Total Test steps are executed within one build, the results file of any previous step would be replaced by the most current version. To prevent this, the examples rename the original file into this new name. | 
`TTT_Sonar_Results_File` | `ttt.general.sonarResultsFolder + ttt.general.sonarResultsFile` | Name and path within the workspace of the Topaz for Total Test results file in SonarQube format | `'generated.cli.suite.sonar.xml'` (set by the Topaz for Total Test plugin)
`CES_Url` | `ces.url` | URL to the CES to use for Topaz for Total Test or ISPW operations and defined in [Jenkins System Configuration](#/tool_configuration/Jenkins_config.md#compuware-configurations)
`ISPW_Runtime` | `ispw.runtime` | Name of the ISPW runtime configuration to use. Determined by your ISPW administrator. |
`ISPW_Changed_Programs_File` | `ispw.changedProgramsFile` | Name of the `.json` file containing the list of components affected by an ISPW step | `'changedPrograms.json'` (set by ISPW plugins)
<!--stackedit_data:
eyJoaXN0b3J5IjpbNzEwODkwNjgxLDIwNjI2MjY0LDExMDIwND
UyOThdfQ==
-->