---
title: PipelineConfig.groovy
footer: MIT Licensed | Copyright © 2018 - Compuware
---

## PipelineConfig.groovy

```groovy
package com.compuware.devops.util

class PipelineConfig implements Serializable
{
    def steps
    def mailListLines
    def mailListMap = [:]

    private String configPath           = 'pipeline'            
    private String pipelineConfigFile   = 'pipeline.config'     
    private String tttGitConfigFile     = 'tttgit.config'       
    private String workspace

    public String gitTargetBranch
    public String gitBranch      
    public String sqScannerName
    public String sqServerName 
    public String sqServerUrl  
    public String xaTesterUrl  
    public String xaTesterEnvId
    public String mfSourceFolder
    public String xlrTemplate   
    public String xlrUser       
    public String tttFolder     
    public String ispwUrl       
    public String ispwRuntime   
    public String ispwStream
    public String ispwApplication
    public String ispwRelease
    public String ispwAssignment
    public String ispwContainer
    public String ispwContainerType
    public String ispwSrcLevel
    public String ispwTargetLevel
    public String ispwOwner         
    public String applicationPathNum

    public String gitProject        
    public String gitCredentials    
    public String gitUrl            
    public String gitTttRepo        
    public String gitTttUtRepo        
    public String gitTttFtRepo        

    public String cesTokenId        
    public String hciConnId         
    public String hciTokenId        
    public String ccRepository      

    public String tttJcl 
      
    public String mailRecipient 
```

## PipelineConfig

```groovy
    def PipelineConfig(steps, workspace, params, mailListLines)
    {
        this.steps              = steps
        this.workspace          = workspace
        this.mailListLines      = mailListLines

        this.xaTesterEnvId      = "5b5f2a71787be73b59238d7b"

        this.ispwStream         = params.ISPW_Stream
        this.ispwApplication    = params.ISPW_Application
        this.ispwRelease        = params.ISPW_Release
        this.ispwAssignment     = params.ISPW_Assignment
        this.ispwContainer      = params.ISPW_Container
        this.ispwContainerType  = params.ISPW_Container_Type
        this.ispwOwner          = params.ISPW_Owner        
        this.ispwSrcLevel       = params.ISPW_Src_Level

        this.applicationPathNum = ispwSrcLevel.charAt(ispwSrcLevel.length() - 1)
        this.ispwTargetLevel    = "QA" + applicationPathNum
        this.tttJcl             = "Runner_PATH" + applicationPathNum + ".jcl"

        this.gitProject         = params.Git_Project
        this.gitCredentials     = params.Git_Credentials
        
        this.gitUrl             = "https://github.com/${gitProject}"
        this.gitTttRepo         = "${ispwStream}_${ispwApplication}_Unit_Tests.git"
        this.gitTttUtRepo       = "${ispwStream}_${ispwApplication}_Unit_Tests.git"
        this.gitTttFtRepo       = "${ispwStream}_${ispwApplication}_Functional_Tests.git"

        this.cesTokenId         = params.CES_Token       
        this.hciConnId          = params.HCI_Conn_ID
        this.hciTokenId         = params.HCI_Token
        this.ccRepository       = params.CC_repository
    }
```

## initialize

```groovy
    def initialize()
    {
        steps.dir(".\\") 
        {
            steps.deleteDir()
        }

        setServerConfig()

        setTttGitConfig()

        setMailConfig()    
    }
```

## setServerConfig

```groovy
    def setServerConfig()
    {
        def lineToken
        def parmName
        def parmValue

        def lines = readConfigFile("${pipelineConfigFile}")

        lines.each
        {
            lineToken   = it.toString().tokenize("=")
            parmName    = lineToken.get(0).toString()
            parmValue   = lineToken.get(1).toString().trim()

            switch(parmName)
            {
                case "SQ_SCANNER_NAME":
                    sqScannerName   = parmValue
                    break;
                case "SQ_SERVER_NAME": 
                    sqServerName    = parmValue
                    break;
                case "SQ_SERVER_URL":
                    sqServerUrl     = parmValue
                    break;
                case "XA_TESTER_SERVER_URL":
                    xaTesterUrl     = parmValue
                    break;
                case "MF_SOURCE_FOLDER":
                    mfSourceFolder  = parmValue
                    break;
                case "XLR_TEMPLATE":
                    xlrTemplate     = parmValue
                    break;
                case "XLR_USER":
                    xlrUser         = parmValue
                    break;
                case "TTT_FOLDER":
                    tttFolder       = parmValue
                    break;
                case "ISPW_URL":
                    ispwUrl         = parmValue
                    break;
                case "ISPW_RUNTIME":
                    ispwRuntime     = parmValue
                    break;
                default:
                    steps.echo "Found unknown Pipeline Parameter " + parmName + " " + parmValue + "\nWill ignore and continue."
                    break;
            }
        }
    }
```

## setTttGitConfig

```groovy
    def setTttGitConfig()
    {
        def lineToken
        def parmName
        def parmValue

        def lines = readConfigFile("${tttGitConfigFile}")

        lines.each
        {
            lineToken   = it.toString().tokenize("=")
            parmName    = lineToken.get(0).toString()
            parmValue   = lineToken.get(1).toString().trim()

            switch(parmName)
            {
                case "TTT_GIT_TARGET_BRANCH":
                    gitTargetBranch   = parmValue
                    break;
                case "TTT_GIT_BRANCH": 
                    gitBranch    = parmValue
                    break;
                default:
                    steps.echo "Found unknown TTT Parameter " + parmName + " " + parmValue + "\nWill ignore and continue."
                    break;
            }
        }
    }
```

## setMailConfig

```groovy
    def setMailConfig()
    {        
        def lineToken
        def tsoUser
        def emailAddress

        mailListLines.each
        {
            lineToken       = it.toString().tokenize(":")
            tsoUser         = lineToken.get(0).toString()
            emailAddress    = lineToken.get(1).toString().trim()

            this.mailListMap."${tsoUser}" = "${emailAddress}"
        }

        this.mailRecipient  = mailListMap[(ispwOwner.toUpperCase())]
    }
```

## readConfigFile

```groovy
    def readConfigFile(String fileName)
    {        
        def filePath    = "${configPath}/${fileName}"
        def fileText    = steps.libraryResource filePath

        return fileText.tokenize("\n")
    }
}
```