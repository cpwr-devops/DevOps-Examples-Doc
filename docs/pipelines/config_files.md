---
title: Configuration Files
footer: MIT Licensed | Copyright © 2018 - Compuware
---
# Configuration Files

The [Mainframe_CI_Pipeline_from_Shared_Lib](../pipelines/Mainframe_CI_Pipeline_from_Shared_Lib.md) uses two external files, storing configuration on the environment it is running in. There are two files stored externally (in a GitHub repository, in folder `(root)/config/pipeline`). The first two files will get downloaded from the GitHub repo and read during initialization of the `PipelineConfig` class. For a detailed description of the parameters refer to [the pipeline parameters](../pipelines/pipeline_parameters.md).

The values are stored as `parameter=value` pairs in records. Each record contains one pair. The parameter names must remain as they are. The values are processed a entered (trailing blanks will be ignored).

One file containing [email addresses](../tool_configuration/readme.md) that is controlled via the [Config File Provider](https://wiki.jenkins.io/display/JENKINS/Config+File+Provider+Plugin) plugin.

## pipeline.config

The `pipeline.config` file contains configuration settings about the 'environment' the Jenkins pipeline is executing in/for, i.e. URLs of servers like SonarQube or XL Release and others. 

## tttgit.config

The example scenarios use GitHub to store Topaz for Total Test unit test projects. The `tttgit.config` file stores information on which branch of the repository to use.