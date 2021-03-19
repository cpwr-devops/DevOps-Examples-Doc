---
title: Shared Library Pipelines
footer: MIT Licensed | Copyright © 2018 - Compuware
---

# Shared Library Pipelines

[Shared Libraries](https://jenkins.io/doc/book/pipeline/shared-libraries/) are getting the preferred method of providing code that can can be re-used (**shared**) between pipeline definitions. 

Three of the example pipelines shared on the [Compuware GitHub](https://github.com/cpwr-devops/DevOps-Examples/) are built based on shared library principles. 

::: tip Note
While we have been using *Helper Classes* in former versions of these tutorials, the need for classes for the purposes demonstrated in these tutorials has been reduced by [the features introduced to the CLIs and Plugins over recent months](../pipelines/readme.md#what-has-changed-in-april-2021).

Still, there are other advantages of using Shared Libraries that we demonstrate using the examples below.
:::

- [`Mainframe_CI_Pipeline_from_Shared_Lib.groovy`](https://github.com/cpwr-devops/DevOps-Examples/blob/master/vars/Mainframe_CI_Pipeline_from_Shared_Lib.groovy)) - is intended to be triggered [after promoting code within ISPW](../pipelines/basic_scenario.md)
- The two following pipelines are part of a more [elaborate process](../advanced_pipelines/elaborate_scenario.md) and get triggered at different stages of that process:
    - [`Mainframe_Generate_Pipeline.groovy`](https://github.com/cpwr-devops/DevOps-Examples/tree/master/vars/Mainframe_Generate_Pipeline.groovy) - is a pipeline that gets triggered by an ISPW Generate and executes unit tests against those components that have been generated.
    - [`Mainframe_Integration_Pipeline.groovy`](https://github.com/cpwr-devops/DevOps-Examples/tree/master/vars/Mainframe_Integration_Pipeline.groovy) - is a pipeline that gets triggered by an ISPW Promote and executes functional/integration tests against the project/assignment.

## Mainframe_CI_Pipeline_from_Shared_Lib

This pipeline executes the following steps [after a developer has promoted their code in ISPW](../pipelines/basic_scenario.md):
- Retrieve the mainframe code from ISPW for later analysis by SonarQube
- Retrieve Topaz for Total Test test definitions for the corresponding ISPW application from GitHub
- Execute those test scenarios that belong to the COBOL programs that have been promoted
- Retrieve the Code Coverage metrics generated during test execution from the mainframe repository
- Pass all information (sources, test results, code coverage metrics) to SonarQube
- Receive a Sonar quality gate webhook callback and analyze the status of the quality gate
- If the quality gate was passed, continue the process by triggering an XL Release release template
- In either case (passed/failed), send an email to the developer informing them of the status of the pipeline

Comparing the [code in this example]() to the [basic example pipeline]() you will find that they differ only in a few minor details. One of the differences being that the "hard coded" configuration parameters are externalized into a configuration `.yml` file, allowing for changes in configuration without havng to change any pipeline code.

In these pages we describe in detail the way `Mainframe_CI_Pipeline_from_Shared_Lib` 
- [is setup in Jenkins](./setup.md)
- how it is configured using [configuration files](./config_files.md)
- [parameters](./parameters.md) that are passed into the pipeline, and which sources the values come from
- the [steps it executes](./steps.md)

## The other two pipelines

The other two pipelines follow the same principles, using the same configuration files, and helper classes as `Mainframe_CI_Pipeline_from_Shared_Lib`.

### Mainframe_Generate_Pipeline

This pipeline is supposed to be triggered via ISPW Webhook every time (COBOL) components get `generated` within ISPW. Following the trigger it will
- download those COBOL components that are part of the set resulting from the generate
- determine copybooks that are used by the downloaded components, and download the required copybooks
- retrieve Topaz for Total Test *unit tests* from a GitHub repository for the corresponding stream and application
- remove the results of the previous execution of the pipeline from the Code Coverage repository
- execute those unit test scenarios that correspond to the downloaded components
- retrieve the Code Coverage results from the Code Coverage repository
- send sources, test results and coverage metrics to SonarQube
- query the results of the corresponding SonarQube quality gate
- send a mail message to the owner of the set, informing them of the status of the quality gate

### Mainframe_Integration_Pipeline

This pipeline is supposed to be triggered via ISPW Webhook every time (COBOL) components get `generated` within ISPW. Following the trigger it will
- download those COBOL components that are part of the assignment, for which the promote was executed
- determine copybooks that are used by the downloaded components, and download the required copybooks
- retrieve Topaz for Total Test *functional tests* from a GitHub repository for the corresponding stream and application
- execute *all* functional test scenarios
- send sources and test results SonarQube
- query the results of the corresponding SonarQube quality gate
- if the quality gate was passed, it will trigger an XLRelease release template to orchestrate the following CD process
- send a mail message to the owner of the set informing them of the status of the quality gate
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTgyMzc0NDczLC0xMTEzNDEwNjM5XX0=
-->