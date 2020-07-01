---
title: Pipeline Steps
footer: MIT Licensed | Copyright © 2018 - Compuware
---
## Shared Library Pipeline Steps

Being a pipeline from a [shared library](https://jenkins.io/doc/book/pipeline/shared-libraries/) this pipeline must extend a `call` method. This pipeline expects a [`Map`](http://groovy-lang.org/syntax.html#_maps) object, containing the parameters to be passed to the pipeline from the job configuration and trigger.

Once this pipeline has been triggered, the job will execute the following steps.

Execute its `call` method, within which it will

```groovy
def call(Map pipelineParams)
{
    node
    {
```

1. Execute its `initialize` method to read configuration files and instantiate objects of [helper classes](./helper_classes/PipelineConfig.md)
    - Reading the [mail list configuration file](../tool_configuration/Jenkins_config.md#the-email-list) and build in internal map of ISPW owner IDs and corresponding email addresses
    - `PipelineConfig` containing global parameter values that:
        - passed by the job configuration/trigger and are pipeline/execution specific
        - not pipeline or execution specific, like server URLs. These parameters will be read from external configuration files
    - `GitHelper` serving as a wrapper for a set of interactions with Git/GitHub
    - `IspwHelper` serving as a wrapper for use by the ISPW plugins' methods
    - `TttHelper` serving as a wrapper for use by the TTT plugin's and Code Coverage plugin's methods
    - `SonarHelper` serving as a wrapper for use by the Sonar plugins' methods
    - `XlrHelper` serving as a wrapper for use by the XL Release plugin

```groovy
        initialize(pipelineParams)
```

3. Use the `downloadSources` method of class `IspwHelper` to download all COBOL sources and COBOL copybooks from ISPW (the mainframe) that are part of the set triggering this specific pipeline execution

```groovy
        stage("Retrieve Mainframe Code")
        {
            ispwHelper.downloadSources()
        }
```

4. Use the `checkout` method of the `gitHelper`class to clone the Git repository for the ISPW application.  

```groovy
        stage("Execute Unit Tests")
        {
            def gitUrlFullPath = "${pConfig.gitUrl}/${pConfig.gitTttRepo}"

            gitHelper.checkout(gitUrlFullPath, pConfig.gitBranch, pConfig.gitCredentials, pConfig.tttFolder)
```

5. Initialize the `TttHelper` instance, clean up statistics in the Code Coverage repository from the previous build (job execution), loop through the downloaded Topaz for Total Test scenarios, and pass the results to JUnit (within Jenkins) using the methods `initialize`, `cleanUpCodeCoverageResults`, `loopThruScenarios`, and `passResultsToJunit` of the `TttHelper` class, respectively.

```groovy
            tttHelper.initialize()

            tttHelper.cleanUpCodeCoverageResults()

            tttHelper.loopThruScenarios()

            tttHelper.passResultsToJunit()
        }
```

6. Use the `collectCodeCoverageResults` method of the `TttHelper` class to download the code coverage metrics from the Xpediter Code Coverage repository

```groovy
        stage("Collect Metrics")
        {
            tttHelper.collectCodeCoverageResults()
        }
```

7. Not always will all required COBOL copybooks be part of an ISPW assignment or set. In order to retrieve any missing copybooks, the next stage will first use the `downloadCopyBooks` method of class `ispwHelper` to determine all required copybooks and download them from the mainframe

```groovy
        stage("Check SonarQube Quality Gate")
        {
            ispwHelper.downloadCopyBooks("${workspace}")
```

8. The it will use the `scan` method of the `SonarHelper` class to pass downloaded COBOL sources, the results of the unit tests, and code coverage metrics to SonarQube

```groovy
            sonarHelper.scan()
```

9. And use the `sonarHelper.checkQualityGate` of the `sonarHelper.checkQualityGate` class to query the resulting Sonar quality gate. If the quality gate fails, an email will be sent to the owner of the ISPW set - notifying them about the failure of the promote and the pipeline job will be aborted.

```groovy
            String sonarGateResult = sonarHelper.checkQualityGate()

            if (sonarGateResult != 'OK')
            {
                echo "Sonar quality gate failure: ${sonarGate.status}"
                echo "Pipeline will be aborted and ISPW Assignment will be regressed"

                mailMessageExtension    = "Generated code failed the Quality gate. Review Logs and apply corrections as indicated."
                currentBuild.result     = "FAILURE"

                emailext subject:       '$DEFAULT_SUBJECT',
                            body:       '$DEFAULT_CONTENT',
                            replyTo:    '$DEFAULT_REPLYTO',
                            to:         "${pConfig.mailRecipient}"
                
                error "Exiting Pipeline" 
            }
```

10. Otherwise a mail message will be prepared, informing the owner of the success.

```groovy
            else
            {
                mailMessageExtension = "Generated code passed the Quality gate. XL Release will be started."
            }
        }
```

11. If the quality gate passes an XL Release template will be triggered - using `trggerRelease` method of the `XlrHelper` class. 

```groovy
        stage("Start release in XL Release")
        {
            xlrHelper.triggerRelease()            
        }
```

12. An email will be sent to the owner of the ISPW set - notifying them about the success of the promote
```groovy
        stage("Send Mail")
        {
            // Send Standard Email
            emailext subject:       '$DEFAULT_SUBJECT',
                        body:       '$DEFAULT_CONTENT \n' + mailMessageExtension,
                        replyTo:    '$DEFAULT_REPLYTO',
                        to:         "${pConfig.mailRecipient}"

        } 
    }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEyNjIyNjc0MzgsLTY2OTc0NzQwMV19
-->