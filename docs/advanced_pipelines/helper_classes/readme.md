---
title: Pipeline Helper classes
footer: MIT Licensed | Copyright © 2018 - Compuware
---

# Helper classes

The helper classes primarily serve as wrapper classes for use by  different methods used by the plugins. Other purposes include providing configuration data `PipelineConfig` or preparing `JCL` for a specific pipeline execution `JclSkeleton`.

## GitHelper

The [GitHelper](./GitHelper.md) class serves as a wrapper around the Git SCM plugin and provides these methods:

### [`GitHelper(steps)`](./GitHelper.md#GitHelper)

The constructor receives the `steps` from the pipeline to allow use of pipeline step within the class code.

### [`checkout(String gitUrl, String gitBranch, String gitCredentials, String tttFolder)`](./GitHelper.md#checkout)  

checks out the branch `gitBranch` in the Git(Hub) repository at `gitUrl`. It uses the `gitCredentials` to authenticate and places the cloned Git repository into the folder `tttFolder` within the Jenkins workspace.

### [`checkoutPath(String gitUrl, String gitBranch, String path, String gitCredentials, String gitProject)`](./GitHelper.md#checkoutPath) 

performs a *sparse checkout*, and checks out path `path` in the branch `gitBranch` in the project `gitProject` in the Git(Hub) repository at `gitUrl`. It uses the `gitCredentials` to authenticate.

## IspwHelper

The [IspwHelper](./IspwHelper.md) class serves as a wrapper around the Compuware ISPW plugin and provides these methods:  

### [`IspwHelper(steps, pConfig)`](./IspwHelper.md#ispwhelper) 

The constructor receives the `steps` from the pipeline to allow use of pipeline step within the class code and a [`PipelineConfig`](./#PipelineConfig) to make use of pipeline specific execution parameters.

### [`downloadAllSources(String ispwLevel)`](./IspwHelper.md#downloadallsources)

Downloads all COBOL sources and copybooks for the ISPW stream, application and level as stored in the `PipelineConfig`.

### [`downloadSources()`](./IspwHelper.md#downloadsources) 

Downloads all sources (COBOL programs and copybooks) contained in the [ISPW set](../../pipelines/basic_scenario.md) triggering the pipeline.

### [`downloadCopyBooks(String workspace)`](./IspwHelper.md#downloadcopybooks) 

Performs the following tasks:
- receives the path to the `workspace` for the pipeline job
- uses the `referencedCopyBooks` method to determine all copybooks used by the download COBOL programs
- uses a [`JclSkeleton`](./Jcl_skeletons.md) object's `createIebcopyCopyBooksJcl` method to create an `IEBCOPY` job `JCL` that copies all required copybooks in the list from the ISPW libraries into a temporary PDS
- submits this `JCL` using the [Topaz Utilities](https://wiki.jenkins.io/display/JENKINS/Compuware+Topaz+Utilities+Plugin) plugin
- downloads the content of the temporary PDS, using the [ISPW PDS downloader](https://wiki.jenkins.io/display/JENKINS/Compuware+Source+Code+Download+for+Endevor,+PDS,+and+ISPW+Plugin)
- uses the `JclSkeleton` method `jclSkeleton.createDeleteTempDsn` to create a `DELETE` job `JCL`
- and submits that `JCL`

### [`referencedCopyBooks(String workspace)`](./IspwHelper.md#referencedcopybooks) 

Performs the following tasks:
- receives the path to the `workspace` of the pipeline job
- searches all `*.cbl` program sources in the folder containing all downloaded sources and builds a list of COBOL programs
- for each program in the list it
  - reads the source file
  - scans the content for valid `COPY` statements (e.g. not comments)
  - determines the referenced copybook
  - add each copybook to the list of copybooks
- returns the resulting list of copybooks

### [`regressAssignmentList(assignmentList, cesToken)`](./IspwHelper.md#regressassignmentlist) 

Receives a list of assignment IDs in `assignmentList`, the [CES Token](../../tool_configuration/CES_credentials_token.md) in `cesToken` and calls method [`regressAssignment`](#regressassignment-assignment-cestoken) for each element of `assignmentList`

### [`regressAssignment(assignment, cesToken)`](./IspwHelper.md#regressassignment) 

Receives an Assignment ID in `assignment`, the [CES Token](../../tool_configuration/CES_credentials_token.md) in `cesToken` and uses the ISPW REST API to regress the assignment.

## JclSkeleton

The [JclSkeleton](./JclSkeleton.md) class allows the pipelines to customize pieces of `JCL` in certain, predefined ways. This allows changing e.g. `job cards`, `STEPLIB` concatenations and others during runtime. The `JCL` [skeletons](./Jcl_skeletons.md) are read from folder `./resources/skels` in the pipeline workspace.

### [`JclSkeleton(steps, String workspace, String ispwApplication, String ispwPathNum)`](./JclSkeleton.md#jclskeleton)

The constructor  receives the `steps` from the pipeline to allow use of pipeline step within the class code, the path to the pipeline `workpace`, the name of the ISPW application in `ispwApplication` and the [number of the development path](../../guidelines/ttt_scenario.md) in `pathNum`.


### [`initialize()`](./JclSkeleton.md#initialize) 

Is used for additional initialization which cannot be executed in the constructor and it:
  - reads the `JobCard.jcl` skeleton file
  - reads the `deleteDs.skel` skeleton file
  - reads the `cleanUpCcRepo.skel` skeleton file  
  - initializes the `IEBCOPY` `JCL` by using the [`buildIebcopySkel`](#buildiebcopyskel) method.

### [`buildIebcopySkel()`](./JclSkeleton.md#buildiebcopyskel)
Initializes the `IEBCOPY` `JCL` by
    - reading the `iebcopy.skel` skeleton file (main `JCL`)
    - reading the `iebcopyInDd.skel` skeleton file (input `DD` statements)
    - building the required `INDD=INx` cards
    - replacing the placeholders in the skeleton `JCL` by the concrete values
    - returning the resulting `JCL` code
    - 
### [`createIebcopyCopyBooksJcl(String targetDsn, List copyMembers)`](./JclSkeleton.md#createiebcopycopybooksjcl)

Receives the target DSN for the `IEBCOPY` job in `targetDsn` and the list of required copybooks in `copyMembers` and
  - builds a `SELECT MEMBER=` card for each entry in `copyMembers`
  - Uses method `buildFinalJcl` to build the final `JCL` passing
    - the `jobCardJcl` from `initialize`
    - the `iebcopyCopyBooksJclSkel` built previously in `initialize`
    - a map array of parameter markers and values
  - returns the resulting `JCL` code 

### [`createDeleteTempDsn(String targetDsn)`](./JclSkeleton.md#createdeletetempdsn)

Receives the target DSN for the `DELETE` job in `targetDsn` and
  - Uses method `buildFinalJcl` to build the final `JCL` passing
    - the `jobCardJcl` from `initialize`
    - the `cleanUpDatasetJclSkel` built previously in `initialize`
    - a map array of parameter markers and values
  - returns the resulting `JCL` code 

### [`createCleanUpCcRepo()`](./JclSkeleton.md#createcleanupccrepo)

  - Uses method `buildFinalJcl` to build the final `JCL` passing
    - the `jobCardJcl` from `initialize`
    - the `cleanUpCcRepoJclSkel` built previously in `initialize`
    - a map array of parameter markers and values
  - returns the resulting `JCL` code 

### [`buildFinalJcl(jobCard, jclSkel, parametersMap)`](./JclSkeleton.md#buildfinaljcl)

Receives a `jobCard`, a `jclSkel` skeleton JCL, a parameter map `parametersMap` and
  - places the `jobCard` in front of the `jclSkel` test
  - for each element in `parametersMap` replaces the corresponding parameter marker stored in `parmName` by the corresponding value stored in `parmValue`
  - returns the resulting `JCL` code

### [`readSkelFile(String fileName)`](./JclSkeleton.md#readskelfile)

Receives a `fileName` and
  - reads the corresponding file from the skeletons folder in the pipeline workspace
  - returns the content of the file as list of records

## PipelineConfig

The [PipelineConfig](./PipelineConfig.md) class stores and allows retrieval of any pipeline [configuration and runtime specific parameters](../parameters.md).

### [`PipelineConfig(steps, workspace, params, mailListLines)`](./PipelineConfig.md#pipelineconfig)

The constructor receives the `steps` from the pipeline to allow use of pipeline step within the class code, the path of the pipeline `workspace` the `Map` `params` containing the `key:value` parameter pairs from the [pipeline call](../readme.md#mainframe-ci-pipeline-from-shared-lib), and a the list of records from the [`mailList.config` file](../../tool_configuration/readme.md) and initializes all parameters that can be initialized immediately.

### [`initialize()`](.PipelineConfig#initialize) 

Is used for additional initialization which cannot be executed in the constructor and it:
- Deletes any old content from the pipeline workspace
- Uses the following methods to read configuration files and based on the content initialize further parameters:
  - [`setServerConfig`](#setserverconfig) to set server (Sonar, XLR, etc.) specific parameters
  - [`setTttGitConfig`](#settttgitconfig) to set parameters for the Git repository containing TTT assets
  - [`setMailConfig`](#setmailconfig) to build the map of ISPW owner IDs and corresponding email addresses.

### [`setServerConfig()`](.PipelineConfig#setserverconfig) 

Performs the following tasks:
- reads the pipeline configuration file [`pipeline.config`](../config_files.md#pipeline-config), containing server URLs (e.g. Sonar, XL Release) etc.
- extracts the values for the corresponding parameters
- sets the parameters

### [`setTttGitConfig()`](.PipelineConfig#settttgitconfig) 

Performs the following tasks:
- reads the pipeline configuration file [`tttgit.config`](../config_files.md#tttgit-config), containing information about the GitHub repository storing the Topaz for Total Test projects
- extracts the values for the corresponding parameters
- sets the parameters

### [`setMailConfig()`](.PipelineConfig#setmailconfig) 

Performs the following tasks:
- loops though the list of `mailListLines` containing the `TSO user:email` pairs
- turns the records into a `Map`
- determines the email address for the owner of the ISPW set and sets the parameter `mailRecipient` accordingly

### [`readConfigFile(String fileName)`](.PipelineConfig#readconfigfile) 

Reads a (configuration) file and returns the content with each line/record as an element of a list.

## SonarHelper

The [SonarHelper](./SonarHelper.md) class serves as a wrapper to execute the SonarQube scanner.

### [`SonarHelper(script, steps, pConfig)`](./SonarHelper.md#sonarhelper)

The constructor receives the `script`object and the `steps` from the pipeline  and a [`PipelineConfig`](./#PipelineConfig) to make use of pipeline execution specific parameters.

### [`initialize()`](./SonarHelper.md#initialize) 

Is used for additional initialization which cannot be executed in the constructor and determines the scanner home path.

### [`scan()`](./SonarHelper.md#scan) 

Determines the test results locations based on the assumption that the results have been created by Topaz for Total Unit Test. (If Functional Tests have been executed, uses the [`scan(pipelineType)`](#scan-pipelinetype) method.) It then uses the [`runScan`](#runscan) method to execute the Sonar scanner.

### [`scan(pipelineType)`](./SonarHelper.md##scan-pipelinetype)

Determines the test results locations based on the type of Topaz for Total tests, either unit tests or functional tests. It then uses the [`runScan`](#runscan) method to execute the Sonar scanner.

### [`checkQualityGate`](./SonarHelper.html#checkqualitygate)

Receives the results of the Sonar quality gate and returns its status.

### [`determineUtProjectName`](./SonarHelper.html#determineutprojectname)

Builds the name for the SonarQube project, if Topaz for Total Test unit tests were executed, and the pipeline is a "Generate" pipeline.

### [`determineFtProjectName`](./SonarHelper.html#determineftprojectname)

Builds the name for the SonarQube project, if Topaz for Total Test functional tests were executed, and the pipeline is a "Integrate" pipeline.

### [`determineUtResultPath`](./SonarHelper.html#determineutresultpath)

Builds the path to point to Topaz for Total Test unit test results files to be passed to Sonar.

### [`runScan`](./SonarHelper.html#runscan)

Prepares all parameters required for Sonar and executes the Sonar scanner:

- [`sonar.testExecutionReportPaths`](https://docs.sonarqube.org/display/SONAR/Generic+Test+Data) allows using a comma-separated list of paths the results of unit tests (Topaz for Total Test in our case) in the format required by the Sonar scanner.
- [`sonar.tests`](https://docs.sonarqube.org/display/SONAR/Analysis+Parameters) comma-separated list of folders containing unit tests (Topaz for Total Test projects in our case)
- [`coverageReportPaths`](https://docs.sonarqube.org/display/SONAR/Generic+Test+Data) path to code coverage results. With Xpediter Code Coverage the results will reside in `Coverage/Coverage.xml`.
- [`sonar.projectKey`](https://docs.sonarqube.org/display/SONAR/Analysis+Parameters) the SonarQube project key that is unique for each project. Our example pipelines use the [Jenkins environment variable](https://wiki.jenkins.io/display/JENKINS/Building+a+software+project) `JOB_NAME`.
- [`sonar.projectName`](https://docs.sonarqube.org/display/SONAR/Analysis+Parameters) the SonarQube project name that is unique for each project. Our example pipelines use the [Jenkins environment variable](https://wiki.jenkins.io/display/JENKINS/Building+a+software+project) `JOB_NAME`.
- [`sonar.projectVersion`](https://docs.sonarqube.org/display/SONAR/Analysis+Parameters) the SonarQube project version. The current examples to not modify the project version between executions.
- [`sonar.sources`](https://docs.sonarqube.org/display/SONAR/Analysis+Parameters) comma-separated paths to directories containing source files. With the ISPW downloader the sources reside in folder `<ispw_application>/MF_Source`.
- [`sonar.cobol.copy.directories`](https://docs.sonarqube.org/display/PLUG/COBOL+Plugin+Advanced+Configuration) comma-separated paths to COBOL copybooks.  With the ISPW downloader the sources reside in folder `<ispw_application>/MF_Source` and the `downloadCopyBooks` method of the [`IspwHelper`](./IspwHelper.md) class copybooks will reside in the same folder as the COBOL sources `<ispw_application>/MF_Source`.
- [`sonar.cobol.file.suffixes`](https://docs.sonarqube.org/display/PLUG/COBOL+Plugin+Advanced+Configuration) file suffixes for the Sonar scanner to identify files that need to be scanned.
- [`sonar.cobol.copy.suffixes`](https://docs.sonarqube.org/display/PLUG/COBOL+Plugin+Advanced+Configuration) file suffixes for the Sonar scanner to identify COBOL copybooks.

## TttHelper

The [TttHelper](./TttHelper.md) class serves as a wrapper around Topaz for Total Test related activities like, executing the unit tests for the downloaded programs in a loop, and gathering the results from Code Coverage.

### [`TttHelper(script, steps, pConfig)`](./TttHelper.md#ttthelper) 

The constructor receives the `script` object and the `steps` from the pipeline  and a [`PipelineConfig`](./PipelineConfig.md) to make use of pipeline execution specific parameters.

### [`initialize()`](./TttHelper.md#initialize) 

Is used for additional initialization which cannot be executed in the constructor and does the following:

- Instantiates a `JclSkeleton` for later use by `loopThruScenarios()`.
- Builds a list of downloaded COBOL sources 
- Builds a list of downloaded `.testscenarios`.

### [`loopThruScenarios()`](./TttHelper.md#loopthruscenarios)

Loops through the `.testscenarios` and for each scenario:
- determines if the scenario matches one of the COBOL programs
- in that case
  - the job card of the corresponding runner jcl gets replaced by the configuration job card
  - the scenario gets executed

### [`executeFunctionalTests`](./TttHelper.md#executefunctionaltests)

Will execute all Topaz for Total Test functional test scenarios previously downloaded from Git.

### [`passResultsToJunit()`](./TttHelper.md#passresultstojunit) 

Uses the JUnit plugin to display the unit test results on the pipeline dashboard (and stored results in the pipeline output).

### [`collectCodeCoverageResults()`](./TttHelper.md#collectcodecoverageresults) 

Uses the Xpediter Code Coverage plugin to retrieve code coverage results from the Xpediter Code Coverage repository.

### [`cleanUpCodeCoverageResults()`](./TttHelper.md#cleanupcodecoverageresults)

Uses a JCL Skeleton and the resolting JCL to clean up statistics from the previous build in the Code Coverage repository. This prevents the repository dataset to be cluttered by statistics that are not being used anymore.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwNDk3OTAxMDEsMTM5OTcyNDc3MiwtNj
czODE2NjI1LDE2ODM4MTkwNzcsLTIxMDAwNzYxODIsLTExNTMx
OTQ5NF19
-->