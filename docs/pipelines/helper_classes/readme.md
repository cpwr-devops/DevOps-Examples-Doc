---
title: Helper classes
footer: MIT Licensed | Copyright © 2018 - Compuware
---

# Helper classes

The helper classes primarily serve as wrapper classes for the use of the different methods used by the plugins. Other serve purposes like provided configuration data `PipelineConfig` or preparing `JCL` for one specific execution of a pipeline `JclSkeleton`.

## FileHelper

The [FileHelper](./FileHelper.md) class is used to read external files and provides the methods.  

- The constructor [FileHelper(steps)](./FileHelper.md#FileHelper). receives the `steps` from the pipeline to [allow use of pipeline step within the class code](../Jenkins_Groovy.md).  
- [readLines(String path)](./FileHelper.md#readLines) reads the records of a file at location `path` and returns an `ArrayList` of the individual records.

## GitHelper

The [GitHelper](./GitHelper.md) class serves as a wrapper around the Git SCM plugin and provides the methods [GitHelper(steps)](./GitHelper.md#GitHelper).

- The constructor receives the `steps` from the pipeline to [allow use of pipeline step within the class code](../Jenkins_Groovy.md).
- [checkout(String gitUrl, String gitBranch, String gitCredentials, String tttFolder)](./GitHelper.md#checkout) checks out the branch `gitBranch` in the Git(Hub) repository at `gitUrl`. It uses the `gitCredentials` to authenticate, and places the cloned Git repository into the folder `tttFolder` (within the Jenkins workspace).
- [checkoutPath(String gitUrl, String gitBranch, String path, String gitCredentials, String gitProject)](./GitHelper.md#checkoutPath) performs a *sparse checkout*, and checks out path `path` in the branch `gitBranch` in the project `gitProject` in the Git(Hub) repository at `gitUrl`. It uses the `gitCredentials` to authenticate.

## IspwHelper

The [IspwHelper](./IspwHelper.md) class serves as a wrapper around the Compuware ISPW plugin and provides the methods IspwHelper(steps, pConfig).  

- The constructor receives the `steps` from the pipeline to [allow use of pipeline step within the class code](../Jenkins_Groovy.md) and a [PipelineConfig](./#PipelineConfig) to make use of pipeline execution specific parameters.
- [downloadSources()](./IspwHelper.md#downloadSources) downloads all sources (COBOL programs and copybooks) contained in [ISPW set](../scenario/readme.md) triggering the pipeline.
- [downloadCopyBooks(String workspace)](./IspwHelper.md#downloadCopyBooks) does the following items:
  - receives the path to the `workspace` of the pipeline job
  - uses the `referencedCopyBooks` method to determine all copybooks used by the download COBOL programs
  - uses a [`JclSkeleton`](./Jcl_skeletons.md) object's `createIebcopyCopyBooksJcl` method to create an `IEBCOPY` job `JCL` that copies all required copybooks in the list from the ISPW libraries into a temporary PDS
  - submits this `JCL` using the [Topaz Utilities](https://wiki.jenkins.io/display/JENKINS/Compuware+Topaz+Utilities+Plugin) plugin
  - downloads the content of the temporary PDS, using the [ISPW PDS downloader](https://wiki.jenkins.io/display/JENKINS/Compuware+Source+Code+Download+for+Endevor,+PDS,+and+ISPW+Plugin)
  - uses the `JclSkeleton` method `jclSkeleton.createDeleteTempDsn` to create a `DELETE` job `JCL`
  - and submits that `JCL`
- [referencedCopyBooks(String workspace)](./IspwHelper.md#referencedCopyBooks) does the following items:
  - receives the path to the `workspace` of the pipeline job
  - searches all `*.cbl` program sources in the folder containing all downloaded sources and builds a list of COBOL programs
  - for each program in the list it
    - reads the source file
    - scans the content for valid `COPY` statements (e.g. not comments)
    - determines the referenced copybook
    - add each copybook to the list of copybooks
  - returns the resulting list of copybooks
- [regressAssignmentList(assignmentList, cesToken)](./IspwHelper.md#regressAssignmentList) receives a list of assignment IDs in `assignmentList`, the [CES Token](../../tool_configuration/CES_credentials_token.md) in `cesToken` and calls method `regressAssignment` for each element of `assignmentList`
- [def regressAssignment(assignment, cesToken)](./IspwHelper.md#regressAssignment) receives an Assignment ID in `assignment`, the [CES Token](../../tool_configuration/CES_credentials_token.md) in `cesToken` and uses the ISPW REST API to regress the assignment.

## JclSkeleton

The [JclSkeleton](./JclSkeleton.md) class allows the pipelines to customize pieces of `JCL` in certain, predefined ways. This allows changing e.g. `job cards`, `STEPLIB` concatenations and others during runtime. The `JCL` skeletons are read from folder ['./config/skels'](./Jcl_skeletons.md) in the pipeline workspace.

- The constructor [JclSkeleton(steps, String workspace, String ispwApplication, String ispwPathNum)](./Jcl_skeletons.md#JclSkeleton) receives the `steps` from the pipeline to [allow use of pipeline step within the class code](../Jenkins_Groovy.md), the path to the pipeline `workpace`, the name of the ISPW application in `ispwApplication` and the [number of the development path](../scenario/TTT_scenario.md) in `pathNum`.
- [initialize()](./Jcl_skeletons.md#initialize) is used for additional [initialization which cannot be executed in the constructor](../Jenkins_Groovy.md) and it:
  - reads the `JobCard.jcl` skeleton file
  - reads the `deleteDs.skel` skeleton file  
  - initializes the `IEBCOPY` `JCL` by using the `buildIebcopySkel` method
  - [buildIebcopySkel()](./Jcl_skeletons.md)  initializes the `IEBCOPY` `JCL` by
    - reading the `iebcopy.skel` skeleton file (main `JCL`)
    - reading the `iebcopyInDd.skel` skeleton file (input `DD` statements)
    - building the required `INDD=INx` cards
    - replacing the placeholders in the skeleton `JCL` by the concrete values
    - returning the resulting `JCL` code
- [createIebcopyCopyBooksJcl(String targetDsn, List copyMembers)](./Jcl_skeletons.md) receives the target DSN for the `IEBCOPY` job in `targetDsn` and the list of required copybooks in `copyMembers` and
  - places the `job card` from `initialize` in front of the `JCL` code
  - builds a `SELECT MEMBER=` card for each entry in `copyMembers`
  - replaces the placeholders in the skeleton `JCL` by the concrete values
  - returns the resulting `JCL`code [`createDeleteTempDsn(String targetDsn)`](./Jcl_skeletons.md)
  - receives the target DSN for the `DELETE` job in `targetDsn` and places the `job card` from `initialize` in front of the `JCL` code
  - adds the `DELETE` skeleton code
  - replaces the placeholders in the skeleton `JCL` by the concrete values
  - returns the resulting `JCL`code
- [readSkelFile(String fileName)](./Jcl_skeletons.md) receives a `fileName` and
  - reads the corresponding file from the skeletons folder in the pipeline workspace
  - returns the content of the file as list of records

## PipelineConfig

The [PipelineConfig](./PipelineConfig.md) class stores and allows retrieval of any pipeline [configuration and runtime specific parameters](../pipeline_parameters.md).

- The constructor [PipelineConfig(steps, workspace, params, mailListLines)](./PipelineConfig.md#PipelineConfig) receives the `steps` from the pipeline to [allow use of pipeline step within the class code](../Jenkins_Groovy.md), the path of the pipeline `workspace` the `Map` `params` containing the `key:value` parameter pairs from the [pipeline call](../Mainframe_CI_Pipeline_from_Shared_Lib.md), and a the list of records from the [`mailList.config` file](../../tool_configuration/readme.md) and initializes all parameters that can be initialized immediately.
- [initialize()](.PipelineConfig#initialize) is used for additional [initialization which cannot be executed in the constructor](../Jenkins_Groovy.md) and it:
  - deletes any old content from the pipeline workspace
  - Uses the `checkoutPath`method of the [`GitHelper` class](#GitHelper) to download the path containing the configuration files from the GitHub repository containing the configuration. (In future configuration files will be move to [Managed Files](../../tool_configuration/readme.md), thus avoiding to have to download configuration from GitHub and exposure of configuration on GitHub.)
  - execute the following internal methods to set the remaining configuration values
- [setServerConfig()](.PipelineConfig#setServerConfig) does the following items:
  - reads the pipeline configuration file `pipeline.config`, containing server URLs (e.g. Sonar, XL Release) etc.
  - extracts the values for the corresponding parameters
  - sets the parameters
- [setTttGitConfig()](.PipelineConfig#setTttGitConfig) does the following items:
  - reads the pipeline configuration file `tttgit.config`, containing information about the GitHub repository storing the Topaz for Total Test projects
  - extracts the values for the corresponding parameters
  - sets the parameters
- [setMailConfig()](.PipelineConfig#setMailConfig) does the following items:
  - loops though the list of `mailListLines` containing the `TSO user:email` pairs
  - turns the records into a `Map`
  - determines the email address for the owner of the ISPW set and sets the parameter `mailRecipient` accordingly
- [readConfigFile(String fileName)](.PipelineConfig#readConfigFile) uses an instance of the [`FileHelper`](#FileHelper) class to read the configuration files

## SonarHelper

The [SonarHelper](./SonarHelper.md) class serves as a wrapper to execute the SonarQube scanner.

- The constructor [SonarHelper(script, steps, pConfig)](./SonarHelper.md#SonarHelper) receives the `script`object and the `steps` from the pipeline  and a [`PipelineConfig`](./#PipelineConfig) to make use of pipeline execution specific parameters.
- [initialize()](./SonarHelper.md#initialize) is used for additional [initialization which cannot be executed in the constructor](../Jenkins_Groovy.md) and determines the scanner home path
- [scan()](./SonarHelper.md#scan) Executes the Sonar scanner. First it prepares all required parameters required for this scenario:
  - [`sonar.testExecutionReportPaths`](https://docs.sonarqube.org/display/SONAR/Generic+Test+Data) allows using a comma-separated list of paths the results of unit tests (Topaz for Total Test in our case) in the format required by the Sonar scanner.
  - [`sonar.tests`](https://docs.sonarqube.org/display/SONAR/Analysis+Parameters) comma-separated list of folders containing unit tests (Topaz for Total Test projects in our case)
  - [`coverageReportPaths`](https://docs.sonarqube.org/display/SONAR/Generic+Test+Data) path to code coverage results. With Xpediter Code Coverage the results will reside in `Coverage/Coverage.xml`.
  - [`sonar.projectKey`](https://docs.sonarqube.org/display/SONAR/Analysis+Parameters) the SonarQube project key that is unique for each project. Our example pipelines use the [Jenkins environment variable](https://wiki.jenkins.io/display/JENKINS/Building+a+software+project) `JOB_NAME`.
  - [`sonar.projectName`](https://docs.sonarqube.org/display/SONAR/Analysis+Parameters) the SonarQube project name that is unique for each project. Our example pipelines use the [Jenkins environment variable](https://wiki.jenkins.io/display/JENKINS/Building+a+software+project) `JOB_NAME`.
  - [`sonar.projectVersion`](https://docs.sonarqube.org/display/SONAR/Analysis+Parameters) the SonarQube project version. The current examples to not modify the project version between executions.
  - [`sonar.sources`](https://docs.sonarqube.org/display/SONAR/Analysis+Parameters) comma-separated paths to directories containing source files. With the ISPW downloader the sources reside in folder `<ispw_application>/MF_Source`.
  - [`sonar.cobol.copy.directories`](https://docs.sonarqube.org/display/PLUG/COBOL+Plugin+Advanced+Configuration) comma-separated paths to COBOL copybooks.  With the ISPW downloader the sources reside in folder `<ispw_application>/MF_Source` and the `downloadCopyBooks` method of the [`IspwHelper`](#IspwHelper.md) class copybooks will reside in the same folder as the COBOL sources `<ispw_application>/MF_Source`.
  - [`sonar.cobol.file.suffixes`](https://docs.sonarqube.org/display/PLUG/COBOL+Plugin+Advanced+Configuration) file suffixes for the Sonar scanner to identify files that need to be scanned.
  - [`sonar.cobol.copy.suffixes`](https://docs.sonarqube.org/display/PLUG/COBOL+Plugin+Advanced+Configuration) file suffixes for the Sonar scanner to identify COBOL copybooks.

## TttHelper

The [TttHelper](./TttHelper.md) class serves as a wrapper around Topaz for Total Test related activities like, executing the unit tests for the downloaded programs in a loop, and gathering the results from Code Coverage.

- The constructor [TttHelper(script, steps, pConfig)](./TttHelper.md#TttHelper) receives the `script`object and the `steps` from the pipeline  and a [`PipelineConfig`](./#PipelineConfig.md) to make use of pipeline execution specific parameters.

- [initialize()](./TttHelper.md#initialize) is used for additional [initialization which cannot be executed in the constructor](../Jenkins_Groovy.md) and does the following:
  - Instantiates a `JclSkeleton` for later use by `loopThruScenarios()`.
  - Builds a list of downloaded COBOL sources and a list of downloaded `.testscenarios`.

- [loopThruScenarios()](./TttHelper.md#loopThruScenarios) loops through the `.testscenarios` and for each scenario:
  - determines if the scenario matches one of the COBOL programs
  - in that case
    - the job card of the corresponding runner jcl gets replaced by the configuration job card
    - the scenario gets executed

- [passResultsToJunit()](./TttHelper.md#passResultsToJunit) uses the JUnit plugin to display the unit test results on the pipeline dashboard.

- [collectCodeCoverageResults()](./TttHelper.md#collectCodeCoverageResults) uses the Xpediter Code Coverage plugin to retrieve code coverage results from the Xpediter Code Coverage repository.