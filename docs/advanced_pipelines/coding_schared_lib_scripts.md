---
title: Coding Shared Library scripts
footer: MIT Licensed | Copyright © 2018 - Compuware
---
# Coding Shared Library scripts

If you want to create a script that can be used from a Shared Library you need to consider the following.

## Folder Structure and Location

The "repository" containing the Shared Library needs to use a [certain folder structure](../pipelines/#the-code-repository-folder-structure). Scripts to be used as Shared Library scripts need to reside in the `vars` [folder of the Shared Library].

## Implementing a `call` method

In addition, such scripts need to implement a `call` method. If the scripts needs to use parameters, they get coded on the definition of the `call` method and passed into the script via the call. Most exmaples we share here all expect a [`Map`](http://groovy-lang.org/syntax.html#_maps) object, containing the parameters to be passed to the pipeline from the job configuration and trigger. The corresponding `call` methods are defined like 

```groovy
def call(Map pipelineParams){
...
}
```

Within the `call` method the script will execute the stages and steps in much the same way as any other pipeline script. Therefore, the resulting general structure will look like
```groovy
def call(pipelineParams){
    node(){
        stage('Stage1'){
            ...
        }
        ...
    }
}
```

## Calling a Shared Library script

To call a Shared Library script, i.e. to execute its call method, you 
- use `@Library` annotation to tell Jenkins to use a certain Shared Library
- follow the library name with the version (branch) to use
- specify a list of methods to import (or use '_' to import all methods)
- code the name of the script file

```groovy
@Library('<library_name>@<branch>') _
...
<script_file_name>
```

So, for the examples here in most case that would be

```groovy
@Library('Shared_Lib@master') _

<script_file_name> (
    ispwStream:        ISPW_Stream,
    ispwApplication:   ISPW_Application,
    ispwRelease:       ISPW_Release,
    ispwAssignment:    ISPW_Assignment,
    ispwSet:           ISPW_Set_Id,
    ispwSrcLevel:      ISPW_Src_Level,
    ispwOwner:         ISPW_Owner,
    cesToken:          'xxxx',            
    jenkinsCesToken:   'xxxx',
    hciConnectionId:   'xxxx',
    hciToken:          'xxxx',
    ccRepository:      'xxxx',
    gitProject:        'cpwr-devops',
    gitCredentials:    'xxxx'
)
```

## Retrieving parameter values

Since most examples here use a Groovy `Map` for the parameters on the `call` method, accessing the individual parameters will be done by coding the name of the `Map` followed by a `.` followed by the parameter name, e.g. 

```groovy
pipelineParams.ispwStream
```

## Global variables and assigning values

In slight contrast to other scripts, it is not possible to define global variables outside the call method and assign values at the same time. As a result, using the following code will not result in the value `value` being assigned to the variable `globalVariable`, instead it will be `null`.

```groovy
def gloablVariable = 'value'

def call(){
    echo globalVariable
}
```

Therefore, it is necessary to assign values to global variables within the `call` method:

```groovy
def gloablVariable

def call(){
    globalVariable = 'value'
    ...
    echo globalVariable
}
```
