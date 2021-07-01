---
title: Getting Started
footer: MIT Licensed | Copyright © 2018 - Compuware
---

![Toolchain](./images/toolchain.png)

# Getting Started

To get started building your own mainframe DevOps pipeline, we have provided pipeline examples and setup instructions using Jenkins. To implement a pipeline using other tools, refer to  [Mainframe CI using alternatives Jenkins](https://devops.api.compuware.com/pipelines/alternatives_to_jenkins.html).

Example code and documentation are provided for:
-   [A suggested starting point for Jenkins CI pipelines](./basic_scenario.md)
-   [Compuware and 3rd party tools used in the pipelines](#tools-used)
-   [Instructions setting up and configuring Jenkins and SonarQube](../tool_configuration/plugins.md)
-   Code snippets or sample code for:
	  - [CI pipelines using various techniques](#pipeline-examples)
    - [general purpose for use in Jenkins](#other-code-examples)
    - making use of the  [ISPW REST API](https://devops.api.compuware.com/apis/rest_api.html)  and  [Topaz CLI](https://devops.api.compuware.com/apis/topaz_cli.html), which may be  [used in tools other than Jenkins](./alternatives_to_jenkins.md).

::: warning
The code published serves as example code, using Compuware example applications and environments. It needs to be adjusted to site specific needs and requirements.
:::

::: tip Note
The descriptions and tutorials assume a certain level of familiarity with using Jenkins, Topaz for Total Test and other Compuware tools. The required level of knowledge expected, is not too high. E.g. it helps to know, how to define a new job in Jenkins.
:::

## Code examples

Code examples are stored in this GitHub repository [https://github.com/cpwr-devops/DevOps-Examples/](https://github.com/cpwr-devops/DevOps-Examples/).

### Pipeline examples

We have published several examples of "complete" pipelines which show different process steps and techniques in Jenkins.

- **[Mainframe-CI-Example-pipeline](./basic_scenario.md)** - ([jenkinsfile](https://github.com/cpwr-devops/DevOps-Examples/tree/master/src/Jenkinsfile/Mainframe-CI-Example-pipeline.jenkinsfile)) - a scripted pipeline using parameters. This is a simple approach to a DevOps pipeline that allows you to get up and going quickly, but may not be the best when scaling pipelines across your enterprise. The job is intended to be triggered [after promoting code within ISPW](../pipelines/basic_scenario.md)

  ::: tip Note
  This pipeline serves as the model for most of the other pipelines examples. Meaning, other pipelines follow the same structure, implementing bascially the process and just differing in nuances, e.g. the types of test being executed at different stages of the development process, and demonstrating certain techniques that prove to be helpful.
  :::

- **[Mainframe_CI_Pipeline_from_Shared_Lib](../advanced_pipelines/readme.md#mainframe-ci-pipeline-from-shared-lib)** - ([groovy](https://github.com/cpwr-devops/DevOps-Examples/blob/master/vars/Mainframe_CI_Pipeline_from_Shared_Lib.groovy)) - a pipeline loaded from a Jenkins shared library.  Shared Libraries are a useful approach to scale pipelines across an enterprise since it moves the bulk of the pipeline logic to shared components that individual pipelines can reference as steps.  This allows organizations to develop pipelines in a more standard way.  The job is also intended to be triggered [after promoting code within ISPW](../pipelines/basic_scenario.md).

  ::: tip Note
  Older versions of this pipeline made use *helper classes* to encapsulate some of the complexity and make the flow of the job easier to folow.  Thanks to the [changes in the Compuware CLI and plugins](#what-has-changed-in-april-2021) the complexity of the code required to implement such a pipeline has been reduced so much that the use of these classes does not seem to be necessary anymore. 
  :::

- **Combined Pipeline**: The following two pipeline definitions are part of a more [elaborate process](../advanced_pipelines/elaborate_scenario.md). They are called by a Jenkins job "distrubuting" the work to either of the scripts based on the ISPW operation (generat or promote) triggering the webhook and Jenkins job. 
    - **[Mainframe_Generate_Pipeline.groovy](https://github.com/cpwr-devops/DevOps-Examples/tree/master/vars/Mainframe_Generate_Pipeline.groovy)** - a pipeline that is triggered by an ISPW Generate that executes virtualized tests against those components that have been generated.
    - **[Mainframe_Integration_Pipeline.groovy](https://github.com/cpwr-devops/DevOps-Examples/tree/master/vars/Mainframe_Integration_Pipeline.groovy)** - a pipeline that is triggered by an ISPW Promote that executes non virtualized tests against the project/assignment.

  ::: tip Note
  Also using the Shared Library technique, these two example show how Shared Library scripts can be used for modularization and re-use of existing code to implement such more elaborate processes.
  :::

- **Git/ISPW pipeline**: 

### Other Code examples

Next to the pipeline examples, we also publishe code snippets and short Jenkins jobs that demonstrate individual features and use cases of the Compuware plugins or CLIs.

The GitHub repository is organized as follows:
- ***vars* folder**: example pipelines using Shared Library technology.
- ***src* folder**: class definitions for code related to these pipelines.
-  `src/Jenkinsfile` folder: example code not directly related, but that *define Jenkins jobs*. Currently these are:
    - [JCL_Pipeline_Example](https://github.com/cpwr-devops/DevOps-Examples/tree/master/src/Jenkinsfile/JCL_Pipeline_Example.jenkinsfile) contains a simple example of mainframe jobs being submitted from Jenkins — both with the JCL residing on the mainframe and the JCL stored/generated in the pipeline code itself.
    - Three examples of downloading sources (COBOL programs and copybooks) from the mainframe using different download stores for the code and methods to download, pushing the sources to SonarQube using the Sonar scanner and querying the resulting Sonar Quality Gate.
        - [Scan_Sources_from_ISPW_Container_with_Sonar](https://github.com/cpwr-devops/DevOps-Examples/tree/master/src/Jenkinsfile/Scan_Sources_from_ISPW_Container_with_Sonar.jenkinsfile) - using the *container* downloader for sources stored in ISPW.
        - [Scan_Sources_from_ISPW_Repository_with_Sonar](https://github.com/cpwr-devops/DevOps-Examples/tree/master/src/Jenkinsfile/Scan_Sources_from_ISPW_Repository_with_Sonar.jenkinsfile) - using the *repository* downloader for sources stored in ISPW.
        - [Scan_Sources_from_PDS_with_Sonar](https://github.com/cpwr-devops/DevOps-Examples/tree/master/src/Jenkinsfile/Scan_Sources_from_PDS_with_Sonar.jenkinsfile) - uses the *PDS* downloader for sources stored in PDS's (inside or outside a mainframe SCM tool).
    - [Push_TTT_results_to_Git](../pipeline_snippets/push_ttt_results_to_git.md) - ([jenkinsfile](https://github.com/cpwr-devops/DevOps-Examples/tree/master/src/Jenkinsfile/Push_TTT_results_to_Git.jenkinsfile)) - shows how to push results of unit test execution back to GitHub for a developer to consume locally.
- ***misc-examples/Powershell* sub-folder**: that resides within the *src* directory of the repository, Powershell scripts and examples for using alternatives to Jenkins or the Jenkins plugins**. These scripts make use of the [ISPW REST API](../apis/rest_api.md) and the [Topaz CLI](../apis/topaz_cli.md), and we describe them in detail in [Mainframe CI using alternatives Jenkins](./alternatives_to_jenkins.md).

## What has changed in April 2021

Over the recent few releases of [Topaz for Total Test](../guidelines/ttt/ttt_scenario.md), the [Topaz CLI](../apis/topaz_cli.md#total-test-cli-totaltestftcli-bat), [ISPW](../guidelines/ispw/ispw_setup.md), the [ISPW CLI](../apis/topaz_cli.md#ispw-cli-ispwcli-bat) and the corresponding [Jenkins plugins](../tool_configuration/plugins.md), integration between different tools has been greatly improved, moving much of the complexity of implementing certain requirements from the code of the scripts into functionality provided by the plugins/CLI. Therefore, many of the example pipelines will have become far simpler, compared to the older versions, while providing the same flexibility and functionality as before. For customers this means that the coding effort and complexity of the resulting pipeline scripts [has been reduced considerably](./whats_new_in_april.md).

## Tools Used
The example pipelines use a development scenario based on:

- [ISPW](https://compuware.com/ispw-source-code-management/) as the SCM to store and govern mainframe sources
- [Git (GitHub)](https://github.com/) as the SCM to store unit test assets.
- [Topaz for Total Test](https://compuware.com/topaz-for-total-test-automation/) as the mainframe unit, functional, and integration testing tool to create and maintain test assets.
- [Xpediter Code Coverage](https://compuware.com/xpediter-mainframe-debugging-tools/) as the tool to gather code coverage data during execution of the unit tests.
- [SonarQube](https://www.sonarsource.com/) as the server for code analysis and setting up quality gates.
- [XLRelease](https://xebialabs.com/) as the CD server for release steps following the initial CI process Jenkins.
 
Instructions for configuring the various tools can be found in the [Configuration](../tool_configuration/readme.md) section of this site.

## The code repository folder structure

Based on the description above and due to the requirements for the use of [Pipeline Shared Libraries](https://jenkins.io/doc/book/pipeline/shared-libraries/) in Jenkins, the folder structure of the DevOps-Examples repository is as follows:

```
    (root)
    +- resources                                            # Configuration files used by the pipelines
    +- src                                                  # (Groovy) source files
    |   +- Jenkinsfile                                      # "simple" example job scripts
    |   +- misc-examples                                    # non Jenkins related (non Groovy) code examples
    |       +- AzureDevOps
    |           +- PipelineYAML                             # YAML file(s) describing Azure DevOps pipelines (builds or releases)
    |           +- Powershell                               # Powershell scripts being used by an Azure DevOps example pipeline
    +- vars                                                 # Shared Library Pipeline Examples
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbOTYwNDA5OTg4LDQ3MDM3ODg3NCwtNzc5OD
U0MjAsLTE5OTg3NzEyNzEsODYyNDUwOTI0LC0xNDYwNzQ0OTAy
LC0xMTM1NjUxMzcyLDYxNTgwOTAzLDEyNjE2MzQwMzAsLTE2OD
E0MzgxNzIsLTIwNzI0OTgzOTUsMjA2MDI3MzczLC0xNTc4Nzg4
ODIzLC0xMDI3NDYzMTksLTIwMjY0MjE0NzVdfQ==
-->