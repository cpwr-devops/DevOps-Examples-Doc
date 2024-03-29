---
title: Introduction to Jenkins Plugins
footer: MIT Licensed | Copyright © 2018 - Compuware
---

# Introduction to Jenkins Plugins

![Plugins](./images/Plugins.png)

The examples - especially the two [primary pipelines](../pipelines/basic_scenario.md) - use plugins that may not be part of a standard installation of Jenkins; this will likely be the case for the Compuware plugins. All plugins described here can be obtained from the Jenkins plugin marketplace using *Manage Jenkins* -> *Manage Plugins*.

::: tip
???Jenkins allows generating pipeline syntax based on plugins. For the Compuware plugin we point to the correct location in the corresponding description to help you find the correct entries in the selection boxes to find the required plugin.
:::

## Compuware plugins

Compuware provides a continuously growing set of plugins that allow connecting to the mainframe and using Compuware (and other) tools within a Jenkins job/pipeline.

### Compuware Common Configuration

The [Compuware Common Configuration](https://plugins.jenkins.io/compuware-common-configuration) plugin allows defining and storing configuration settings that are used by and shared between the other Compuware plugins. 

::: tip
There is no code that can be or needs to be generated to use the plugin.
:::

### Compuware ISPW Operations Plugin
The [Compuware ISPW Operations Plugin](https://plugins.jenkins.io/compuware-ispw-operations) allows using ISPW REST API operations without having to code native http requests.

::: tip
In the Pipeline Syntax generator, the plugin can be accessed via the *Sample Step* dropdown entries 
- **ispwOperation** - for http requests against the ISPW REST API
- **ispwRegisterWebhook** - to create and return an ISPW webhook
- **ispwWaitForWehook** - to wait for an ISPW webhhok
:::

### Compuware Source Code Download for Endevor, PDS, and ISPW

The [Compuware Source Code Download for Endevor, PDS, and ISPW](https://plugins.jenkins.io/compuware-scm-downloader) plugin allows downloading source code and other assets stored in mainframe SCM tools:

- ISPW
- Endevor
- Plain PDS

::: tip
In the Pipeline Syntax generator, the plugin can be accessed via the *Sample Step* dropdown entry **checkout**, followed by the *SCM* dropdown entries:

- **ISPW Container**
- **ISPW Repository** 
- **Endevor**, or 
- **PDS**

respectively.
:::

### Compuware Topaz for Total Test

The [Compuware Topaz for Total Test](https://plugins.jenkins.io/compuware-topaz-for-total-test) plugin allows execution of Topaz for Total Test unit and functional test scenarios and suites and retrieving of the results. The results will be downloaded and stored in *html* format as well as *xml* format for further use by SonarQube. Collection of Xpediter Code Coverage data can be triggered alongside the execution of the unit tests.

::: tip
In the Pipeline Syntax generator, the plugin can be accessed via the *Sample Step* dropdown entry **step**, followed by the *Build Step* dropdown entry **Topaz for Total Test**.
:::

### Compuware Xpediter Code Coverage

The [Compuware Xpediter Code Coverage](https://plugins.jenkins.io/compuware-xpediter-code-coverage) plugin allows querying an Xpediter Code Coverage repository and downloading the results. These results will be stored in *xml* format for further use by SonarQube.

::: tip
In the Pipeline Syntax generator, the plugin can be accessed via the *Sample Step* dropdown entry **step**, followed by the *Build Step* dropdown entry **Retrieve Xpediter Code Coverage Statistics**.
:::

### Compuware Topaz Utilities

The [Compuware Topaz Utilities](https://wiki.jenkins-ci.org/display/JENKINS/Compuware+Topaz+Utilities+Plugin) plugin will provide a collection of utilities around interfacing to and using tools on mainframes. In its first version it allows execution of and checking JCL return codes. The JCL may be stored in PDS members on the mainframe or in string variables during execution.

::: tip
In the Pipeline Syntax generator, the plugin can be accessed 
- either via the *Sample Step* dropdown entries **topazSubmitFreeFormJcl** or **topazSubmitJclMembers**
- or via the *Sample Step* dropdown entry **step**, followed by the *Build Step* dropdown entries **Topaz submit free-form JCL** or **Topaz submit JCL members**.
:::

## Installing the Topaz Workbench CLI

This interface is delivered with the Topaz Workbench full install download and can be installed using the provided setup.exe. In this dialog select the tab **CLI** and select either Windows or Linux installation.

The CLI must be installed locally to the Jenkins server.

![Installing CLI](./images/Install_CLI.png)

## Third party plugins

Other plugins that are used by the examples are:

### Pipeline Utility Steps

The [Pipeline Utility Steps](https://plugins.jenkins.io/pipeline-utility-steps) plugin provides a set of script methhods that are being used in the examples like

- `findFiles`   to search for files by name pattern
- `zip`         to create zip archives
- `unzip`       to unzip archives

### Config File Provider

The [Config File Provider](https://plugins.jenkins.io/config-file-provider) allows defining files and storing their content within Jenkins, thus allowing you to define configuration files that do not have to be stored on disk within repository (e.g. the Git) storing the *jenkinsfile*.

### Credentials Binding Plugin

Some plugins/methods, like the `httpRequest`, require the use of plain text credentials or tokens rather than using credential IDs as provided by the Jenkins Credentials manager. The [Credentials Binding Plugin](https://plugins.jenkins.io/credentials-binding) allows converting a Jenkins credentials ID into a variable containing the plain text stored in the credential definition. Thus, these plugins can be used without having to expose any plain *secret* texts within the code of the scripts.
<!--stackedit_data:
eyJoaXN0b3J5IjpbNzIzNTc1ODI4XX0=
-->