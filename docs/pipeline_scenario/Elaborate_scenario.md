---
title: Elaborate CI Scenario
footer: MIT Licensed | Copyright © 2018 - Compuware
---

# A more elaborate CI scenario
In a more elaborate scenario the there are several stages at which Jenkins jobs get triggered, performing different tasks for each corresponding stage. The principles are the same, but in addition, there is also a set of functional/integration tests, and the unit tests get triggered after each generate of the code:

## Step 1 - Checking out Code
In Topaz a developer [checks out a set of sources, copybooks and other components](./) required to fulfill a specific requirement.

## Step 2 -  Creating/Maintaining Unit Tests
In Topaz [Topaz for Total Test](./TTT_scenario.md) the developer creates or modifies a set of unit tests for the modified programs. In order to share the unit tests between development teams and to use them in Jenkins, the Topaz for Total Test projects are stored and administered using Git/GitHub.

## Step 2a - Creating/Maintaining Functional Tests
In Topaz [Topaz for Total Test](./TTT_scenario.md) the developer or a QA person creates or modifies a set of functional tests for the application. In order to share the unit tests between development teams and to use them in Jenkins, the Topaz for Total Test projects are also stored and administered using Git/GitHub.

## Step 3 - Mainframe Generate
Once the code has been changed, the developer generates (compile, link, etc.) their code within ISPW. This generate (the corresponding *set container* in ISPW) will trigger the first Jenkins job via an ISPW webhhook [Mainframe_Generate_Pipeline.groovy](https://github.com/cpwr-devops/DevOps-Examples/tree/master/vars/Mainframe_Generate_Pipeline.groovy)) which runs the following process of 

- downloading the sources of exactly those (COBOL) tasks that have been generated within the set
- getting Topaz for Total Test **unit tests** for this ISPW application
- executing the **unit tests for exactly** the tasks that have been generated within the set
- getting Code Coverage metrics for the unit test executions
- passing all results to SonarQube
- querying the Sonar Quality Gate 
    - sending mail messages informing the developer about the status of the quality gate

The developer either continues coding or comes to a point when they think their code can be promoted.

## Step 4 - Mainframe Promote
Once the developer thinks they are done with development and unit testing they promote their code to the next level in the ISPW life cycle. This will trigger a second Jenkins job via a different ISPW webhook [Mainframe_Integration_Pipeline.groovy](https://github.com/cpwr-devops/DevOps-Examples/tree/master/vars/Mainframe_Integration_Pipeline.groovy) which runs a functional/integration testing process of

- downloading the sources of all (COBOL) tasks that are at the target level of the promotion
- getting Topaz for Total Test **functional tests** for this ISPW application
- executing **all functional tests**
- passing all results to SonarQube
- querying the Sonar Quality Gate 
    - in case the gate was passed, triggers an XL Release template to automate the next **release process** steps
    - sending mail messages informing the developer about the status of the quality gate

## The two Jenkins jobs
The two jobs use the same techniques (shared library) and classes that have been defined for the [Shared Library Example Pipeline](../shared_library/Mainframe_CI_Pipeline_from_Shared_Lib.md)