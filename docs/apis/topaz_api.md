---
title: Topaz Java API
footer: MIT Licensed | Copyright © 2019 - Compuware
---

# Topaz API

The Topaz API is a Java library that can be used in Java applications to programmatically access and perform operations on datasets and perform JES operations, as well as launch and communicate with their own z/OS programs.

If you are using the Topaz API for plug-ins meant to be run in a Topaz Workbench environment, you should use the [Topaz Workbench SDK](Topaz_Workbench_SDK.md) instead.

The Compuware Topaz API Specification (Javadoc) can be found <a href="../javadoc/topaz_api/index.html" target="_blank">here</a>.  

## Dataset API

The Compuware Topaz API provides users with methods to programmatically access and perform actions on datasets. These API’s do not provide the capability to manipulate the Topaz Workbench UI. `Sequential`, `Partitioned` and `VSAM` are supported.

The following actions are provided regarding datasets:

* Allocate a partitioned or sequential dataset
* Create or delete a PDS member
* Obtain dataset and PDS member objects by name/pattern and type
* Read the content of a sequential dataset or a PDS member
* Write content to a sequential dataset or a PDS member
* Obtain the characteristics of a dataset or the statistics of a PDS member
* Recall a migrated dataset

## JES API

The Compuware Topaz API provides users with methods to programmatically perform JES actions. The following actions are provided regarding JES:

* Submit JCL
* Track a job’s status

## z/OS User Program API

The Compuware Topaz API provides users with methods to programmatically launch and communicate with their own z/OS programs.

The following actions are provided regarding z/OS user programs:

* Launch a z/OS user program
* Write/read user-defined data to/from the z/OS user program
* Be notified of when the z/OS user program has ended

## Dependencies

The Topaz API depends on (and is packaged with) other internal Compuware libraries and 3rd party libraries. The internal Compuware libraries are likely to change without notice, and any use of them is not supported.

This is the list of dependent libraries you must include in your class path, in order to use the Topaz API:

Library | Version | Description
------- | ------- | -----------
com.compuware.api.topaz | 2.0.0 | The Topaz API
com.compuware.frameworks.hostservices.hci | 19.5.1 | Internal Compuware library
com.compuware.frameworks.hostservices.common | 19.5.1 | Internal Compuware library
com.compuware.frameworks.hostservices.core.messages | 19.5.1 | Internal Compuware Library
com.compuware.frameworks.hostservices.crypto | 19.5.1 | Internal Compuware library
com.compuware.frameworks.hostservices.icu | 19.5.1 | Internal Compuware library
com.compuware.frameworks.hostservices.css | 19.5.1 | Internal Compuware library
com.compuware.frameworks.nls | 19.5.1 | Internal Compuware library
com.compuware.frameworks.hostservices.message.resources | 19.5.1 | Internal Compuware library
log4j.over.slf4j | 1.7.6 | 3rd party logging library
slf4j.api | 1.7.6 | 3rd party logging library
ch.qos.logback.classic | 1.1.1 | 3rd party logging library
ch.qos.logback.core | 1.1.1 | 3rd party logging library
org.apache.commons.lang | 2.6.0 | 3rd party language utilities library

## Coding Examples

[Topaz Workbench API Code Snippets](Topaz_Workbench_API_Code_Snippets.md) provides may useful examples on using the Topaz API. Though a few of the examples are specific for writing plug-ins running in a Topaz Workbench client, most of the examples are also applicable for writing Java applications.