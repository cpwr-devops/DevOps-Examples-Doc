---
title: Configuration Files
footer: MIT Licensed | Copyright © 2018 - Compuware
---
# Configuration Files

The [Mainframe_CI_Pipeline_from_Shared_Lib](./readme.md#mainframe-ci-pipeline-from-shared-lib) uses two external `.yml` files, storing configuration information about the environment it is running in. Using Shared Library conventions, they reside in the `resources` folder of the Shared Library folder structure. The files in question are

- pipelineConfig.yml
- mailList.yml

Both files are being read using the `libraryResource` [method](https://www.jenkins.io/doc/pipeline/steps/workflow-cps-global-lib/#libraryresource-load-a-resource-file-from-a-shared-library), provided by Jenkins Shared Libraries and converted to `yaml` objects using the `readYaml` [method](https://www.jenkins.io/doc/pipeline/steps/pipeline-utility-steps/#readyaml-read-yaml-from-files-in-the-workspace-or-text), provided by the Pipeline Utility Steps plugin.

## pipelineConfig.yml

The `resources\pipelineConfig.yml` file contains configuration settings about the 'environment' the Jenkins pipeline is executing in/for, i.e. URLs of servers like SonarQube or XL Release and others. It is being processed by:

``` groovy
    configFile          = 'pipelineConfig.yml'
    def pipelineConfig  = readYaml(text: libraryResource(configFile))
```

The resulting `pipelineConfig` can then be used to access the configuration values, e.g.:

``` groovy
    pipelineConfig.git.tttRepoExtension
``` 

The content of the file is:
``` yml
git:
  url:                    "https://github.com"
  tttRepoExtension:       "_Total_Tests.git"
  branch:                 "master"
sq:
  scannerName:            "scanner"
  serverName:             "localhost"         
xlr:
  template:               "A Release from Jenkins"
  user:                   "admin"                   
ttt:
  general:
    folder:               "Tests"
    sonarResultsFolder:   "./TTTSonar"
    sonarResultsFile:     "generated.cli.suite.sonar.xml"
  virtualized:            
    folder:               "Virtualized_Tests"
    environment:          "123456789012345678901234"
    targetSonarResults:   "generated.cli.vt.suite.sonar.xml"
  nonVirtualized:
    folder:               "Non_Virtualized_Tests"                 
    environment:          "123456789012345678901234"
    targetSonarResults:   "generated.cli.nvt.suite.sonar.xml"
ces:
  url:                    "http://ces.url:2020"
ispw:
  runtime:                "ispw"
  changedProgramsFile:    "changedPrograms.json"
  mfSourceFolder:         "MF_Source"
```

To determine the appropriate values to use, refer to the [description of the pipeline parameters](./parameters.md)

## mailList.yml

The `resources\mailList.yml` file conatins a list of TSO user ID, mail address pairs. 

``` yml
ABC1234:    name@company.com
```

After reading the file, the result can be used to retrieve the email address based on the owner of the ISPW container and send mail message to the desired recipient:
``` groovy
mailListFile        = 'mailList.yml'
def mailList        = readYaml(text: libraryResource(mailListFile))
def mailRecipient   = mailList[(pipelineParams.ispwOwner.toUpperCase())]
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3MTM3ODM3MTddfQ==
-->