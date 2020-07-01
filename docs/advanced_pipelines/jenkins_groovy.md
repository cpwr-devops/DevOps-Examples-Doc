---
title: Groovy Tips
footer: MIT Licensed | Copyright © 2018 - Compuware
---
# Things to consider when using Jenkins Groovy

Having learned Groovy and pipeline scripting at the same time from the ground up - without having any decent background in any of the underlying "*modern*" principles or languages - has been an interesting experience. This section is dedicated to listing and pointing out those pitfalls and learning experiences that we went through, to help people avoid the same struggles and speed up their productivity. At the same time it is a reference to help you understand why some things were done in a certain way in the showcased examples.

Any hints and suggestions to improve or circumnavigate the pitfalls in smarter ways are highly appreciated.

## Using steps in classes

Using pipeline steps, i.e. almost every execution of a plugin, within classes that are not the main script, require the script `steps` to be passed to the class and execute the corresponding methods of the `steps` class. Failure to do so will result in a
```
groovy.lang.MissingPropertyException
```

for the respective method. This starts with a simple `prinln`. Almost all classes in use in our examples perform one or the other `steps` method. Therefore, a common scheme is to declare the class and its constructor as follows:

```groovy
class IspwHelper implements Serializable
{
    def steps
...
    IspwHelper(steps ...) 
    {

        this.steps              = steps
...
    }
```

Instantiation of these classes will happen like this

```groovy
    ispwHelper  = new   IspwHelper(steps ...)
```

or

```groovy
    ispwHelper  = new   IspwHelper(this.steps ...)
```

For more and detailed information refer to the [Jenkins documentation](https://jenkins.io/doc/book/pipeline/shared-libraries/)

## Non serializable classes

As seen above and as discussed in the [Jenkins documentation](https://jenkins.io/doc/book/pipeline/shared-libraries/) classes must implement the `Serializable` interface. This is necessary so that pipeline jobs remain 'restartable', i.e. when the Jenkins node fails during execution of a job, the job is able to resume work from the place were it got interrupted. For this to be possible, Jenkins needs to be able to store the state of all instantiated objects.

This bears some implications when it comes to the use of third party classes that are not serializable. Trying to re-use objects of such classes will likely result in a
```
java.io.NotSerializableException
```

Example are the `JsonSlurper` class or the `responseBody` class. The latter is being returned by a native `httpRequest`, the former is used to digest the JSON `responseBody` from an `httpRequest`. The simplest way we have found, to use these classes without running into `java.io.NotSerializableException , is to de-reference the objects in the code as soon as possible. That way there is no need to store their state across method boundaries, like this:

```groovy
    def ArrayList getAssigmentList(String cesToken, String level)
    {
        def returnList  = []

        def taskIds     = getSetTaskIdList(cesToken, level)

        def response = steps.httpRequest(
            url:                        "${ispwUrl}/ispw/${ispwRuntime}/releases/${ispwRelease}/tasks",
            consoleLogResponseBody:     false, 
            customHeaders:              [[
                                        maskValue:  true,
                                        name:       'authorization',
                                        value:      "${cesToken}"
                                        ]]
            )

        def jsonSlurper = new JsonSlurper()
        def resp        = jsonSlurper.parseText(response.getContent())
        response        = null
        jsonSlurper     = null
        ...
```

In the example `response` receives the result of the `httpRequest`, `jsonSlurper` get instantiated and `resp` receives the content of `response` as a list. Once the two objects are not needed they get de-referenced by
```groovy
        response        = null
        jsonSlurper     = null
```

## Using methods in class constructors

Simply put, class constructors in Groovy cannot use methods, be it own internal methods, or instantiating other classes and using their methods. Anything other than 'simple' variable initialization will result in the following:
```
hudson.remoting.ProxyException: com.cloudbees.groovy.cps.impl.CpsCallableInvocation
```

Therefore, many of the classes in use here, have an `initialize` method that performs any additional work necessary after the constructor executed before any of the other methods can be used.

## Plugins setting variables

There are certain plugins that within their execution set variables that are exposed to the rest of the script. Two of these plugins being used throughout the examples are [Config File Provider `configFileProvider`](https://wiki.jenkins.io/display/JENKINS/Config+File+Provider+Plugin) and [Credentials Binding `withCredentials`](https://wiki.jenkins.io/display/JENKINS/Credentials+Binding+Plugin).

The first one allows accessing a file that has been defined using the Config File Provider plugin like the [`mailList.config` file](../advanced_pipelines/config_files). You pass the `fileID` and retrieve a variable that contains the (temporary) path to the file. The following snippet variable `mailListFilePath` will contain that path.

```groovy
    configFileProvider(
        [
            configFile(
                fileId: 'MailList',
                variable: 'mailListFilePath'
            )
        ]
    )
    {
        File mailConfigFile = new File(mailListFilePath)

        if(!mailConfigFile.exists())
        {
            steps.error "File - ${mailListFilePath} - not found! \n Aborting Pipeline"
        }

        mailListlines = mailConfigFile.readLines()
    }
```

The second one allows retrieving the information stored in a Jenkins credentials token in those cases when certain plugins require the content in clear text. This is the case for example when using native `httpRequest` to interact with REST APIs. Some of the example code makes use of the `httpRequest` and the ISPW API requires the CES credentials to be passed. Other than the ISPW operations plugin the `httpRequest` cannot use the Jenkins secret text token that stores the CES token. Using the `withCredentials`, one can use the Jenkins in `credentialsID` token to retrieve the 'clear text' CES token during runtime (stored in variable `cesToken` in the example below), without having to expose the token in the code:

```groovy
    withCredentials(
        [string(credentialsId: "${CES_Token}", variable: 'cesToken')]
    ) 
    {
        response1 = steps.httpRequest(
            url:                    "${ISPW_URL}/ispw/${ISPW_Runtime}/sets/${ISPW_Container}/tasks",
            httpMode:               'GET',
            consoleLogResponseBody: false,
            customHeaders:          [[maskValue: true, name: 'authorization', value: "${cesToken}"]]
        )
    }
```

Unfortunately, while this works perfectly fine in the main script, trying to use such plugins in classes 'external' to the script class will likely result in exceptions like the following:
```
groovy.lang.MissingPropertyException: No such property: mailConfigPath for class: com.compuware.devops.util.PipelineConfig
```

This seems to be [Groovy specific](https://groups.google.com/forum/#!topic/jenkinsci-users/8wd8Omvs74Y) and the only work around so far seems to be to execute these plugins in the main script. That is why the `mailList.config` down not get read in the `PipelineConfig` class as one would expect, but in the main script.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTg2MTQ4NDc2OSwtMTA5MDc3NTAxOCwtOD
IyMjY5OTgwXX0=
-->