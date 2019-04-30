---
title: JclSkeleton.groovy
footer: MIT Licensed | Copyright © 2018 - Compuware
---

## JclSkeleton.groovy

```groovy
package com.compuware.devops.util

/**
 Static Class to contain different JCL Skeletons
*/
class JclSkeleton implements Serializable {

    def steps

    private String skeletonPath     = 'config\\skels'       // Path containing JCL "skeletons" after downloading them from Git Hub Repository
    private String jobCardSkel      = 'JobCard.jcl'         // Skeleton for job cards
    private String iebcopySkel      = 'iebcopy.skel'        // Skeleton for IEBCOPY job
    private String iebcopyInDdSkel  = 'iebcopyInDd.skel'    // Skeleton for input DDs for IEBCOPY job
    private String deleteDsSkel     = 'deleteDs.skel'       // Skeleton for deleting the PDS after downloading copy books

    private String workspace

    String jobCardJcl
    String iebcopyCopyBooksJclSkel
    String cleanUpDatasetJclSkel
    String ispwApplication
    String ispwPathNum
```

## JclSkeleton

```groovy
    JclSkeleton(steps, String workspace, String ispwApplication, String ispwPathNum) 
    {
        this.steps              = steps
        this.workspace          = workspace
        this.ispwApplication    = ispwApplication
        this.ispwPathNum        = ispwPathNum
    }
```

## initialize

```groovy
    /* A Groovy idiosyncrasy prevents constructors to use methods, therefore class might require an additional "initialize" method to initialize the class */
    def initialize()
    {
        this.jobCardJcl                 = readSkelFile(jobCardSkel).join("\n")

        this.cleanUpDatasetJclSkel      = readSkelFile(deleteDsSkel).join("\n")

        this.iebcopyCopyBooksJclSkel    = buildIebcopySkel()
    }
```

## buildIebcopySkel

```groovy
    def String buildIebcopySkel()
    {

        def jclSkel                 = readSkelFile(iebcopySkel).join("\n")
        def tempInputDdStatements   = readSkelFile(iebcopyInDdSkel)
        def copyDdStatements        = []

        for(int i=0; i < tempInputDdStatements.size(); i++)
        {
            copyDdStatements.add ("       INDD=IN${i+1}")
        }

        def inputDdJcl      = tempInputDdStatements.join("\n")
        def inputCopyJcl    = copyDdStatements.join("\n")

        jclSkel             = jclSkel.replace("<source_copy_pds_list>", inputDdJcl)
        jclSkel             = jclSkel.replace("<source_input_dd_list>", inputCopyJcl)
        jclSkel             = jclSkel.replace("<ispw_application>", ispwApplication)
        jclSkel             = jclSkel.replace("<ispw_path>", ispwPathNum)

        return jclSkel

    }
```

## createIebcopyCopyBooksJcl

```groovy
    def String createIebcopyCopyBooksJcl(String targetDsn, List copyMembers)
    {

        def iebcopyCopyBooksJcl = this.jobCardJcl
        def selectStatements    = []

        copyMembers.each {
            selectStatements.add("  SELECT MEMBER=${it}")
        }

        def selectJcl       = selectStatements.join("\n")  

        iebcopyCopyBooksJcl = iebcopyCopyBooksJcl + "\n" + iebcopyCopyBooksJclSkel
        iebcopyCopyBooksJcl = iebcopyCopyBooksJcl.replace("<target_dsn>", targetDsn)
        iebcopyCopyBooksJcl = iebcopyCopyBooksJcl.replace("<select_list>",selectJcl)

        return iebcopyCopyBooksJcl

    }
```

## createDeleteTempDsn

```groovy
    def String createDeleteTempDsn(String targetDsn)
    {
        def deleteJcl   = jobCardJcl

        deleteJcl       = deleteJcl + "\n" + cleanUpDatasetJclSkel
        deleteJcl       = deleteJcl.replace("<clean_dsn>", targetDsn)

        return deleteJcl
    }
```

## readSkelFile

```groovy
    def readSkelFile(String fileName)
    {
        def jclStatements       = []
        FileHelper fileHelper   = new FileHelper()

        def skelFilePath    = "${workspace}\\${skeletonPath}\\${fileName}"

        def lines           = fileHelper.readLines(skelFilePath)

        lines.each
        {
            jclStatements.add(it.toString())
        }

        return jclStatements
    }
}
```