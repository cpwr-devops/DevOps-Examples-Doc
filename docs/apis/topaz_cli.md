---
title: Topaz CLI
footer: MIT Licensed | Copyright © 2018 - Compuware
---
# Topaz CLI

The Topaz CLI (Command Line Interface) allows actions to be triggered on the mainframe without the need for the Topaz Eclipse Graphical User Interface (GUI).  The Topaz CLI can be used to automate various tasks from a variety of different methods such as from an integration server or within a build tool Jenkins or other CI servers.

The Topaz CLI is distributed via the full Topaz Workbench installation media and may be used to execute a set of Topaz and ISPW related functions from a batch/shell interface. A 64-bit Java Runtime Environment (JRE) is required for the Topaz CLI. Refer to the *Topaz&reg; Workbench Installation Guide* for full installation details.  

After [installation](../tool_configuration/plugins.md#installing-the-topaz-workbench-cli), the command line interface folder contains a set of `.bat` files that can be used to execute the required functions.  

These are

`.bat` file | description
----------- | -----------
`CodeCoverageCLI.bat` | Allows downloading results from a Xpediter Code Coverage repository by specifying the repository name, system name and test ID.
`IspwCLI.bat` | Used for the Git to ISPW integration
`SCMDownloaderCLI.bat` | Allows interaction with the ISPW downloader to download sources from ISPW repositories, Endevor repositories or PDS 
`SubmitJclCLI.bat` | Allows submitting JCL on the mainframe and retrieving the return code
`TotalTestFTCLI.bat` | Allows execution of Topaz for Total Test scenarios and suites. This includes Total Test scenarios (.scenario) as well as unit test scenarios (.testscenario)
`TotalTestCLI.bat` | Deprecated. Use TotalTestFTCLI instead. Allows execution of Topaz for Total Test unit test scenarios and suites.

## Workspace

The Topaz Workbench CLI will want create a workspace to use during execution. Also, it will want to write to the `configuration` folder. Therefore, the user executing the Topaz Workbench CLI will:

- either need write access to the installation folders (containing the `configuration` folder) and the default workspace
- or will have to specify a workspace folder using the `-data` parameter during execution

For example:

```
CodeCoverageCLI.bat -data C:\Users\cwde-rnuesse\Compuware\Topaz\TopazCLIWorkspace
```

will create a workspace in the user's profile, copy the `configuration` folder into that workspace and use that workspace and it's content for execution. All `.bat` files may use the same workspace, once that has been created by any one of the files.

## Getting "online" help

Executing any of the `.bat` files without parameters, or with just the `-data` parameter, or with the `-help` parameter will return the help pages for the respective file. For example using the previous command will result in the following output:

```
Code Coverage CLI started, version = 19.02.01. 
Program arguments were not passed in the ALL_ARGS environment variable, will use the Eclipse command line to parse. 
usage: Code Coverage CLI
    --cc.ddio.overrides <arg>   comma separated list of DDIO overrides
    --cc.repos <arg>            the code coverage repository (dataset
                                name)
    --cc.sources <arg>          comma separated list of source folders
                                where the source has been downloaded
    --cc.system <arg>           the code coverage system name
    --cc.test <arg>             the code coverage test name
 -code <arg>                    the code page for the connection
 -help                          print help
 -host <arg>                    the host name or IP to be connected
 -id <arg>                      the user name
 -pass <arg>                    the user password
 -port <arg>                    the port to be connected
 -targetFolder <arg>            the target folder where the source will be
                                downloaded
 -timeout <arg>                 the timeout (in minutes) for the
                                connection
The host parameter is not specified. 
Code Coverage CLI ended with status = 4. 
```

## Common parameters

Several parameters are common between the `.bat` files. These are:

Parameter | Description
--------- | -----------
`-code <arg>` | the code page for the connection
`-help` | print help
`-host <arg>` | the host name or IP to be connected
`-id <arg>` | the user name
`-pass <arg>` | the user password (in clear text)
`-port <arg>` | the port to be connected
`-protocol <arg>` | the encryption protocol for the connection (None, Auto, SSLv3, TLS, TLSv1, TLSv1.1, TLSv1.2)
`-timeout <arg>` | the timeout (in minutes) for the connection

## Specific parameters

In addition to the above parameters, the `.bat` files use parameters specific to each individual file.

## Xpediter Code Coverage (CodeCoverageCLI.bat)

The Xpediter Code Coverage CLI downloads code coverage results from from Xpediter and generates a code coverage file that SonarQube can consume. 

Parameter | Description
--------- | -----------
`-cc.ddio.overrides <arg>` | comma separated list of DDIO overrides
`-cc.repos <arg>` | the code coverage repository (dataset name)
`-cc.sources <arg>` | comma separated list of source folders where the source has been downloaded to
`-cc.system <arg>` | the code coverage system name
`-cc.test <arg>` | the code coverage test name
`-targetFolder <arg>` | the target folder where the data will be downloaded to

### Example using Code Coverage Results

The following example will download the Code Coverage results from repository `'HDDRXM0.DEMO.COCO.REPOS'`, using the system `RXN3`, and test ID `646`. All resources reside on host `my.mainframe.host`, communicating on port `16196`. The results will be downloaded to the `Coverage` sub folder of the specified target folder. The sources to compare the Code Coverage results against are expected to reside in sub folder `RXN3\MF_Source`. (The latter requires that the sources of the programs in question have been downloaded already to the specified folder.)

```
@echo off

REM
REM Script to download CoCo results using the Topaz CLI
REM 
REM **********************************************************
REM Configuration Variables for the Script
REM
REM Change according to your environment
REM 
REM **********************************************************
REM
REM CLIPath  Installation Path of your Topaz CLI 
REM JAVA_HOME Installation Path of Java
 
SET "CLIPath=C:\Program Files\Compuware\Topaz Workbench CLI 1921\"
SET "workspace=C:\Users\cwde-rnuesse\Compuware\Topaz\TopazCLIWorkspace"
SET "targetFolder=C:\Users\cwde-rnuesse\Compuware\Topaz\TopazCLIWorkspace"
SET "host=my.mainframe.host"
SET "port=16196"
SET "codepage=1047"
SET "user=++++++++"
SET "pw=********"

SET "repo=HDDRXM0.DEMO.COCO.REPOS"
SET "test=646"
SET "system=RXN3"
SET "sources=RXN3\MF_Source"

SET "JAVA_HOME=C:\Program Files\Java\jdk1.8.0_101"

"%CLIPath%"CodeCoverageCLI.bat -host %host% -port %port% -id %user% -pass %pw% -code %codepage% -timeout "0" -targetFolder %targetFolder% -data %workspace% -cc.repos %repo% -cc.test %test% -cc.system %system% -cc.sources %sources%
```

## SCM Downloader CLI (SCMDownloaderCLI.bat)

The SCM Downloader CLI downloads source code from ISPW, PDS or Endevor.

Parameter | Description
--------- | -----------
`-ext <arg>` | the file extension for the downloaded source files
`-filter <arg>` | the filter patterns for the source location on the host
`-ispwComponentType <arg>` | the ISPW component type
`-ispwContainerName <arg>` | the ISPW container name
`-ispwContainerType <arg>` | the ISPW container type (0 - assignment, 1 - release, 2 - set)
`-ispwDownloadAll <arg>` | Whether to keep the workspace in sync
`-ispwFilterFiles <arg>` | the ISPW filter files checkbox
`-ispwFilterFolders <arg>` | the ISPW filter folders checkbox
`-ispwFolderName <arg>` | the ISPW folder name
`-ispwLevelOption <arg>` | the ISPW level option (0 - selected level only, 1 - level and above)
`-ispwServerApp <arg>` | the ISPW server application
`-ispwServerConfig <arg>` | the ISPW server config
`-ispwServerLevel <arg>` | the ISPW server level
`-ispwServerStream <arg>` | the ISPW server stream
`-scm <arg>` | the source code management type (ispw - repository downloader, ispwc - container downloader, endevor - Endevor downloader)
`-targetFolder <arg>` | the target folder where the source will be downloaded

### Example using the ISPW container downloader

The following example will download all COBOL components and copybooks from ISPW assignment (`-ispwContainerType "0"`) `RXN3000007`, using the container downloader (`-scm "ispwc"`). Sources will be downloaded, regardless weather they have been changed or not (`ispwDownloadAll "true"`)
The resources reside on host `my.mainframe.host`, communicating on port `16196`. 
The downloaded sources will end up in the sub folder `<application>/MF_Source` (in the example `RXN3\MF_Source`) of the specified target folder name.

```
@echo off

REM
REM Script to download sources from ISPW using the Topaz CLI
REM 
REM **********************************************************
REM Configuration Variables for the Script
REM
REM Change according to your environment
REM 
REM **********************************************************
REM
REM CLIPath  Installation Path of your Topaz CLI 
REM
REM JAVA_HOME Installation Path of Java

SET "CLIPath=C:\Program Files\Compuware\Topaz Workbench CLI 1921\"
SET "workspace=C:\Users\cwde-rnuesse\Compuware\Topaz\TopazCLIWorkspace"
SET "host=my.mainframe.host"
SET "port=16196"
SET "codepage=1047"
SET "user=++++++++"
SET "pw=********"

SET "scm=ispwc"
SET "container=RXN3000007"
SET "contType=0"
SET "downloadAll=true"

SET "JAVA_HOME=C:\Program Files\Java\jdk1.8.0_101"

"%CLIPath%"SCMDownloaderCLI.bat -host %host% -port %port% -id %user% -pass %pw% -code %codepage% -timeout "0" -targetFolder %workspace% -data %workspace% -scm %scm% -ispwContainerName %container% -ispwContainerType %contType% -ispwDownloadAll %downloadAll%
```

### Example using the ISPW repository downloader

The following example will download all COBOL components and copybooks from ISPW stream `FTSDEMO`, application `RXN3`, from level `DEV1` only (`-ispwLevelOption "0"`), using the repository downloader (`-scm "ispw"`). Sources will be downloaded, regardless weather they have been changed or not (`ispwDownloadAll "true"`)
The resources reside on host `my.mainframe.host`, communicating on port `16196`.
The downloaded sources will end up in the sub folder `<application>/MF_Source` (in the example `RXN3\MF_Source`) of the specified target folder name.

```
@echo off

REM
REM Script to download sources from ISPW using the Topaz CLI
REM 
REM **********************************************************
REM Configuration Variables for the Script
REM
REM Change according to your environment
REM 
REM **********************************************************
REM
REM CLIPath  Installation Path of your Topaz CLI 
REM
REM JAVA_HOME Installation Path of Java
 
SET "CLIPath=C:\Program Files\Compuware\Topaz Workbench CLI 1921\"
SET "workspace=C:\Users\cwde-rnuesse\Compuware\Topaz\TopazCLIWorkspace"
SET "targetFolder=C:\Users\cwde-rnuesse\Compuware\Topaz\TopazCLIWorkspace"
SET "host=my.mainframe.host"
SET "port=16196"
SET "codepage=1047"
SET "user=++++++++"
SET "pw=********"

SET "scm=ispw"
SET "stream=FTSDEMO"
SET "application=RXN3"
SET "level=DEV1"
SET "levelOption=0"
SET "filterFiles=true"
SET "filterFolders=false"
SET compType="COB,COPY"
SET "downloadAll=true"

SET "JAVA_HOME=C:\Program Files\Java\jdk1.8.0_101"

"%CLIPath%"SCMDownloaderCLI.bat -host %host% -port %port% -id %user% -pass %pw% -code %codepage% -timeout "0" -targetFolder %targetFolder% -data %workspace% -scm %scm% -ispwServerStream %stream% -ispwServerApp %application% -ispwServerLevel %level% -ispwLevelOption %levelOption% -ispwFilterFiles %filterFiles% -ispwFilterFolders %filterFolders% -ispwComponentType %compType% -ispwDownloadAll %downloadAll%
```

### Example using the PDS downloader

The following example will download all members from PDS `'SALESSUP.RXN3.DEV1.COB'`, using the PDS downloader (`-scm "ispw"`). Sources will be downloaded, regardless weather they have been changed or not (`ispwDownloadAll "true"`)
The resources reside on host `my.mainframe.host`, communicating on port `16196`. The results will be downloaded to the workspace. 
The downloaded sources will end up in specified target folder in one sub folder per PDS in the list that contained members. 

For example:

```
<workspace-root>
+- RXN3
    +- MF_Source_PDS
        +- SALESSUP.RXN3.DEV1.COB
        +- SALESSUP.RXN3.PRD.COB
```

if there are no members in the `QA1` or `STG` PDS.

```
@echo off

REM
REM Script to download sources from PDS using the Topaz CLI
REM 
REM **********************************************************
REM Configuration Variables for the Script
REM
REM Change according to your environment
REM 
REM **********************************************************
REM
REM CLIPath  Installation Path of your Topaz CLI 
REM
REM JAVA_HOME Installation Path of Java
 
SET "CLIPath=C:\Program Files\Compuware\Topaz Workbench CLI 1921\"
SET "workspace=C:\Users\cwde-rnuesse\Compuware\Topaz\TopazCLIWorkspace"
SET "targetFolder=C:\Users\cwde-rnuesse\Compuware\Topaz\TopazCLIWorkspace\RXN3\MF_Source_PDS"
SET "host=my.mainframe.host"
SET "port=16196"
SET "codepage=1047"
SET "user=++++++++"
SET "pw=********"

SET "scm=pds"
SET filter="SALESSUP.RXN3.DEV1.COB,SALESSUP.RXN3.QA1.COB,SALESSUP.RXN3.STG.COB,SALESSUP.RXN3.PRD.COB"
SET extension=cbl

SET "JAVA_HOME=C:\Program Files\Java\jdk1.8.0_101"

"%CLIPath%"SCMDownloaderCLI.bat -host %host% -port %port% -id %user% -pass %pw% -code %codepage% -timeout "0" -targetFolder %targetFolder% -data %workspace% -scm %scm% -filter %filter% -ext %extension%
```

## ISPW CLI (IspwCLI.bat)

The ISPW CLI synchronizes source from Git to ISPW.

Parameter | Description
--------- | -----------
`-gitBranch <arg>` | The target Git branch name
`-gitCommit <arg>` | The Git commit hash (long or short) or a colon-delimited list of file paths in the workspace
`-gitFromHash <arg>` | A Git hash to start syncing a list of commits which is not included in the sync, or -1 for multibranch project support
`-gitLocalPath <arg>` | The location of the local Git repository
`-gitPassword <arg>` | Git password
`-gitRepoUrl <arg>` | Git Repository URL
`-gitUsername <arg>` | Git user name
`-ispwCheckoutLevel <arg>` | The test level to check components out to
`-ispwContainerCreation <arg>` | The option to indicate how often to create a new ISPW container
`-ispwContainerDescription <arg>` | The custom description to be used for the ISPW container
`-ispwServerApp <arg>` | The ISPW application
`-ispwServerConfig <arg>` | the ISPW server config
`-ispwServerStream <arg>` | The ISPW stream name
`-operation <arg>` | the ISPW operation to perform
`-targetFolder <arg>` | the target folder where the output of the operation will be saved.

For an example using the CLI (the plugin to be precise) refer to the [Git to ISPW Integration - A Tutorial](../guidelines/ispw/GIT_to_ISPW_Integration_Tutorial.md).

## Submit JCL (SubmitJclCLI.bat)

The SubmitJcl CLI submits JCL jobs to the mainframe.

Parameter | Description
--------- | -----------
`-jcl <arg>` | a comma separated list of jcl lines to submit as a JCL job.
`-jcldsns <arg>` | a comma separated list of sequential datasets or PDS(MEMBER) names to submit as JCL jobs.
`-maxcc <arg>` | the maximum job condition code which will allow JCL submissions to continue.

### Example of Submitting JCL residing on the mainframe

This example will submit two jobs on host `my.mainframe.host`, communicating on port `16196`. If the return code of any of the jobs is greater than `4` the subsequent jobs will not be submitted and the pipeline will fail with an `error`.

```
@echo off

REM
REM Script to submit JCL from PDS using the Topaz CLI
REM 
REM **********************************************************
REM Configuration Variables for the Script
REM
REM Change according to your environment
REM 
REM **********************************************************
REM
REM CLIPath  Installation Path of your Topaz CLI 
REM
REM JAVA_HOME Installation Path of Java
 
SET "CLIPath=C:\Program Files\Compuware\Topaz Workbench CLI 1921\"
SET "workspace=C:\Users\cwde-rnuesse\Compuware\Topaz\TopazCLIWorkspace"
SET "host=my.mainframe.host"
SET "port=16196"
SET "codepage=1047"
SET "user=++++++++"
SET "pw=********"

SET maxcc=4
SET jclMems="HDDRXM0.DEMO.JCL(CWXTJCLC),HDDRXM0.DEMO.JCL(CWXTIMS)"

SET "JAVA_HOME=C:\Program Files\Java\jdk1.8.0_101"

"%CLIPath%"SubmitJclCLI.bat -host %host% -port %port% -id %user% -pass %pw% -code %codepage% -timeout "0" -data %workspace% -maxcc %maxcc% -jcldsns %jclMems%
```

### Example Submitting JCL residing locally in a file

The following example will submit a JCL that resides locally in file `C:\temp\JCL.txt` on host `my.mainframe.host`, communicating on port `16196`. If the return code of any of the jobs is greater than `4` the pipeline will fail with an `error`.

```
@echo off

REM
REM Script to submit JCL from local file using the Topaz CLI
REM
REM **********************************************************
REM Configuration Variables for the Script
REM
REM Change according to your environment
REM
REM **********************************************************
REM
REM CLIPath  Installation Path of your Topaz CLI 
REM
REM JAVA_HOME Installation Path of Java

SET "CLIPath=C:\Program Files\Compuware\Topaz Workbench CLI 1921\"
SET "workspace=C:\Users\cwde-rnuesse\Compuware\Topaz\TopazCLIWorkspace"
SET "host=my.mainframe.host"
SET "port=16196"
SET "codepage=1047"
SET "user=++++++++"
SET "pw=********"

SET maxcc=4
SET "jclFile=c:\temp\JCL.txt"

SET "JAVA_HOME=C:\Program Files\Java\jdk1.8.0_101"

"%CLIPath%"SubmitJclCLI.bat -host %host% -port %port% -id %user% -pass %pw% -code %codepage% -timeout "0" -data %workspace% -maxcc %maxcc% -jcl %jclFile%
```

## Total Test CLI (TotalTestFTCLI.bat)

With the Topaz for Total Test CLI interface you can execute Total Test scenarios (.scenario files) as well as unit test scenarios (.testscenario files).
There are many options for how you can execute test scenarios. You can specify a folder path and an environment ID or host+port, and the CLI interface will locate all relevant test scenario files in the folder, generate a test suite, execute this and optionally publish the results to the Total Test server. You can also point to a specific test scenario or test suite. If you point to a test scenario file, the CLI will automatically generate a test suite and produce result for the suite similar to using a folder. The generated test suite will be placed in a Suites folder under the folder being executed, and the execution result and logs will be placed in the Output folder. In this way the CLI works similar to Topaz, and results can be found and looked at in a consistent way.
The CLI will typically be used from a Continuous Integration server like Jenkins, where test scenario files have been checked out from the Version Control System. The same test scenarios that have been created and executed manually in Eclipse can now be executed automatically through the CLI interface.

The CLI interface will generate a log file in the logs directory in the location specified by the workspace directory. This log file can be used to track down and understand issues in an execution.

::: tip
In releases prior to the 20.05.01 release you had to use the unit test CLI (described later) for testing unit test scenarios. This is not necessary anymore. The TotalTestFTCLI is the "One CLI" that can handle all test scenario executions and the unit test CLI has been deprecated.
:::

### Test using 'SQL Select' or 'SQL Update'
When testing a Total Test scenario that contains one or more of the SQL Select or SQL Update elements, additional initial setup of the CLI installation must be done. These palette elements require DB2 jar files on the classpath for using JDBC to access DB2 on the mainframe, and these jar files must be available. By default the CLI looks for these jar files in \<install directory\>/dbDrivers. The user responsible for the CLI installation must create the directory and copy the customer specific DB2 jar files to this directory. Typically there are two jar files, one with the DB2 driver and one with the DB2 license. They are typically named db2jcc.jar and db2jcc_license_cisuz.jar.

Optionally the user can specify the environment variable TTT\_DB\_DRIVERS_PATH. The variable must be set to the directory containing the user specific DB2 jar files.

### CLI Arguments
The CLI interface is executed from a Windows or Linux terminal by writing:
`./TotalTestFTCLI.sh` or `TotalTestFTCLI.bat`
This will show the help for using the CLI as illustrated below.

```
usage: TotalTestFTCLI
 -a,--accounting-info <arg>                Optional job accounting
                                           information. Use the accounting
                                           information parameter to enter
                                           an account number and any other
                                           accounting information that
                                           your installation requires.
 -ccclear,--ccclearstats <arg>             Specifies whether the Code
                                           Coverage repository statistics
                                           should be cleared before
                                           running the test. Valid values
                                           are 'true' or 'false'. The
                                           default value is 'true'.
 -ccrepo,--ccrepository <arg>              The name of the Code Coverage
                                           repository dataset. Must be
                                           specified to enable Code
                                           Coverage.
 -ccsys,--ccsystem <arg>                   Code Coverage system. Must be
                                           specified to enable Code
                                           Coverage.
 -cctid,--cctestid <arg>                   Code Coverage test id. Must be
                                           specified to enable Code
                                           Coverage.
 -ces,--ces-url <arg>                      CES serve URL used for license
                                           check
 -cesp,--ces-password <arg>                CES server password
 -cesu,--ces-userid <arg>                  CES server userid
 -cfgdir,--configuration-directory <arg>   Path to the configuration
                                           directory containing JCL
                                           skeletons and properties. Only
                                           used when the server option is
                                           not used (running without
                                           repository server)
 -cid,--customerid <arg>                   Customer Id used for cloud
                                           license check
 -cju,--compare-junits                     Optional Indicates that JUnit
                                           from this execution should be
                                           compared to the baseline JUnit
 -ctxvars,--context-variables <arg>        Context variables as ID/value
                                           pairs in the form
                                           "id1=value1,id2=value2"
 -e,--environment <arg>                    Environment in which to execute
                                           test scenarios
 -f,--file <arg>                           File or folder path to the
                                           Total Test .xactx file(s) to
                                           execute. Can be absolute or
                                           relative to the root-folder
 -faip,--file-aid-service-ip <arg>         File-AID service Host/IP
                                           address
 -fap,--file-aid-service-port <arg>        File-AID service port
 -faw,--file-aid-workspace <arg>           File-AID service workspace
 -G,--copy-reports-to-report-folder        Copy SonarQube reports to the
                                           report folder root.
 -h,--halt-at-failure                      Halt the execution when first
                                           test scenario fails
 -help                                     print this message
 -host,--host <arg>                        Host for connection
 -j,--runner-jcl <arg>                     Unit test runner jcl location.
                                           Only used when the -f parameter
                                           points to a .testscenario file
                                           that should be run with
                                           hardcoded JCL
 -l,--launcher <arg>                       Optional Launcher where the CLI
                                           is called from. Used for
                                           creating corrrect zAdviser
                                           events. C=CLI (Default),
                                           J=Jenkins, X=XebiaLabs
 -log,--loglevel <arg>                     The logging level. Must be ERROR, WARNING, INFO, 
                                           DEBUG, TRACE or ALL. The default is INFO.
 -noju,--nojunit                           If specified, no JUnit file
                                           will be created.
 -norep,--noreport                         If specified, no report file
                                           will be created for unit tests.
 -nores,--noresult                         If specified, no result file
                                           will be created for unit test.
 -nosq,--nosonar                           If specified, no Sonarqube file
                                           will be created.
 -p,--password <arg>                       tso password
 -pn,--program-names <arg>                 Comma separated list of program
                                           names to be tested. Will only
                                           include test scenarios that
                                           have component under test
                                           defined as one of these
 -pnf,--program-names-file <arg>           Path to a json file containing
                                           the program names to be tested.
                                           Will only include test
                                           scenarios that have component
                                           under test defined in this json
                                           file
 -port,--port <arg>                        Port for connection
 -r,--root-folder <arg>                    Optional path to the folder
                                           containing the root of all
                                           source. Is used to name test
                                           scenarios with correct file
                                           paths from the file structure.
                                           If not defined, it will be set
                                           to the same value as the file
                                           parameter
 -R,--recursive                            Recursively find all relevant
                                           test scenarios
 -S,--source-folder <arg>                  Optional file path to a folder
                                           that contains source code of
                                           tested programs. Default value
                                           is 'cobol'. Is only used to set
                                           the source path in code
                                           coverage reports.
 -s,--server <arg>                         Address to the CES Server, e.g.
                                           https://server.topaztotaltest.c
                                           om/totaltestapi/. Can be left
                                           out which will result in no
                                           repository usage
 -sid,--siteid <arg>                       Site Id used for cloud license
                                           check
 -u,--userid <arg>                         tso userid
 -U,--use-scenario-files                   Find scenario files instead of
                                           context files and auto generate
                                           a context file for the selected
                                           environment for each scenario
                                           found
 -v,--sonar-version <arg>                  SonarQube version - either 5
                                           or 6. Default value is 6
 -x,--upload-result                        Upload result to server
```
The `--enviroment` (or the `--host` and `--port`) and the `--file` arguments are the primary ones, and the `--userid` and `--password` arguments for the TSO credential to be used. If the `--file` argument is relative, the `--root-folder` parameter is required. It is used to calculate the relative path to the folder being executed and this path is set at the result in the Functional Test server as the External Reference (if `--upload-result` option is used). Normally the root folder will be the folder to which files have been checked out from version control. With the Jenkins plugin the root folder will be set to the Jenkins workspace unless the `--file` path is absolute.
SonarQube and JUnit output files are also generated and placed in the TTTSonar and TTTUnit directories relative to the root folder given in the `--root-folder` parameter.

### Finding test scenarios
The CLI will by default look for and use .context files. A context file contain all the necessary runtime information in order to execute the scenario file. From release 20.04.01 .context files are created both for Total Test scenario files as well as unit test scenario files. The context file contains the id of the environment/host connection on which test scenarios are to be executed. The `--environment` parameter value given to the CLI must match the environmentId defined in the context file. It is also possible to specify the host connection ip address and port instead of the environment id. In this way the CLI makes sure to only find and execute the test scenarios that have been used for a particular host connection / environment.
It is possible to use the parameter `--use-scenario-files` to search for all .scenario files and use a default execution context created from the parameters given to the CLI. The parameter `--recursive` can be used to recursively traverse the folder structure under the `--file` path to search for test scenarios.
Example on finding all context files recursively in the current directory
```
TotalTestFTCLI.bat --environment testenv --file . --recursive -s https://totaltest.xyz.com/totaltestapi/ -u XATUSER -p 123456
```
Same example, but using host and port instead of environment. Be aware that it will pick the first Batch environment from the repository server matching the host+port.
```
TotalTestFTCLI.bat -host 1.2.3.4 -port 16196 --file . --recursive -s https://totaltest.xyz.com/totaltestapi/ -u XATUSER -p 123456
```
Example of executing all test scenarios under the Accounting folder where a git repository, GitProject containing test cases have been checked out to the folder /test/ws.
```
TotalTestFTCLI.bat --environment testenv --root-folder /test/ws --file GitProject/Accounting --recursive --use-scenario-files -s https://totaltest.xyz.com/totaltestapi/  -u XATUSER -p 123456
```

### Executing unit test scenarios with specific runner JCL
It is possible to run a unit test scenario file directly with the CLI similar to using the deprecated unit test CLI. With this approach it will be necessary to provide the runner JCL file to be used for the executed with the `--runner-jcl`, or `-j` option. In this way it is possible to execute old and new unit test scenarios "the old way" where hard coded runner JCL is used. When using dynamically generated JCL and load libraries provided through the context file, it will not be necessary to use the `--runner-jcl` option. However, both approaches can be used and its up to the user which approach to use.
Example of executing a unit test scenario with hard coded runner.jcl
```
TotalTestFTCLI.bat --host 1.2.3.4 --port 19196 --file /a/b/Scenarios/test.testscenario --runner-jcl /a/b/JCL/runner.jcl -cfgdir /a/c/TotalTestConfiguration -u XATUSER -p 123456
```

::: warning IMPORTANT 
In the 20.5.1 release, using the `--runner-jcl` parameter will require that the TotalTestConfiguration project to be present (option --configuration-directory or -cfgdir), or that the repository server is available (option --server or -s). This is actually a requirement for all CLI executions. In a future release this requirement will probably be removed when executing unit test scenarios directly with hard coded runner JCL to make it easier to setup the CLI execution since the information from the project/server in this use case is not required.
:::

### Using the Total Test repository server and CES with authentication
When using the Total Test repository server and CES has user authorization enabled, it is necessary to specify the CES userid and password in order to access the server. This is done with the parameters `--ces-user` (`-cesu`) and `--ces-password` (`-cesp`).
Example on command for CES with authorization
```
TotalTestFTCLI.bat -host 1.2.3.4 -port 16196 -cesu johnd -cesp 654321 --file . --recursive -s https://totaltest.xyz.com/totaltestapi/ -u XATUSER -p 123456
```

### Works with and without the Total Test repository server
The CLI can be used to execute batch test scenarios for customers where the Total Test repository server has not been setup. In this case, the `--server` parameter is simply excluded. The environment id for which to execute is found in the hostconnections.tttcfg file located under the TotalTestConfiguration folder as the id for the connection. It is also possible, and easier, to simply specify the host and port with the `-host` and `-port` options. When the `--server` parameter is not specified, the CLI will expect the TotalTestConfiguration folder to be located under the `--root-folder` path. If it is located elsewhere, for instance on a shared folder on a Jenkins server, the parameter `--configuration-directory` can be used to give a path to the TotalTestConfiguration folder, including the folder name itself.
Example of not using the repository and assuming that the TotalTestConfiguration folder is located in the current folder
```
TotalTestFTCLI.bat -host 1.2.3.4 -port 16196 testenv --file . --recursive -u XATUSER -p 123456
```
Example of not using the repository where a root path is given and another path to the TotalTestConfiguration folder. This could be a setup for a Jenkins server
```
TotalTestFTCLI.bat -host 1.2.3.4 -port 16196 --root-folder /testdata/jenkins/ws/ --configuration-directory /testdata/config/TotalTestConfiguration --file . --recursive -u XATUSER -p 123456
```

### Using Topaz for Enterprise Data
If any of the test cases to be executed use the Topaz for Enterprise Data element, the CLI must setup the parameters required by TED. These include the `--ces-url` parameter and optionally the `--siteid` and `--customerid` if cloud licensing is used. Furthermore the File-AID services ip address and port (for the Connection Manager), and the File-AID workspace must be set by the parameters `--file-aid-service-ip`, `--file-aid-service-port`, and `--file-aid-workspace`.
Example of not using the repository and assuming that the TotalTestConfiguration folder is located in the current folder
```
TotalTestFTCLI.bat -host 1.2.3.4 -port 16196 --root-folder /testdata/jenkins/ws/ --file . --ces-url http://ces.xyz.com --file-aid-service-ip 1.2.3.4 --file-aid-service-port 1234 --file-aid-workspace utils/fileaidws --recursive -u XATUSER -p 123456
```
The File-AID workspace can be copied from a Topaz workspace to where the CLI is to be used. The File-AID workspace directory is located in the .com.compuware.fileaid.ex folder under the workspace root. Default location is C:\Users\<userid>\Compuware\Workbench\workspace\.com.compuware.fileaid.ex.
In the above example the absolute path to the File-AID workspace is /testdata/jenkins/ws/utils/fileaidws/, and this folder must contain the folder .com.compuware.fileaid.ex.

### Intelligent test case execution
The CLI can be used to intelligently selecting only the test scenarios related to specific programs. The program names to be tested can be given as a comma separated list of names to the `--program-names` parameter, or the `--program-names-file` parameter can be used to give a path to a json file containing the programs that have changed. The format of the json file is the same as ISPW can produce after a generate, and in this way a pipeline can be setup to get ISPW find programs that have changed and Total Test can then find the test cases to test.
Format of the JSON file looks like below.
``` JSON
{
  "version": "1.0.0",
  "programs": [
    {
      "version": "1.0.0",
      "programName": "XARISCAL",
      "programLanguage": "COB",
      "isImpact": true,
      "application": "KTTA",
      "stream": "CPWR",
      "level": "DEV1"
    }
  ]
}
```

Example of not using the repository and given programs names directly. If more than one name is given, the comma separated list must be inside "".
```
TotalTestFTCLI.bat -host 1.2.3.4 -port 16196 --file . --program-names "XARISCAL,XAPGMTST" --recursive -u XATUSER -p 123456
```
Example of not using the repository and given programs names through a json file.
```
TotalTestFTCLI.bat -host 1.2.3.4 -port 16196 --file . --program-names-file /testdata/jenkins/ws/changedPrograms.json --recursive -u XATUSER -p 123456
```
### Overriding Context parameters
Several parameters can be added to the CLI command which will override the values set in the individual context files. This includes code coverage options, accounting info used to submit jobs, what result files that are generated and the log level.
It is also possible to override context variables. Context variables are key/value pairs that have been setup by a user in the execution dialog and saved in the .context file. The context variables are available by the test engine and can be used to parameterize a test scenario. From the CLI, context variables can be provided by the user, and these will override the values in the .context files which will end up as variables in the test scenarios being executed.
Example of providing two context variables level and customerId. Test scenarios that have been setup to use these parameters will get the values provided in the argument, i.e. level and 1234. The argument needs to be encapsulated by double quotes.
```
TotalTestFTCLI.bat -host 1.2.3.4 -port 16196 --file . --context-variables "level=PDSE,customerId=1234" --recursive -u XATUSER -p 123456
```

## Deprecated Total Test Unit Test CLI (TotalTestCLI.bat)

The Total Test Unit Test CLI runs Total Test unit tests.  The test suite or scenario must have been defined in the Topaz for Total Test Unit Test Eclipse client. The command line tools expect a complete Topaz for Total Test Unit Test project structure.
::: danger
The Total Test Unit Test CLI has been deprecated and will be removed in a future release. Instead the TotalTestFTCLI.bat CLI, described before, should be used. It can handle execution of unit test scenarios as well as Total Test scenarios.
:::

### Usage
Executing unit test scenarios is done with the `TotalTestCLI.bat` file. The general syntax for using the `TotalTestCLI.bat` is 
```
TotalTestCLI.bat -cmd=<command> options
```
The most important command is the `runtest` command, which will excute all of the other commands in sequence. Each command uses an individual set of options and can be seen in details in later sections.

### Complete End to End Run
Use the runtest command to perform a complete end to end run of a Topaz for Total Test test suite or test scenario. See [Test Runner](#test-runner-parameters-options) for more information. For example:
```
TotalTestCLI.bat -cmd=runtest -h=mfhost -pt=10239 -u=tsoab71 -pw=AKznXY -p=c:\Users\Username\Compuware\Workbench\workspace\TotalTestProject -ts=CWXTCOB_Scenario.testscenario -te=1047 -j=Runner.jcl
```
This example will execute all the test cases in "CWXTCOB_Scenario.testscenario" for project "TotalTestProject" on host "mfhost" using port "10239" and log on information UserID "tsoab71" with password "AKznXY" and submit "Runner.JCL".

### Execute Individual Steps
If you want to execute the individual steps, one at a time, to run a test, execute them in this order:
1. Use the build command to create the binary input files for the test case(s) using the Binary Builder. See [Binary Builder](#binary-builder-parameters-options) for more information.
2. Use the upload command to upload the binary files created by the Binary Builder to the mainframe. See [File Transfer](#file-transfer-parameters-options) for more information.
3. Use the submit command to submit the JCL to execute the Topaz for Total Test Runner on the mainframe. Note that the binary files need to be uploaded before submitting the JCL to execute the Test Runner. See [JCL Submit](#jcl-submit-parameters-options) for more information.
4. Use the download command to retrieve the result from the mainframe Topaz for Total Test Test Runner execution. See  [File Transfer](#file-transfer-parameters-options) for more information.
5. Use the parse command to unpack the binary test results file created by the Topaz for Total Test Runner. See [Binary Parser](#binary-parser-parameters-options) for more information.
6. Use the resultcheck command to analyze the test results against the test check conditions. The result checker will output test archive files containing the test results. See Result Checker](#result-checker-parameters-options) for more information.

The batch script is in the directory where the Topaz Workbench CLI was installed. To execute the script, the configuration directory must be writable.

::: tip
If you install CLI in the default location (C:\Program Files\Compuware\Topaz Workbench CLI) or a Read-only location, you must add the -data parameter to specify the path to your workspace, for example:
```
TotalTestCLI.bat -cmd=<command> options -data=C:\Users\Username\Compuware\Workbench\workspace
```
The error message `The configuration area at C:\Program Files\Compuware\Topaz Workbench CLI\configuration is not writable. Please choose a writable location using the '-configuration' line command.`
is an indication that the -data parameter is required.
:::

A challenge with using the individual commands in sequence - instead of using the `runtest` command - is that using the `upload`, the CLI will 'randomly' generate names for the target binary files on the mainframe (To be more precise, the 'ID' qualifier is generated randomly). Currently, there is no known, simple way to control these names or determine which names have been generated. Therefore, we will concentrate on the `runtest` command.

### CLI commands
The following table lists the valid commands to invoke them from the command line. For options see the parameters explained below for each CLI component.
Command | Component          | Description
--------- |------------------ | ----------------------------------
`build` | Binary Builder |Parses a test suite or test scenario and creates the required binary files.
`upload` | File Transfer |Uploads the parsed local binary files to the target host system.
`submit` | JCL Submit |Submit JCL to run a test.
`download` | File Transfer |Downloads the test results from the target host to a local file.
`parse` | Binary Parser|Parses the local binary result file and updates the archive (history).
`resultscheck` | Result Checker |Parses the updated archive  (history), applying the check conditions to the output data and updating the archive accordingly.
`runtest` | Test Runner |Performs all the above commands (in the specified order).

All options have the following format:
`parameter=value`
If the value contains spaces, the entire option must be enclosed in quotes, for example:
`"-t=c:\TotalTestProject\Unit Test\Suites\SimpleTest.testsuite"`
To set the logging level of the CLI tools logging output, see [Debug Options](#debug-options).

### Debug Options
The following table lists the debug parameters that can be used for all commands.

Parameter | Abbr. | Description
---------|---------|-----------
`-loglevel` | -log | The logging level. Must be INFO, WARN, DEBUG or ERROR. The default is INFO.
`-logparms` | -lp | Indicates if the various components run parameters should be logged before the run. Must be TRUE or FALSE. The default is TRUE.

### Test Runner - parameters/options
The Test Runner component allows for the complete end to end run of a Topaz for Total Test test suite or test scenario. The following tables list the input and optional parameters that must be provided in addition to the required parameters for all CLIs, i.e. host, port, user, password :

**Test Runner input parameters**
| Parameter/Option | Abbr.&nbsp;&nbsp;&nbsp;&nbsp;| Description |
--------- | -----------|---------------
`-host` | -h | The host name or IP address of the target host.
`-port` | -pt | The port the host is listening on.
`-user` | -u | The name of the user (userID) to connect to the host with.
`-password`| -pw | The password associated with the userID.
`-project` | -p| The Total Test project folder.
`-testsuite` | -ts | The name of a test suite from the Suites folder or the name of a test scenario from the Scenario folder.
`-testsuitelist` | -tsl | Specifies a comma delimited list of test scenarios/suites names to be run. Test scenarios/suites names can contain the wildcard characters asterisk (*) to indicate any characters or a question (?) to indicate a single character. 'All_Scenarios' can be used to run all scenarios. 'All_Suites' can be used to run all test suites.
`-jcl` | -j | The name of a JCL file from the JCL folder.
`-jcldsn` | -jdsn| The name of a dataset containing the JCL to submit.
`-targetencoding` | -te | The character encoding (charset) used on the target platform. Default is '1047'.
`-noreport` | | If specified with the -p option, no report file will be created.
`-noresult` | | If specified with the -p option, no result file will be created.
`-nojunit` | | If specified with the -p option, no JUnit file will be created.
`-nosonar` | | If specified with the -p option, no Sonar file will be created.
`-ccrepository` | -ccrepo | The name of the Code Coverage repository dataset. Must be specified to enable Code Coverage.
`-ccsystem` | -ccsys | Code Coverage system. If not specified with '-ccrepo', defaults to the test suite or test scenario name.
`-cctestid` | -cctid | Code Coverage test id. If not specified with '-ccrepo', defaults to the test suite or test scenario name.
`-ccstepname` | -ccstep | Specifies the Topaz for Total Test step name. Should be used if the Topaz for Total Test step is contained in a cataloged procedure.
`-ccprogramtype` | -cctype | Specifies the main executable program (this is the program specified on the 'EXEC PGM=' JCL statement in runner*.JCL) for Code Coverage. Specify: (-cctype=DB2 when the main program is IKJEFT01 or IKJEFT1B for live Db2, -cctype=TOTALTEST when the main program is TTTRUNNR, -cctype=IMS when the main program is DFSRRC00 for live IMS)
`-ccclearstats` | -ccclear | Specifies whether the Code Coverage repository statistics should be cleared before running the test. Valid values are 'true' or 'false'. The default value is 'true'.
`-externaltoolsworkspace` | -etws | Specifies the workspace of an external tool. This argument requires the 'postruncommands' argument be specified.
`-postruncommands` | -prc | Specifies the commands to be run after test completion. Currently only 'CopyJUnit' and 'CopySonar' are supported. If both are specified, they should be separated by a comma. This command requires the 'externaltoolsworkspace' argument be specified. 'CopyJUnit' will copy the JUnit results to the directory TTTJUnit, in the location specified by the external tools workspace argument. 'CopySonar' will copy the Sonar results to the directory TTTSonar, in the location specified by the external tools workspace argument.

::: tip
-jcl and -jcldsn cannot both be used in the same statement. Specify either -jcl or -jcldsn.
:::

**Test Runner optional parameters**
Parameter/Option | Abbr. |	Description
--------- | -----------|---------------
`-dsnhlq` | -hlq | High level qualifier to be used when allocating datasets.
`-wait` | -w | Indicates if component waits for test completion. Must be TRUE or FALSE. The default is TRUE.
`-maxwait` | -mw | The number of minutes to wait for the test to complete. The default is 20 minutes.
`-useStubs` | -us | Indicates if the test should use stubs. Must be TRUE or FALSE. The default is TRUE.
`-backuparchive` | -ba | Indicates if the archive file should be backed up. The file will be time stamped and placed in the History project folder. Must be TRUE or FALSE. The default is TRUE.
`-deletetemp` | -dt | Indicates if temporary files are to be deleted. Must be TRUE or FALSE. The default is TRUE.

#### Example of using `runtest`
The followwing example will execute the suite `CWXTSUBC.testsuite` residing in Topaz for Total Test project `project=C:\Users\cwde-rnuesse\Compuware\Topaz\Workspace\Unit CWXTSUBC 1.0`, on host `my.mainframe.host`, communicating on port `16196`, using the `Runner.jcl` file for the job to submit.

```
@echo off

REM
REM Script to submit JCL using the Topaz CLI
REM 
REM **********************************************************
REM Configuration Variables for the Script
REM
REM Change according to your environment
REM 
REM **********************************************************
REM
REM CLIPath  Installation Path of your Topaz CLI 
REM
REM JAVA_HOME Installation Path of Java
 
SET "CLIPath=C:\Program Files\Compuware\Topaz Workbench CLI 1921\"
SET "workspace=C:\Users\cwde-rnuesse\Compuware\Topaz\TopazCLIWorkspace"
SET "host=my.mainframe.host"
SET "port=16196"
SET "codepage=1047"
SET "user=++++++++"
SET "pw=********"

SET "project=C:\Users\cwde-rnuesse\Compuware\Topaz\Workspace\Unit CWXTSUBC 1.0"
SET "suite=CWXTSUBC"
SET "JCL=Runner.jcl"

"%CLIPath%"TotalTestCLI.bat -data=C:\Users\cwde-rnuesse\Compuware\Topaz\TopazCLIWorkspace -cmd=runtest -host=%host% -port=%port% -user=%user% -pw=%password% "-project=%project%" "-testsuite=%suite%.testsuite" -te=%codepage% "-j=%JCL%"
```

### Binary Builder - parameters/options
The Binary Builder component parses a test suite or test scenario and creates the binary input file (containing the binary input data), and the reference file (containing the test case references).
The following tables lists the input, output and optional parameters that must be provided.

**Input parameters**
Parameter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Abbr.  | Description
------- | --------- | ---------
`-testsuite` | -t  | Test suite or test scenario name, if project is specified. Otherwise must be the full path name to the test suite or test scenario.
`-targetencoding` | -te  | The character encoding (charset) used on the target platform. Default is '1047'.

**Output parameters**
Parameter | Abbr.  | Description
------- | --------- | ---------
`-archive` | -a | The archive created containing all test data. See Optional Parameters for more information.
`-binput` |-bin | The binary input data file. See Optional Parameters for more information.
`-binref` |-brf | The binary reference file. See Optional Parameters for more information.

**Optional output parameters**
Parameter | Abbr.  | Description
------- | --------- | ---------
`-project` | -p | The Topaz for Total Test project folder. If specified, the archive, binary input file and reference file do not need to be specified. The files will be placed on the associated project folders.

### File Transfer - parameters/options
File Transfer transfers binary files to and from the target host. The following tables lists the input, common and upload parameters that must be provided:
**File Transfer Input Parameter**
Parameter | Abbr.  | Description
------- | --------- | ---------
`-command` | -cmd | The command to be executed. Must be either 'upload' or 'download'.

**File Transfer Common Parameters**
Parameter | Abbr.  | Description
------- | --------- | ---------
`-host` | -h | The host name or IP address of the target host.
`-port` | -pt | The port the host is listening on.
`-user` | -u | The name of the user (userID) to connect to the host with.
`-password` | -pw | The password associated with the userID.
`-targetencoding` | -te | The character encoding (charset) used on the target platform. Default is '1047'.

**File Transfer Upload Parameters**
Parameter | Abbr.  | Description
------- | --------- | ---------
`-bininp` | -bin | The binary input data file produced by the builder.
`-binref` | -brf | The binary reference file produced by the builder.
`-dsnhlq` | -hlq | Optional high level qualifier to be used when allocating datasets.

**File Transfer Download Parameters**
Parameter | Abbr.  | Description
------- | --------- | ---------
`-binres` | -brs | The binary result file to be written to.
`-binresdsn` | -brsdsn | The BINRES dataset name on the target host to be downloaded.

### JCL Submit - parameters/options
The JCL submit component submits JCL to run the test(s) on the target host. The JCL can reside on the local files system (use parameter -j) or as a dataset on the target host (use parameter -jdsn) .
The following tables list the submit, and optional parameters that must be provided.
**JCL Submit Parameters**
Parameter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Abbr.&nbsp;&nbsp;&nbsp;&nbsp;  | Description
------- | --------- | ---------
`-host` | -h | The host name or IP address of the target host.
`-port` | -pt | The port the host is listening on.
`-user` | -u | The name of the user (userID) to connect to the host with.
`-password` | -pw | The password associated with the userID.
`-targetencoding` | -te | The character encoding (charset) used on the target platform. The default is �1047�.
`-bininpdsn` | -bindsn | The BININP dataset name on the target host, to use for the test run. This is only required if the JCL requires substitution.
`-binrefdsn` | -brfdsn | The BINREF dataset name on the target host, to use for the test run. This is only required if the JCL requires substitution.
`-binresdsn` | -brsdsn | The BINRES dataset name on the target host, to use for the test run. This is only required if the JCL requires substitution.
`-ccrepository` | -ccrepo | The name of the Code Coverage repository dataset. Must be specified to enable Code Coverage.
`-ccsystem` | -ccsys | Code Coverage system. If not specified with '-ccrepo', defaults to the test suite or test scenario name.
`-cctestid` | -cctid | Code Coverage test id. If not specified with '-ccrepo', defaults to the test suite or test scenario name.
`-ccstepname` | -ccstep | Specifies the Topaz for Total Test step name. Should be used if the Topaz for Total Test step is contained in a cataloged procedure.
`-ccprogramtype` | -cctype | Specifies the main executable program (this is the program specified on the 'EXEC PGM=' JCL statement in runner*.JCL) for Code Coverage. Specify: `-cctype=DB2` when the main program is IKJEFT01 or IKJEFT1B for live Db2 `-cctype=TOTALTEST` when the main program is TTTRUNNR `-cctype=IMS` when the main program is DFSRRC00 for live IMS
`-ccclearstats` | -ccclear | Specifies whether the Code Coverage repository statistics should be cleared before running the test. Valid values are 'true' or 'false'. The default value is 'true'.

**JCL Submit Parameter from Local Host**
Parameter | Abbr.  | Description
------- | --------- | ---------
`-jcl` | -j | The file name containing the JCL to submit.

**JCL Submit Parameter from z/OS Dataset**
Parameter | Abbr.  | Description
------- | --------- | ---------
`-jcldsn` | -jdsn | The name of a dataset containing the JCL to submit.

::: tip
`-jcl` and `-jcldsn` cannot both be used in the same statement. Specify either -jcl or -jcldsn.
:::

**JCL Submit Optional Parameters**
Parameter | Abbr.  | Description
------- | --------- | ---------
`-wait` | -w | Indicates if component waits for test completion. Must be true or false. Defaults to true.
`-maxwait` | -mw | The number of minutes to wait for the test to complete, The default is 20 minutes.

### Binary Parser - parameters/options
The Binary Parser component parses the binary result file from an executed test and updates the archive file.
The following table lists the input parameters that must be provided.

**Binary Parser Input Parameters**
Parameter | Abbr.  | Description
------- | --------- | ---------
`-binres` | -brs | The binary result data file which was the output of the test execution on the target platform.
`-targetencoding` | -te | The character encoding (charset) used on the target platform. Default is '1047'.
`-archive` | -a | The archive (history) created by the Builder which will be updated.

There are no explicit output parameters. The Parser output data will be saved in the updated archive file.

### Result Checker - parameters/options
The Result Checker component parses the archive, applying the check conditions to the output data and updating the archive accordingly. In addition to that, the Result Checker will create a separate results file and report file. For details about the contents of these file, please refer to the section about Project Structure in the Topaz for Total Test online help.
The following tables list the input, output and optional parameters that must be provided.

**Result Checker Input Parameters**
Parameter | Abbr.  | Description
------- | --------- | ---------
`-archive` | -a | The archive from the Parser which will be updated (unless the output parameter is used, see below).

**Result Checker Optional Input Parameters**
Parameter | Abbr.  | Description
------- | --------- | ---------
`-targetencoding` | -te | The character encoding (charset) used on the target platform. Defaults to the encoding stored in the archive.

**Result Checker Output Parameters**
Parameter | Abbr.  | Description
------- | --------- | ---------
`-result` | -rs | The name of the XML result fle to be created. (Not required when project parameter is provided.)
`-noresult` |  | If specified with the -p option, no result file will be created.
`-report` | -rp | The name of the HTML result report to be created. (Not required when project parameter is provided.)
`-junit` | -ju | The full path name of the file to write the JUnit information to. It is a XML document describing the results, intended for JUnit displays.
`-sonar` | -so | The full path name of the file to write the Sonar information to. It is a XML document describing the results, intended for Sonar displays.
`-noreport` |  | If specified with the -p option, no report file will be created.
`-nojunit` |  | If specified with the -p option, no JUnit file will be created.
`-nosonar` |  | If specified with the -p option, no Sonar file will be created.
`-externaltoolsworkspace` | -etws | Specifies the workspace of an external tool. This argument requires the 'postruncommands' argument be specified.
`-postruncommands` | -prc | Specifies the commands to be run after test completion. Currently only 'CopyJUnit' and 'CopySonar' are supported. If both are specified, they should be separated by a comma. This command requires the 'externaltoolsworkspace' argument be specified. <br><br>'CopyJUnit' will copy the JUnit results to the directory TTTJUnit, in the location specified by the external tools workspace argument. <br><br>'CopySonar' will copy the Sonar results to the directory TTTSonar, in the location specified by the external tools workspace argument.

**Binary Parser Optional Output Parameters**
Parameter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Abbr.  | Description
------- | --------- | ---------
`-outputarchive` | -oar | A new archive to be created instead of updating the input archive. Default is to update the input archive.
`-project` | -p | Path to the project folder. If provided, the result and report parameters can be omitted, and their file names will be automatically derived. This parameter has no default.
`-fileencoding` | -fe | The character encoding to be used for output files. Defaults to UTF-8.
`-save` | -s | Save output or not. Set to TRUE to write output, or FALSE for no output. When set to FALSE, no files will be created and the archive will not be updated. Defaults to TRUE.