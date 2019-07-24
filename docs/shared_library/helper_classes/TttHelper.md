---
title: TttHelper.groovy
footer: MIT Licensed | Copyright © 2018 - Compuware
---

## SonarHelper.groovy

```groovy
package com.compuware.devops.util

class TttHelper implements Serializable {

    def script
    def steps
    def pConfig

    JclSkeleton jclSkeleton 

    def listOfScenarios
    def listOfSources
    def listOfPrograms 
```

## TttHelper

```groovy
    TttHelper(script, steps, pConfig) 
    {
        this.script     = script
        this.steps      = steps
        this.pConfig    = pConfig

        jclSkeleton     = new JclSkeleton(steps, script.workspace, pConfig.ispwApplication, pConfig.applicationPathNum)
    }
```

## initialize

```groovy
    def initialize()
    {
        jclSkeleton.initialize()

        this.listOfScenarios  = steps.findFiles(glob: '**/*.testscenario')

        steps.echo "Found Scenarios " + listOfScenarios.toString()

        this.listOfSources       = steps.findFiles(glob: "**/${pConfig.ispwApplication}/${pConfig.mfSourceFolder}/*.cbl")

        steps.echo "Found Sources " + listOfSources.toString()

        this.listOfPrograms      = []

        listOfSources.each
        {
            listOfPrograms.add(it.name.trim().split("\\.")[0])
        }
    }
```

## loopThruScenarios

```groovy
    def loopThruScenarios()
    {
        listOfScenarios.each
        {
            def scenarioPath        = it.path
            def projectName         = it.path.trim().split("\\\\")[0] + "\\"+ it.path.trim().split("\\\\")[1]
            def jclFolder           = script.workspace + "\\" + projectName + '\\Unit Test\\JCL'   
            def scenarioFullName    = it.name  
            def scenarioName        = it.name.trim().split("\\.")[0]
            def scenarioTarget      = scenarioName.split("\\_")[0]
    
            if(listOfPrograms.contains(scenarioTarget))
            {
                steps.echo "*************************\n" +
                    "Scenario " + scenarioFullName + '\n' +
                    "Path " + scenarioPath + '\n' +
                    "Project " + projectName + '\n' +
                    "*************************"
            
                def jclJobCardPath = jclFolder + '\\JobCard.jcl' 

                steps.writeFile(file: jclJobCardPath, text: jclSkeleton.jobCardJcl)

                steps.step([
                    $class:       'TotalTestBuilder', 
                        ccClearStats:   false,                   
                        ccRepo:         "${pConfig.ccRepository}",
                        ccSystem:       "${pConfig.ispwApplication}", 
                        ccTestId:       "${script.BUILD_NUMBER}",
                        credentialsId:  "${pConfig.hciTokenId}", 
                        deleteTemp:     true,                    
                        hlq:            '',                      
                        connectionId:   "${pConfig.hciConnId}",    
                        jcl:            "${pConfig.tttJcl}",     
                        projectFolder:  "${projectName}",        
                        testSuite:      "${scenarioFullName}",   
                        useStubs:       true                     
                ])                   
            }
        }
    }
```

## executeFunctionalTests

```groovy
    def executeFunctionalTests()
    {
        totaltest credentialsId: "${pConfig.hciTokenId}", 
            environmentId: "${pConfig.xaTesterEnvId}", 
            folderPath: '', 
            serverUrl: "${ispwUrl}", 
            stopIfTestFailsOrThresholdReached: false,
            sonarVersion: '6'
    }
```

## passResultsToJunit

```groovy
    def passResultsToJunit()
    {
        steps.junit allowEmptyResults:    true, 
            keepLongStdio:                true, 
            testResults:                  "TTTUnit/*.xml"
    }
```

## collectCodeCoverageResults

```groovy
    def collectCodeCoverageResults()
    {
        def sources="${pConfig.ispwApplication}\\${pConfig.mfSourceFolder}"

        def ccproperties = 'cc.sources=' + sources + '\rcc.repos=' + pConfig.ccRepository + '\rcc.system=' + pConfig.ispwApplication  + '\rcc.test=' + script.BUILD_NUMBER

        steps.step([
            $class:                   'CodeCoverageBuilder',
                analysisProperties:         ccproperties,           
                analysisPropertiesPath:     '',                     
                connectionId:               "${pConfig.hciConnId}", 
                credentialsId:              "${pConfig.hciTokenId}"
        ])
    }
}
```