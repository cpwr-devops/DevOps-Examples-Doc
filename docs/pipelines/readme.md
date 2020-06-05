---
title: Getting Started
footer: MIT Licensed | Copyright © 2018 - Compuware
---

![Toolchain](./images/toolchain.png)

# Getting Started

To get started building your own mainframe DevOps pipeline, we have provided Jenkins pipeline examples and setup instructions. Focussing on Jenkins does not mean, though, that implementing CI/CD pipelines for mainframe development is limited to the use of Jenkins. If the need arises to use alternatives to Jenkins to do the same things described here, refer to [Mainframe CI using alternatives Jenkins](./alternatives_to_jenkins.md).

The pages contains example code and documentation on:

- Jenkins CI pipelines as we would suggest as starting point
- Compuware and 3rd party tools used in the pipelines
- Instructions setting configuring Jenkins and SonarQube
- code snippets for specific tasks and purposes outside the general purpose
- code snippets and sample code making use of the [ISPW REST API](../apis/rest_api.md) and [Topaz CLI](../apis/topaz_cli.md), which may be [used in tools other than Jenkins](./alternatives_to_jenkins.md).

>warning
The code published serves as example code, using Compuware’s example applications and environments. It needs to be adjusted to site specific needs and requirements.
:::

::: tip Note
The descriptions and tutorials assume a certain level of familiarity with using Jenkins, Topaz for Total Test and other Compuware tools. The required level of knowledge should is not expected too high, though. E.g. it helps to know, how to define a new job in Jenkins.
:::

## Pipeline examples

We have published several examples of "complete" pipelines which show partly different process steps and different techniques in Jenkins.

- [Mainframe-CI-Example-pipeline](./basic_scenario.md) - ([jenkinsfile](https://github.com/cpwr-devops/DevOps-Examples/tree/master/src/Jenkinsfile/Mainframe-CI-Example-pipeline.jenkinsfile)) - is a scripted pipeline using parameters.  This is a simple approach to a DevOps pipeline that allows you to get up and going quickly, but may not be the best approach to scale a pipelines across your enterprise. The job is intended to be triggered [after promoting code within ISPW](../pipelines/basic_scenario.md)
- [Mainframe_CI_Pipeline_from_Shared_Lib](../advanced_pipelines/readme.md#mainframe-ci-pipeline-from-shared-lib) - ([groovy](https://github.com/cpwr-devops/DevOps-Examples/blob/master/vars/Mainframe_CI_Pipeline_from_Shared_Lib.groovy)) - is a pipeline loaded from a Jenkins shared library.  Shared Libraries are a useful approach to scale pipelines across an enterprise since it moves the bulk of the pipeline logic to shared components that individual pipelines can reference a steps.  This allows organizations to develop pipelines in a more standard way.  The job is also intended to be triggered [after promoting code within ISPW](../pipelines/basic_scenario.md)
- The two following pipelines are supposed to be part of a more [elaborate process](../advanced_pipelines/elaborate_scenario.md) and get triggered at different stages of that process
    - [Mainframe_Generate_Pipeline.groovy](https://github.com/cpwr-devops/DevOps-Examples/tree/master/vars/Mainframe_Generate_Pipeline.groovy) - is a pipeline that gets triggered by an ISPW Generate, and executes unit tests against those components that have been generated.
    - [Mainframe_Integration_Pipeline.groovy](https://github.com/cpwr-devops/DevOps-Examples/tree/master/vars/Mainframe_Integration_Pipeline.groovy) - is a pipeline that gets triggered by an ISPW Promote, and executes functional/integration tests against the project/assignment.

## Tools Used

The example pipelines use a development scenario based on:

- [ISPW](https://compuware.com/ispw-source-code-management/) as SCM to store and govern mainframe sources
- [Git (GitHub)](https://github.com/) as SCM to store unit test assets
- [Topaz for Total Test](https://compuware.com/topaz-for-total-test-automation/) as mainframe unit, functional and integration testing tool to create and maintain test assets
- [Xpediter Code Coverage](https://compuware.com/xpediter-mainframe-debugging-tools/) as tool to gather code coverage data during execution of the unit tests
- [SonarQube](https://www.sonarsource.com/) as server for code analysis and setting up quality gates
- [XLRelease](https://xebialabs.com/) as CD server for release steps following the initial CI process Jenkins

Instructions on configuring the various tools can be found in the [Configuration](../tool_configuration/readme.md) of this site.

## Other Code examples

Any code examples are stored in a GitHub repository located at  [https://github.com/cpwr-devops/DevOps-Examples/](https://github.com/cpwr-devops/DevOps-Examples/).

- The **example pipelines using Shared Library technology** will be stored in the *vars* folder.
- **Code related to these pipelines** (class definitions) will be stored in the *src* folder.
- Example code not directly related, but **defining Jenkins jobs**, will be stored in the `src/Jenkinsfile` folder. Currently these are:
    - [JCL_Pipeline_Example](https://github.com/cpwr-devops/DevOps-Examples/tree/master/src/Jenkinsfile/JCL_Pipeline_Example.jenkinsfile) containing a simple example of mainframe jobs being submitted from Jenkins - both, with the JCL residing on the mainframe and the JCL stored/generated in the pipeline code itself.
    - Three examples of downloading sources (COBOL programs and copybooks) from the mainframe, using different download stores for the code and methods to download, pushing the sources to SonarQube using the Sonar scanner and querying the resulting Sonar Quality Gate
        - [Scan_Sources_from_ISPW_Container_with_Sonar](https://github.com/cpwr-devops/DevOps-Examples/tree/master/src/Jenkinsfile/Scan_Sources_from_ISPW_Container_with_Sonar.jenkinsfile) - using the *container* downloader for sources stored in ISPW
        - [Scan_Sources_from_ISPW_Repository_with_Sonar](https://github.com/cpwr-devops/DevOps-Examples/tree/master/src/Jenkinsfile/Scan_Sources_from_ISPW_Repository_with_Sonar.jenkinsfile) - using the *repository* downloader for sources stored in ISPW
        - [Scan_Sources_from_PDS_with_Sonar](https://github.com/cpwr-devops/DevOps-Examples/tree/master/src/Jenkinsfile/Scan_Sources_from_PDS_with_Sonar.jenkinsfile) - using the *PDS* downloader for sources stored in PDS's (inside or outside a mainframe SCM tool)
    - [Push_TTT_results_to_Git](../pipeline_snippets/push_ttt_results_to_git.md) - ([jenkinsfile](https://github.com/cpwr-devops/DevOps-Examples/tree/master/src/Jenkinsfile/Push_TTT_results_to_Git.jenkinsfile)) - showing how to push results of unit test execution back to GitHub for a developer to consume locally.
- **Powershell scripts and examples for using alternatives to Jenkins or the Jenkins plugins** are stored in the *misc-examples/Powershell* sub-folder within the *src* directory of the repository. These scripts make use of the [ISPW REST API]() and the [Topaz CLI](), and we describe them in detail in [Mainframe CI using alternatives Jenkins](./alternatives_to_jenkins.md).

## The code repository folder structure

Based on the description above and due to the requirements for the use of [Pipeline Shared Libraries](https://jenkins.io/doc/book/pipeline/shared-libraries/) in Jenkins the folder structure of the DevOps-Examples repository is as follows:

```
    (root)
    +- resources                                            # Files used by the pipelines
    |   +- pipeline                                         # Configuration files for pipeline variables
    |   |
    |   +- skels                                            # Mainframe JCL "skeleton" files
    |
    +- src                                                  # (Groovy) source files
    |   +- com
    |   |   +- compuware
    |   |       +- devops
    |   |           +- util                                 # Classes used by the pipelines
    |   |
    |   +- Jenkinsfile                                      # "simple" example job scripts
    |   |
    |   +- misc-examples                                    # non Jenkins related (non Groovy) code examples
    |       +- AzureDevOps
    |           +- PipelineYAML                             # YAML file(s) describing Azure DevOps pipelines (builds or releases)
    |           |
    |           +- Powershell                               # Powershell scripts being used by an Azure DevOps example pipeline
    |
    +- vars                                                 # Shared Library Pipeline Examples
    |
    +- resources                                            # Files used by the pipelines
        +- pipeline                                         # Configuration files for pipeline variables
        |
        +- skels                                            # Mainframe JCL "skeleton" files
```

## People wanting to contribute

Everyone perusing these pages is welcome to provide feedback, input and suggestions for improvement; as well as asking for specific topics to be covered in the future.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwMjY0MjE0NzVdfQ==
-->