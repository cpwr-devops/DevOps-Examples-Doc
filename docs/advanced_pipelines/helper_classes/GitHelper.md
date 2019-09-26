---
title: GitHelper.groovy
footer: MIT Licensed | Copyright © 2018 - Compuware
---

## GitHelper.groovy
```groovy
package com.compuware.devops.util

class GitHelper implements Serializable {

    def steps
```

## GitHelper

```groovy
    GitHelper(steps)
    {
        this.steps = steps
    }
```

## checkout

```groovy
    def checkout(String gitUrl, String gitBranch, String gitCredentials, String tttFolder)
    {
        steps.checkout(
            changelog:  false,
            poll:       false,
            scm:        [
                        $class:                                 'GitSCM',
                            branches:                           [[name: "*/${gitBranch}"]],
                            doGenerateSubmoduleConfigurations:  false,
                            extensions:                         [[$class: 'RelativeTargetDirectory', relativeTargetDir: "${tttFolder}"]],
                            submoduleCfg:                       [],
                            userRemoteConfigs:                  [[credentialsId: "${gitCredentials}", name: 'origin', url: "${gitUrl}"]]
                        ]
        )
    }
```

## checkoutPath

```groovy
    def checkoutPath(String gitUrl, String gitBranch, String path, String gitCredentials, String gitProject)
    {
        steps.checkout(
        changelog: false,
        poll: false,
        scm: [
                $class: 'GitSCM',
                branches: [[name: "*/${gitBranch}"]],
                doGenerateSubmoduleConfigurations: false,
                extensions: [[
                    $class: 'SparseCheckoutPaths',
                    sparseCheckoutPaths: [[path: "${path}/*"]]
                ]],
                submoduleCfg: [],
                userRemoteConfigs: [[
                    credentialsId: "${gitCredentials}",
                    url: "${gitUrl}/${gitProject}.git"
                ]]
            ]
        )
    }
}
```