---
title: Continuous Integration (CI) Scenario
footer: MIT Licensed | Copyright © 2018 - Compuware
---

![Toolchain](../pipelines/images/jenkins_pipeline2.png)

# Continuous Integration (CI) Scenario

These examples of Jenkins pipelines make use of Compuware's and other plugins to implement the following process and scenario. They can be used to create a standardized approach for implementing a CI process for mainframe development. The scenario(s) and code are based on request and requirements from customers who already have started implementing their own pipeline and asked Compuware for advice. The code itself shows our solution to these, while the respective solutions as implemented by our customers are - in parts considerably - different.

The code reflects common patterns that we see emerging at different customers. In addition, the examples are supposed to help mainframe developers to familiarize with [Groovy](http://groovy-lang.org/documentation.html) and its concepts, as well as demonstrate some of the [idiosyncrasies of the Jenkins Groovy dialect](../pipelines/Jenkins_Groovy) that we stumbled across.

- **Step 1** In Topaz a developer checks out a set of sources, copybooks and other components required to fulfill a specific requirement.

- **Step 2** In Topaz [Topaz for Total Test](./TTT_scenario.md) the The developer creates or modifies a set of unit tests for the modified programs. In order to share the unit tests between development teams and to use them in Jenkins, the Topaz for Total Test projects are stored and administered using Git/GitHub.

- **Step 3** In Topaz once the developer has finished working on the code, they promote their changes from the `DEV1` level to `QA1`, the next level in the application's life cycle.
  
- **Step 4** Automatically in ISPW the promotion of from the `DEV1` level to the `QA1` level in ISPW creates an ISPW an containing all components that are part of this specific promotion.  Once the promotion completes, ISPW triggers a Jenkins job that executes a series of automated steps.  The Jenkins job is triggered via an [Webhook](../tool_configuration/webhook_setup.md).  The webhook also passes the [Parameters](../shared_library/pipeline_parameters.md) to the Jenkins job to control the execution.

- **Step 5** Automatically in Jenkins one of the below pipelines executes.  
  - For a simple self-contained pipeline example, the [Mainframe-CI-Example-pipeline](../pipelines/Mainframe-CI-Example-pipeline.md) can be used.  
  - For a more realistic enterprise grade example, the shared libraries in Jenkins should be used.  For shared library approach, the [Mainframe_CI_Pipeline_from_Shared_Lib](../shared_library/Mainframe_CI_Pipeline_from_Shared_Lib.md) should be used.
