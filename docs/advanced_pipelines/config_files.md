---
title: Configuration Files
footer: MIT Licensed | Copyright © 2018 - Compuware
---
# Configuration Files

The [Mainframe_CI_Pipeline_from_Shared_Lib](./readme.md#mainframe-ci-pipeline-from-shared-lib) uses two external files, storing configuration on the environment it is running in. Using Shared Library conventions, they reside in the `resources` folder of the Shared Library folder structure. There are two files stored in the subfolder `pipeline`. These two files will get read during initialization of the `PipelineConfig` class. For a detailed description of the parameters refer to [the pipeline parameters](./parameters.md).

The values are stored as `parameter=value` pairs in records. Each record contains one pair. The parameter names must remain as they are. The values are processed a entered (trailing blanks will be ignored).

One additional file, containing [email addresses](../tool_configuration/readme.md), is controlled via the [Config File Provider](https://wiki.jenkins.io/display/JENKINS/Config+File+Provider+Plugin) plugin.

## pipeline.config

The `resources\pipeline\pipeline.config` file contains configuration settings about the 'environment' the Jenkins pipeline is executing in/for, i.e. URLs of servers like SonarQube or XL Release and others.

```
SQ_SCANNER_NAME=xxxx 
SQ_SERVER_NAME=xxxx 
SQ_SERVER_URL=xxxx
XA_TESTER_SERVER_URL=xxxx
MF_SOURCE_FOLDER=xxxx
XLR_TEMPLATE=xxxx
XLR_USER=xxxx                           
TTT_FOLDER=xxxx
ISPW_URL=xxxx
ISPW_RUNTIME=xxxx         
``` 

## tttgit.config

The example scenarios use GitHub to store Topaz for Total Test unit test projects. The `resources\pipeline\tttgit.config` file stores information on which branch of the repository to use.

```
TTT_GIT_TARGET_BRANCH=xxx
TTT_GIT_BRANCH=master
```