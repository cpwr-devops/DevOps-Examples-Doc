---
title: SonarHelper.groovy
footer: MIT Licensed | Copyright © 2018 - Compuware
---

## SonarHelper.groovy

```groovy
package com.compuware.devops.util

class SonarHelper implements Serializable {

    def script
    def steps
    def scannerHome
    def pConfig
```

## SonarHelper

```groovy
    SonarHelper(script, steps, pConfig) 
    {
        this.script     = script
        this.steps      = steps
        this.pConfig    = pConfig
    }
```

## initialize

```groovy
    def initialize()
    {
        this.scannerHome    = steps.tool "${pConfig.sqScannerName}";
    }
```

## scan

```groovy
    def scan()
    {
        def testResults = determineUtResultPath()

        runScan(testResults, script.JOB_NAME)
    }
```

## scan(pipelineType)

```groovy
    def scan(pipelineType)
    {
        def project
        def testPath
        def resultPath
        def coveragePath

        switch(pipelineType)
        {
            case "UT":
                project         = determineUtProjectName()
                testPath        = 'tests'
                resultPath      = determineUtResultPath()
                coveragePath    = "Coverage/CodeCoverage.xml"
                break;
            case "FT":
                project         = determineFtProjectName()
                testPath        = '"tests\\' + pConfig.ispwStream + '_' + pConfig.ispwApplication + '_Functional_Tests\\Functional Test"'
                resultPath      = 'TestResults\\SonarTestReport.xml'
                coveragePath    = ''
                break;
            default:
                steps.echo "SonarHelper.scan received wrong pipelineType: " + pipelineType
                steps.echo "Valid types are 'UT' or FT"
                break;
        }

        runScan(testPath, resultPath, coveragePath, project)
    }
```

## checkQualityGate

```groovy
    String checkQualityGate()
    {
        String result

        steps.timeout(time: 2, unit: 'MINUTES') 
        {                
            def sonarGate = steps.waitForQualityGate()

            result = sonarGate.status
        }

        return result
    }
```

## determineUtProjectName

```groovy
    private String determineUtProjectName()
    {
        return pConfig.ispwOwner + '_' + pConfig.ispwStream + '_' + pConfig.ispwApplication
    }
```

## determineFtProjectName

```groovy
    private String determineFtProjectName()
    {
        return pConfig.ispwStream + '_' + pConfig.ispwApplication
    }
```

## determineUtResultPath

```groovy
    private String determineUtResultPath()
    {
        def tttListOfResults    = steps.findFiles(glob: 'TTTSonar/*.xml')
        def testResults         = ""    
 
        tttListOfResults.each 
        {
            testResults         = testResults + "TTTSonar/" + it.name +  ',' 
        }

        return testResults
    }
```

## runScan

```groovy
    private runScan(testPath, testResultPath, coveragePath, projectName)
    {
        steps.withSonarQubeEnv("${pConfig.sqServerName}")
        {
            def sqScannerProperties   = ' -Dsonar.tests=' + testPath

            sqScannerProperties       = sqScannerProperties + " -Dsonar.testExecutionReportPaths=${testResultPath}"

            if(coveragePath != '')
            {
                sqScannerProperties       = sqScannerProperties + " -Dsonar.coverageReportPaths=${coveragePath}"
            }

            sqScannerProperties       = sqScannerProperties + " -Dsonar.projectKey=${projectName} -Dsonar.projectName=${projectName} -Dsonar.projectVersion=1.0"

            sqScannerProperties       = sqScannerProperties + " -Dsonar.sources=${pConfig.ispwApplication}\\${pConfig.mfSourceFolder}"

            sqScannerProperties       = sqScannerProperties + " -Dsonar.cobol.copy.directories=${pConfig.ispwApplication}\\${pConfig.mfSourceFolder}"  

            sqScannerProperties       = sqScannerProperties + " -Dsonar.cobol.file.suffixes=cbl,testsuite,testscenario,stub -Dsonar.cobol.copy.suffixes=cpy -Dsonar.sourceEncoding=UTF-8"
            
            steps.bat "${scannerHome}/bin/sonar-scanner" + sqScannerProperties
        }
    }
}
```