---
title: Elaborate CI Scenario
footer: MIT Licensed | Copyright © 2018 - Compuware
---

# A more elaborate CI scenario
In a more elaborate scenario the there are several stages at which Jenkins jobs get triggered, performing different tasks for each corresponding stage. The principles are the same, but in addition, there is also a set of non-virtualized functional/integration tests, and the virtuelized unit tests get triggered after each generate of the code:

## Step 1 - Check out Code
In Topaz, a developer [checks out a set of sources, copybooks and other components](./) that are required to fulfill a specific requirement.

## Step 2 -  Create/Maintain Unit Tests
In Topaz [Topaz for Total Test](../guidelines/ttt/ttt_scenario.md) the developer creates or modifies a set of virtualized unit tests for the modified programs. In order to share the unit tests between development teams and to use them in Jenkins,  these Topaz for Total Test projects are stored and administered using Git/GitHub.

## Step 2a - Create/Maintain Functional Tests
In Topaz [Topaz for Total Test](../guidelines/ttt/ttt_scenario.md) the developer or a QA person creates or modifies a set of non-virtualized functional tests for the application. In order to share the tests between development teams and to use them in Jenkins, these Topaz for Total Test projects are also stored and administered using Git/GitHub.

## Step 3 - Mainframe Generate
Once the code has been changed, the developer generates (compile, link, etc.) their code within ISPW. This generate, and the corresponding *set container* in ISPW, will trigger a Jenkins job, that [determines the operation](./readme.md#calling-script-mainframe-combined-pipeline) and for a generate executes [Mainframe_Generate_Pipeline.groovy](https://github.com/cpwr-devops/DevOps-Examples/tree/master/vars/Mainframe_Generate_Pipeline.groovy) which runs the following process:

- downloading the sources of exactly those (COBOL) tasks that have been generated within the set
- getting Topaz for Total Test tests for this ISPW application
- executing the **virtualized tests for exactly** the tasks that have been generated within the set
- getting Code Coverage metrics for the test executions
- passing all results to SonarQube using a project name that consists of the
    - Owner of the set
    - ISPW Stream name
    - ISPW Application name
- querying the Sonar Quality Gate 
    - sending mail messages informing the developer about the status of the quality gate

The developer either continues coding or comes to a point when they think their code can be promoted.

## Step 4 - Mainframe Promote
Once the developer thinks they are done with development and (unit) testing they promote their code to the next level in the ISPW life cycle. This will trigger the same Jenkins job, which again [determines the operation](./readme.md#calling-script-mainframe-combined-pipeline) and this time for the promote executes [Mainframe_Integration_Pipeline.groovy](https://github.com/cpwr-devops/DevOps-Examples/tree/master/vars/Mainframe_Integration_Pipeline.groovy) which runs a functional/integration testing process:

- downloading the sources of all (COBOL) tasks that are at the target level of the promotion
- getting Topaz for Total Test tests for this ISPW application
- executing **all non virtualized tests**
- passing all results to SonarQube using a project name that consists of:
    - ISPW Stream name
    - ISPW Application name
- querying the Sonar Quality Gate 
    - in case that the gate was passed, an XL Release template is triggered to automate the next **release process** steps
    - sending mail messages informing the developer about the status of the quality gate

::: tip Note
Storing the two `.groovy` scripts as `vars` in the Shared Library allows re-using simple scripts as "modules" and combining them to more complex processes.
:::
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTM3MTQ5MTMxOSwtNTMxMjQzMTIsLTYxOT
c2NDYyXX0=
-->