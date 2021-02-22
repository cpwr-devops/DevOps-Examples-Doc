---
footer: MIT Licensed | Copyright © 2019 - Compuware | © Copyright 2019, 2020-2021 BMC Software, Inc.
---

# Topaz Java API

The Topaz API is a Java library that can be used in Java applications to programmatically access and perform operations on datasets and perform JES operations, as well as launch and communicate with their own z/OS programs.

If you are using the Topaz API for plug-ins meant to be run in a Topaz Workbench environment, you should use the [Topaz Workbench SDK](topaz_workbench_sdk.md) instead.

The Compuware Topaz API Specification (Javadoc) can be found <a href="../javadoc/topaz_api/index.html" target="_blank">here</a>.

## Version History

Version | Release Date | Description
---- | -------------- | -----------
`1.0.0` | 7/29/2014 | Initial Release of Host Services API.
`1.0.1` | 4/1/2019 | Added following additional functionality to allocate PDS or sequential dataset, create and delete members in a PDS and write to a sequential dataset or a member in a PDS.
`2.0.1` | 6/27/2019 | Renamed to Topaz API and removed Eclipse dependencies.  See the [migration guide](topaz_workbench_sdk.md#migrating-from-host-services-api-to-topaz-apis) for guidance on upgrading to the new API.
`2.0.2` | 7/1/2020 | Non-displayable binary data can now be read from and written to a sequential dataset or a PDS member. Non-displayable binary data is substituted with Unicode characters outside of the EBCDIC range when read, and is converted back to binary data on write.
`2.1.0` | 1/6/2021 | Added API for Generation Data Groups.
`2.2.0` | 4/1/2021 | Added APIs for finding lists of JES jobs and retrieving a job's sysout data definitions (DDs). Added APIs for reading the JES output of a job and reading the contents of a DD of a job. Added APIs to delete partitioned, sequential, migrated or VSAM datasets. Added API to execute TSO commands.

## Dataset API

The Compuware Topaz API provides users with methods to programmatically access and perform actions on datasets and generation data groups. These API’s do not provide the capability to manipulate the Topaz Workbench UI. `Sequential`, `Partitioned` and `VSAM` are supported.

The following actions are provided regarding datasets:

* Allocate a partitioned or sequential dataset
* Delete a partitioned, sequential, migrated or VSAM dataset 
* Create or delete a PDS member
* Obtain dataset and PDS member objects by name/pattern and type
* Read the content of a sequential dataset or a PDS member
* Write content to a sequential dataset or a PDS member
* Obtain the characteristics of a dataset or the statistics of a PDS member
* Recall a migrated dataset
* Define a generation data group
* Obtain generation dataset objects from generation data groups


## JES API

The Compuware Topaz API provides users with methods to programmatically perform JES actions. The following actions are provided regarding JES:

* Submit JCL
* Track a job’s status
* Obtain job objects by job name and/or owner filters
* Obtain execution and queue data of jobs
* Obtain sysout data definition (DD) objects of jobs
* Read the JES output of a job
* Read the contents of a DD of a job

## z/OS User Program API

The Compuware Topaz API provides users with methods to programmatically launch and communicate with their own z/OS programs.

The following actions are provided regarding z/OS user programs:

* Launch a z/OS user program
* Write/read user-defined data to/from the z/OS user program
* Be notified of when the z/OS user program has ended

## TSO Command API

The Compuware Topaz API provides users with methods to programmatically submit TSO commands The following actions are provided regarding TSO commands 

* Execute a TSO command

## Dependencies

The Topaz API depends on (and is packaged with) other internal Compuware libraries and 3rd party libraries. The internal Compuware libraries are likely to change without notice, and any use of them is not supported.

This is the list of dependent libraries you must include in your class path, in order to use the Topaz API:

Library | Version | Description
------- | ------- | -----------
com.compuware.api.topaz | 2.1.0 | The Topaz API
com.compuware.frameworks.hostservices.common | 20.6.1 | Internal Compuware library
com.compuware.frameworks.hostservices.core.messages | 20.6.1 | Internal Compuware Library
com.compuware.frameworks.hostservices.crypto | 20.6.1 | Internal Compuware library
com.compuware.frameworks.hostservices.css | 20.6.1 | Internal Compuware library
com.compuware.frameworks.hostservices.hci | 20.6.1 | Internal Compuware library
com.compuware.frameworks.hostservices.message.resources | 20.6.1 | Internal Compuware library
com.compuware.frameworks.nls | 20.6.1 | Internal Compuware library
com.compuware.java.utilities | 20.6.1 | Internal Compuware library
com.compuware.java.utilities.icu | 20.6.1 | Internal Compuware library
ch.qos.logback.classic | 1.0.7 | 3rd party logging library
ch.qos.logback.core | 1.0.7 | 3rd party logging library
org.apache.commons.lang | 2.6.0 | 3rd party language utilities library
org.slf4j.api | 1.7.2 | 3rd party logging library

## Coding Examples

[Topaz Workbench SDK Code Snippets](topaz_workbench_api_code_snippets.md) provides may useful examples on using the Topaz API. Though a few of the examples are specific for writing plug-ins running in a Topaz Workbench client, most of the examples are also applicable for writing Java applications.
