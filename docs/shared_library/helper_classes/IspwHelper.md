---
title: IspwHelper.groovy
footer: MIT Licensed | Copyright © 2018 - Compuware
---

## IspwHelper.groovy

```groovy
package com.compuware.devops.util

import groovy.json.JsonSlurper
import jenkins.plugins.http_request.*
import com.compuware.devops.util.TaskInfo

class IspwHelper implements Serializable 
{
    def steps

    def String ispwUrl
    def String ispwRuntime
    def String ispwStream
    def String ispwApplication
    def String ispwRelease
    def String ispwContainer
    def String ispwContainerType    
    def String applicationPathNum
    def String ispwOwner
    def String ispwTargetLevel

    def String mfSourceFolder

    def String hciConnId
    def String hciTokenId
```

## IspwHelper

```groovy
    IspwHelper(steps, pConfig) 
    {

        this.steps              = steps
        this.ispwUrl            = pConfig.ispwUrl
        this.ispwRuntime        = pConfig.ispwRuntime
        this.ispwStream         = pConfig.ispwStream
        this.ispwApplication    = pConfig.ispwApplication
        this.ispwRelease        = pConfig.ispwRelease        
        this.ispwContainer      = pConfig.ispwContainer
        this.ispwContainerType  = pConfig.ispwContainerType
        this.ispwOwner          = pConfig.ispwOwner
        this.ispwTargetLevel    = pConfig.ispwTargetLevel
        this.applicationPathNum = pConfig.applicationPathNum

        this.mfSourceFolder     = pConfig.mfSourceFolder

        this.hciConnId          = pConfig.hciConnId
        this.hciTokenId         = pConfig.hciTokenId
    }
```

## downloadAllSources

```groovy
    def downloadAllSources(String ispwLevel)
    {

        steps.checkout( 
            changelog: false, 
            poll: false, 
            scm: [
                $class: 'IspwConfiguration', 
                    componentType: 'COB, COPY', 
                    connectionId: "${hciConnId}", 
                    credentialsId: "${hciTokenId}",      
                    folderName: '', 
                    ispwDownloadAll: true, 
                    levelOption: '0', 
                    serverApplication: "${ispwApplication}",
                    serverConfig: "${ispwRuntime}", 
                    serverLevel: "${ispwLevel}", 
                    serverStream: "${ispwStream}"
                ]
        )

    }
```

## downloadSources

```groovy
    def downloadSources(String ispwLevel)
    {
        steps.checkout([
            $class:             'IspwContainerConfiguration', 
            componentType:      '',                                 
            connectionId:       "${hciConnId}",     
            credentialsId:      "${hciTokenId}",      
            containerName:      "${ispwContainer}",   
            containerType:      "${ispwContainerType}",     
            ispwDownloadAll:    true,                       
            serverConfig:       '',                         
            serverLevel:        "${ispwLevel}"              
        ])
    }

```

## downloadCopyBooks

```groovy
    def downloadCopyBooks(String workspace)
    {
        JclSkeleton jclSkeleton = new JclSkeleton(steps, workspace, ispwApplication, applicationPathNum)

        jclSkeleton.initialize()

        def copyBookList = referencedCopyBooks(workspace)  

        if(copyBookList.size() > 0)       
        {
            def pdsDatasetName  = ispwOwner + '.DEVOPS.ISPW.COPY.PDS'   
            def processJcl      = jclSkeleton.createIebcopyCopyBooksJcl(pdsDatasetName, copyBookList)

            steps.topazSubmitFreeFormJcl( 
                connectionId:       "${hciConnId}", 
                credentialsId:      "${hciTokenId}", 
                jcl:                processJcl, 
                maxConditionCode:   '4'
            )
                        
            steps.checkout([
                $class:         'PdsConfiguration', 
                connectionId:   "${hciConnId}",
                credentialsId:  "${hciTokenId}",
                fileExtension:  'cpy',
                filterPattern:  "${pdsDatasetName}",
                targetFolder:   "${ispwApplication}/${mfSourceFolder}"
            ])
                                                                        
            processJcl = jclSkeleton.createDeleteTempDsn(pdsDatasetName)

            steps.topazSubmitFreeFormJcl(
                connectionId:       "${hciConnId}",
                credentialsId:      "${hciTokenId}",
                jcl:                processJcl,
                maxConditionCode:   '4'
            )
        }
        else
        {
            steps.echo "No Copy Books to download"
        }
    }

```

## referencedCopyBooks

```groovy
    def List referencedCopyBooks(String workspace) 
    {

        steps.echo "Get all .cbl in current workspace"
        
        def listOfSources   = steps.findFiles(glob: "**/${ispwApplication}/${mfSourceFolder}/*.cbl")
        def listOfCopybooks = []
        def lines           = []
        def cbook           = /\bCOPY\b/
        def tokenItem       = ''
        def seventhChar     = ''
        def lineToken       = ''

        listOfSources.each 
        {
            steps.echo "Scanning Program: ${it}"
            def cpyFile = "${workspace}\\${it}"

            File file = new File(cpyFile)

            if (file.exists()) 
            {
                lines = file.readLines().findAll({book -> book =~ /$cbook/})

                lines.each 
                {
                    lineToken   = it.toString().tokenize()
                    seventhChar = ""

                    if (lineToken.get(0).toString().length() >= 7) 
                    {
                        seventhChar = lineToken.get(0).toString()[6]
                    }
                        
                    for(int i=0;i<lineToken.size();i++) 
                    {
                        tokenItem = lineToken.get(i).toString()

                        if (tokenItem == "COPY" && seventhChar != "*" ) 
                        {
                            steps.echo "Copybook: ${lineToken.get(i+1)}"
                            tokenItem = lineToken.get(i+1).toString()
        
                            if (tokenItem.endsWith(".")) 
                            {
                                listOfCopybooks.add(tokenItem.substring(0,tokenItem.size()-1))
                            }
                            else 
                            {
                                listOfCopybooks.add(tokenItem)
                            }
                                
                        i = lineToken.size()
                        }
                    }    
                }
            }
        }

        return listOfCopybooks

    }      
```

## regressAssignmentList

```groovy
    def regressAssignmentList(assignmentList, cesToken)
    {
        for(int i = 0; i < assignmentList.size(); i++)
        {

            steps.echo "Regress Assignment ${assignmentList[0].toString()}, Level ${ispwTargetLevel}"

            regressAssignment(assignmentList[i], cesToken)

        }
            
    }
```

## regressAssignment

```groovy
    def regressAssignment(assignment, cesToken)
    {
        def requestBodyParm = '''{
            "runtimeConfiguration": "''' + ispwRuntime + '''"
        }'''

        steps.httpRequest(
                url:                    "${ispwUrl}/ispw/${ispwRuntime}/assignments/${assignment}/tasks/regress?level=${ispwTargetLevel}",
                httpMode:               'POST',
                consoleLogResponseBody: true,
                contentType:            'APPLICATION_JSON',
                requestBody:            requestBodyParm,
                customHeaders:          [[
                                        maskValue:  true, 
                                        name:       'authorization', 
                                        value:      "${cesToken}"
                                        ]]
            )
    }
}
```